import React, { useState, useEffect, useContext, useRef } from "react";
import { FaSearch, FaCog, FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "../../context/NotificationContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { orderService } from "./../../api/orderService";
import { notificationService } from "./../../api/notificationService";
import OrderDetailModal from "./components/OrderDetailModal";

// helper tanggal singkat
const fmtDate = (d) => {
  try {
    const date = new Date(d);
    return date.toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "-";
  }
};

export default function Dashboard() {
  const navigate = useNavigate();

  // SSE context
  const { notifications: sseNotifs = [] } = useContext(NotificationContext);
  const sseUnreadCount = sseNotifs.filter((n) => !n.read).length;

  // Notification state
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifLoading, setNotifLoading] = useState(false);
  const [notifError, setNotifError] = useState("");
  const [notifItems, setNotifItems] = useState([]);

  // Orders state
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [stats, setStats] = useState({
    total_orders: 0,
    menunggu_konfirmasi: 0,
    diproses: 0,
    selesai: 0,
  });

  const [chartData, setChartData] = useState([]);

  // Pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const dropdownRef = useRef(null);

  // Fetch dashboard stats & chart
  const fetchDashboard = async () => {
    try {
      const res = await orderService.getDashboard();
      const data = res?.data || {};

      setStats({
        total_orders: data.total_orders || 0,
        menunggu_konfirmasi: data.menunggu_konfirmasi || 0,
        diproses: data.diproses || 0,
        selesai: data.selesai || 0,
      });

      const chart = (data.chart || []).map((item) => ({
        month: item.Month,
        total_orders: item.TotalOrders,
        menunggu_konfirmasi: item.MenungguKonfirmasi,
        diproses: item.Diproses,
        selesai: item.Selesai,
      }));
      setChartData(chart);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch orders
  const fetchOrders = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const res = await orderService.getAll({ page: pageNumber, limit });
      const data = res?.data?.data || [];
      setOrders(data);
      setFilteredOrders(data);

      setPage(res?.data?.page || 1);
      setTotalPages(res?.data?.totalPages || 1);

      const total = data.length;
      const pending = data.filter(
        (o) => o.status === "Menunggu konfirmasi"
      ).length;
      const processing = data.filter((o) => o.status === "Diproses").length;
      const completed = data.filter((o) => o.status === "Selesai").length;
      setStats({
        total_orders: total,
        menunggu_konfirmasi: pending,
        diproses: processing,
        selesai: completed,
      });
    } catch (err) {
      console.error(err);
      setError("Gagal memuat data pesanan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(page);
    fetchDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Filter search & status
  useEffect(() => {
    const results = orders.filter((order) => {
      const matchName = order.user.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter ? order.status === statusFilter : true;
      return matchName && matchStatus;
    });
    setFilteredOrders(results);
  }, [searchTerm, statusFilter, orders]);

  // **Fetch initial notifications saat page load**
  useEffect(() => {
    const fetchInitialNotif = async () => {
      setNotifLoading(true);
      setNotifError("");
      try {
        const res = await notificationService.getNotificationAdmin();
        const list = res?.data || [];
        const normalized = (Array.isArray(list) ? list : []).map((n) => ({
          id: n.id ?? n.ID ?? n._id ?? String(Math.random()),
          message: n.message ?? n.text ?? "-",
          read: n.read ?? n.isRead ?? n.is_read ?? false,
          created_at:
            n.created_at ?? n.createdAt ?? n.time ?? new Date().toISOString(),
          order_code: n.order?.order_code ?? null,
          order_id: n.order?.id ?? null,
          name: n.order?.user_name ?? n.order?.name ?? "-",
          qty: n.order?.quantity ?? n.order?.qty ?? "-",
          product: n.order?.product_name ?? n.order?.product ?? "-",
        }));
        setNotifItems(normalized);
      } catch (e) {
        console.error(e);
        setNotifError("Gagal memuat notifikasi");
      } finally {
        setNotifLoading(false);
      }
    };
    fetchInitialNotif();
  }, []);

  // Notification dropdown toggle
  const toggleNotif = () => {
    setNotifOpen((prev) => !prev);
  };

  // Klik luar untuk menutup dropdown
  useEffect(() => {
    if (!notifOpen) return;
    const onClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    const onEsc = (e) => {
      if (e.key === "Escape") setNotifOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEsc);
    };
  }, [notifOpen]);

  const handleMarkAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      setNotifItems((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (e) {
      console.error(e);
    }
  };

  const localUnread = notifItems.filter((n) => !n.read).length;
  const unreadCount = notifOpen ? localUnread : localUnread || sseUnreadCount;

  // Table actions
  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };
  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await orderService.updateOrder(id, { status: newStatus });
      fetchOrders();
      handleCloseModal();
    } catch (err) {
      alert("Gagal update status");
    }
  };

  if (loading) return <div className="p-6 text-lg">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 w-full">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            D
          </div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-4">
          <FaCog
            className="hover:text-blue-500 cursor-pointer"
            onClick={() => navigate("/setting-page")}
          />

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={toggleNotif}
              className="relative cursor-pointer p-2 rounded-lg hover:bg-gray-100 focus:outline-none"
              aria-label="Notification dropdown"
            >
              <FaBell className="hover:text-blue-500" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Dropdown panel responsive */}
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-screen max-w-[90vw] md:max-w-[380px] bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                <div className="px-4 py-3 border-b">
                  <p className="text-sm font-semibold">Notifikasi</p>
                </div>
                <div className="max-h-[420px] overflow-y-auto">
                  {notifLoading && (
                    <div className="p-4 text-sm text-gray-500">Memuat...</div>
                  )}
                  {!notifLoading && notifError && (
                    <div className="p-4 text-sm text-red-600">{notifError}</div>
                  )}
                  {!notifLoading && !notifError && notifItems.length === 0 && (
                    <div className="p-4 text-sm text-gray-500">
                      Belum ada notifikasi.
                    </div>
                  )}
                  {!notifLoading &&
                    !notifError &&
                    notifItems.map((n) => (
                      <button
                        key={n.id}
                        onClick={() => handleMarkAsRead(n.id)}
                        className={`w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-gray-50 transition ${
                          !n.read ? "bg-yellow-50" : ""
                        }`}
                      >
                        <div
                          className={`mt-1 w-2 h-2 rounded-full ${
                            n.read ? "bg-gray-300" : "bg-blue-500"
                          }`}
                        />
                        <div className="flex-1">
                          <p className="text-sm text-gray-800">
                            {n.message}{" "}
                            <span className="text-blue-600">
                              Oleh: {n.name}
                            </span>
                          </p>
                          <p className="text-sm text-gray-700 mt-1">
                            Produk:{" "}
                            <span className="font-medium">{n.product}</span> |
                            Banyak: <span className="font-medium">{n.qty}</span>
                          </p>
                          <div className="text-xs text-gray-500 mt-1">
                            {fmtDate(n.created_at)}
                            {n.order_code && (
                              <>
                                {" "}
                                • Order:{" "}
                                <span className="font-bold italic">
                                  {n.order_code}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        {!n.read && (
                          <span className="ml-2 text-[10px] font-medium text-blue-600 px-2 py-0.5 rounded-full bg-blue-100">
                            Baru
                          </span>
                        )}
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Statistik Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Order"
          value={stats.total_orders}
          gradient="from-blue-400 to-blue-600"
        />
        <StatCard
          title="Menunggu Konfirmasi"
          value={stats.menunggu_konfirmasi}
          gradient="from-yellow-400 to-yellow-600"
        />
        <StatCard
          title="Diproses"
          value={stats.diproses}
          gradient="from-green-400 to-green-600"
        />
        <StatCard
          title="Selesai"
          value={stats.selesai}
          gradient="from-purple-400 to-purple-600"
        />
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Order Per Bulan</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total_orders" name="Total" fill="#3B82F6" />
              <Bar
                dataKey="menunggu_konfirmasi"
                name="Menunggu Konfirmasi"
                fill="#FBBF24"
              />
              <Bar dataKey="diproses" name="Diproses" fill="#10B981" />
              <Bar dataKey="selesai" name="Selesai" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
          <div className="relative w-full md:w-64">
            <FaSearch className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Cari customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border px-3 py-2 rounded-lg w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Semua Status</option>
            <option value="Menunggu konfirmasi">Menunggu Konfirmasi</option>
            <option value="Diproses">Diproses</option>
            <option value="Selesai">Selesai</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
                <th className="py-3 px-4 sticky left-0 bg-gray-100 z-10">
                  Order ID
                </th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Produk</th>
                <th className="py-3 px-4">Qty</th>
                <th className="py-3 px-4">Catatan</th>
                <th className="py-3 px-4">Alamat</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Tanggal</th>
                <th className="py-3 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 sticky left-0 bg-white z-10">
                    {order.order_id}
                  </td>
                  <td className="py-3 px-4">{order.user.name}</td>
                  <td className="py-3 px-4">{order.product.name}</td>
                  <td className="py-3 px-4">{order.quantity}</td>
                  <td className="py-3 px-4">{order.details}</td>
                  <td className="py-3 px-4">{order?.address}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        order.status === "Selesai"
                          ? "bg-purple-500"
                          : order.status === "Diproses"
                          ? "bg-green-500"
                          : order.status === "Dibatalkan"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">{fmtDate(order.created_at)}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleViewOrder(order)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between mt-4 items-center">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {page} / {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={handleCloseModal}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
}

// Komponen kecil untuk card statistik
const StatCard = ({ title, value, gradient }) => (
  <div className={`p-4 rounded-xl shadow text-white ${gradient}`}>
    <p className="text-sm">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);
