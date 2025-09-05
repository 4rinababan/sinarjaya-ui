import React, { useState } from "react";
import axios from "axios";

const CategoryModal = ({ onClose, onSaved, data }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [name, setName] = useState(data?.name || "");
  const [detail, setDetail] = useState(data?.detail || "");
  const [image, setImage] = useState(null);
  // const [icon, setIcon] = useState(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("detail", detail);
    if (image) formData.append("image_path", image);
    // if (icon) formData.append("icon", icon);

    await axios.post(`${BASE_URL}/api/categories`, formData);
    onSaved();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">
          {data ? "Edit Category" : "Add Category"}
        </h2>
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Detail"
          className="border p-2 w-full mb-2"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
        />
        <div className="mb-2">
          <label className="block mb-1">Image:</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        {/* <div className="mb-4">
          <label className="block mb-1">Icon:</label>
          <input type="file" onChange={(e) => setIcon(e.target.files[0])} />
        </div> */}

        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleSubmit}
          >
            {data ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
