import React, { useState } from "react";
import axios from "axios";
import imageCompression from "browser-image-compression";

const CategoryModal = ({ onClose, onSaved, data }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [name, setName] = useState(data?.name || "");
  const [detail, setDetail] = useState(data?.detail || "");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // ✅ Compress image sebelum set ke state
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const options = {
        maxSizeMB: 1, // maksimal 1MB
        maxWidthOrHeight: 1024, // resize agar lebih ringan
        useWebWorker: true,
        fileType: "image/webp", // pakai WebP untuk hemat size
      };
      try {
        const compressedFile = await imageCompression(file, options);
        setImage(compressedFile);
      } catch (error) {
        console.error("Image compression error:", error);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setProgress(0);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("detail", detail);
      if (image) formData.append("image_path", image);

      await axios.post(`${BASE_URL}/api/categories`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) => {
          const percent = Math.round((event.loaded * 100) / event.total);
          setProgress(percent);
        },
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
        {/* ✅ Overlay Loading */}
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center rounded">
            <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-8 h-8 animate-spin mb-3"></div>
            <p className="text-gray-700 font-semibold mb-2">Uploading...</p>
            <div className="w-48 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">{progress}%</p>
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
        <div className="mb-4">
          <label className="block mb-1">Image:</label>
          <input type="file" onChange={handleImageChange} disabled={loading} />
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
