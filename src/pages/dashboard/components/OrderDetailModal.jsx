import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function OrderDetailModal({ order, onClose, onUpdateStatus }) {
  const [status, setStatus] = useState(order.status);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    await onUpdateStatus(order.id, status.trim());
    setLoading(false);
  };

  // Tentukan opsi dropdown sesuai status saat ini
  let statusOptions = [];
  let showDropdown = true;

  switch (order.status) {
    case "Menunggu konfirmasi":
      statusOptions = ["Diproses", "Dibatalkan"];
      break;
    case "Diproses":
      statusOptions = ["Selesai", "Dibatalkan"];
      break;
    case "Selesai":
    case "Dibatalkan":
      showDropdown = false;
      break;
    default:
      statusOptions = [
        "Menunggu konfirmasi",
        "Diproses",
        "Selesai",
        "Dibatalkan",
      ];
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Detail Pesanan</h2>
        <p>
          <strong>ID :</strong> {order.id}
        </p>
        <p>
          <strong>Customer :</strong> {order.user.name}
        </p>
        <p>
          <strong>No HP :</strong>{" "}
          <span className="text-blue-500">{order.user.phone}</span>
        </p>
        <p>
          <strong>Alamat :</strong> {order.user.address}
        </p>
        <p>
          <strong>Produk :</strong> {order.product?.name}
        </p>
        <p>
          <strong>Jumlah :</strong> {order.quantity}
        </p>
        <p>
          <strong>Prioritas :</strong> {order.priority}
        </p>
        <p>
          <strong>Perusahaan :</strong> {order.company_name || "-"}
        </p>
        <p>
          <strong>Detail :</strong> {order.detail || "-"}
        </p>

        {/* Google Maps Card */}
        {order.user.lat && order.user.lang && (
          <div className="my-4 border rounded overflow-hidden">
            <iframe
              title="maps"
              width="100%"
              height="200"
              loading="lazy"
              src={`https://maps.google.com/maps?q=${order.user.lat},${order.user.lang}&hl=es;z=15&output=embed`}
            ></iframe>
          </div>
        )}

        {/* Button WhatsApp */}
        {order.user.phone && (
          <a
            href={`https://wa.me/${
              order.user.phone.startsWith("08")
                ? "62" + order.user.phone.slice(1).replace(/[^0-9]/g, "")
                : order.user.phone.replace(/[^0-9]/g, "")
            }`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded mt-4 transition-colors"
          >
            <FaWhatsapp size={20} />
            Kirim Chat
          </a>
        )}

        {showDropdown ? (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border w-full p-2 rounded mt-2"
          >
            {statusOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : (
          <span
            className={`inline-block px-3 py-1 rounded-full text-white mt-2 ${
              order.status === "Selesai" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {order.status}
          </span>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Batal
          </button>
          {showDropdown && (
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
