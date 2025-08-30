import React, { useEffect, useState } from "react";
import Icon from "../../components/AppIcon";
import Header from "../../components/ui/Header";
import { useNavigate } from "react-router-dom";
import { getSavedUser, getUserFromToken } from "./../../utils/storage";
import { orderService } from "./../../api/orderService";

const formatDate = (date) =>
  new Date(date).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

// Mapping warna status
const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "menunggu konfirmasi":
      return "bg-yellow-100 text-yellow-700 border border-yellow-300";
    case "diproses":
      return "bg-blue-100 text-blue-700 border border-blue-300";
    case "selesai":
      return "bg-green-100 text-green-700 border border-green-300";
    case "dibatalkan":
      return "bg-red-100 text-red-700 border border-red-300";
    default:
      return "bg-gray-100 text-gray-700 border border-gray-300";
  }
};

const getDotColor = (status) => {
  switch (status.toLowerCase()) {
    case "menunggu konfirmasi":
      return "bg-yellow-500";
    case "diproses":
      return "bg-blue-500";
    case "selesai":
      return "bg-green-500";
    case "dibatalkan":
      return "bg-red-500";
    default:
      return "bg-gray-400";
  }
};

export default function OrderTimeline() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  const user = getSavedUser();
  const decoded = getUserFromToken();

  useEffect(() => {
    if (!user?.id && !decoded?.id) return;

    const fetchOrders = async () => {
      try {
        const userId = user?.id || decoded?.id;
        const data = await orderService.getOrderHistory(userId);
        setOrders(data.data);
        setFilteredOrders(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const filtered = orders.filter(
      (order) =>
        order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(filtered);
  }, [searchTerm, orders]);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <Header />
      <button
        onClick={handleBack}
        className="mb-4 inline-flex items-center text-sm text-blue-600 hover:underline"
      >
        <Icon name="ArrowLeft" size={16} className="mr-2" />
        Kembali
      </button>

      <h1 className="text-2xl font-bold text-foreground mb-4">
        Riwayat Order Anda
      </h1>

      <div className="mb-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Cari produk, ID order, atau status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      {loading ? (
        <div className="text-center py-10 text-muted-foreground">
          <Icon name="Loader" className="animate-spin mx-auto mb-3" size={24} />
          Memuat riwayat order...
        </div>
      ) : filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <div
            key={order.orderId}
            className="bg-card border rounded-xl mb-8 shadow-sm"
          >
            <div className="p-5 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{order.product}</h2>
                  <p className="text-sm">Order ID: {order.orderId}</p>
                </div>
                <span
                  className={`text-xs font-medium rounded-full px-3 py-1 ${getStatusColor(
                    order.status
                  )}`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      order.status.toLowerCase() === "menunggu konfirmasi"
                        ? "bg-yellow-500"
                        : order.status.toLowerCase() === "diproses"
                        ? "bg-blue-500"
                        : order.status.toLowerCase() === "selesai"
                        ? "bg-green-500"
                        : order.status.toLowerCase() === "dibatalkan"
                        ? "bg-red-500"
                        : "bg-gray-500"
                    }`}
                  ></span>
                  {order.status}
                </span>
              </div>
            </div>

            <ul className="p-5 space-y-5">
              {order.updates.map((update, idx) => (
                <li key={idx} className="flex items-start">
                  <div
                    className={`w-3 h-3 rounded-full mt-1 mr-4 ${getDotColor(
                      update.status
                    )}`}
                  />
                  <div>
                    <p className="text-sm font-medium">{update.status}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(update.timestamp)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          <Icon name="Search" className="mx-auto mb-3" size={24} />
          Tidak ada order ditemukan.
        </div>
      )}
    </div>
  );
}
