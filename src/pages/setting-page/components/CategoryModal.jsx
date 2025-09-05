import React, { useState } from "react";
import axios from "axios";

const CategoryModal = ({ onClose, onSaved, data }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [name, setName] = useState(data?.name || "");
  const [detail, setDetail] = useState(data?.detail || "");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("detail", detail);
      if (image) formData.append("image_path", image);

      await axios.post(`${BASE_URL}/api/categories`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onSaved();
      onClose();
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Gagal menyimpan kategori");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center rounded">
            <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-8 h-8 animate-spin"></div>
          </div>
        )}

        <h2 className="text-lg font-bold mb-4">
          {data ? "Edit Category" : "Add Category"}
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
        <textarea
          placeholder="Detail"
          className="border p-2 w-full mb-2"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          disabled={loading}
        />
        <div className="mb-2">
          <label className="block mb-1">Image:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            disabled={loading}
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 text-white rounded ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600"
            }`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Loading..." : data ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
