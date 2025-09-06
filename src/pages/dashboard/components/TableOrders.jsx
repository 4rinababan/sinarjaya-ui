import React from "react";

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

const TableOrders = ({
  orders = [],
  onViewOrder,
  page,
  totalPages,
  onPrevPage,
  onNextPage,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
              <th className="py-3 px-4 sticky left-0 bg-gray-100 z-10">Order ID</th>
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
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 sticky left-0 bg-white z-10">{order.order_id}</td>
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
                    onClick={() => onViewOrder(order)}
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
          onClick={onPrevPage}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} / {totalPages}
        </span>
        <button
          onClick={onNextPage}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableOrders;
