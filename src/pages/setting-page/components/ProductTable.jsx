import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FiEdit, FiTrash } from "react-icons/fi";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const ProductTable = ({ products, onEdit, onDelete }) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleShowImages = (images) => {
    setSelectedImages(images);
    setShowImageModal(true);
  };

  const handleConfirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const handleDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
      setShowDeleteConfirm(false);
      setDeleteId(null);
    }
  };

  return (
    <>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Detail</th>
            <th className="p-2 text-left">Images</th>
            <th className="p-2 text-left">Category</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t">
              <td className="p-2">{product.name}</td>
              <td className="p-2">{product.detail}</td>
              <td className="p-2">
                <button
                  onClick={() => handleShowImages(product.images)}
                  className="flex items-center text-blue-500 hover:underline text-sm"
                >
                  <FaEye className="mr-1" /> Lihat
                </button>
              </td>
              <td className="p-2">{product.category?.name || "-"}</td>
              <td className="p-2 flex flex-wrap gap-2">
                <button
                  className="flex items-center gap-1 text-blue-500 hover:underline"
                  onClick={() => onEdit(product)}
                >
                  <FiEdit size={16} />
                  Edit
                </button>
                <button
                  className="flex items-center gap-1 text-red-500 hover:underline"
                  onClick={() => handleConfirmDelete(product.id)}
                >
                  <FiTrash size={16} />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Modal untuk preview images */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-lg font-bold mb-4">Preview Images</h3>
            <div className="grid grid-cols-3 gap-2">
              {selectedImages.map((img, index) => (
                <img
                  key={index}
                  src={`${API_BASE_URL}/${img}`}
                  alt="product"
                  className="w-full h-24 object-cover rounded"
                />
              ))}
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={() => setShowImageModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Modal konfirmasi delete */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Konfirmasi Hapus</h3>
            <p className="mb-4">
              Apakah Anda yakin ingin menghapus produk ini?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductTable;
