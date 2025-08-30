import { useState } from "react";
import { FaEye } from "react-icons/fa"; // icon mata

const API_BASE_URL = import.meta.env.VITE_BASE_URL;
export default function ProductImages({ p }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <td className="px-3 py-2 space-x-1">
      {/* Tombol lihat */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center px-2 py-1 text-blue-500 hover:text-blue-700"
      >
        <FaEye className="mr-1" /> Lihat
      </button>

      {/* Modal popup */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-lg w-full">
            <h2 className="text-lg font-semibold mb-3">Daftar Gambar</h2>
            <div className="grid grid-cols-3 gap-2">
              {(p.images || []).map((img, i) => (
                <img
                  key={i}
                  src={`${API_BASE_URL}/${img}`}
                  alt={`img-${i}`}
                  className="w-full h-24 object-cover rounded"
                />
              ))}
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </td>
  );
}
