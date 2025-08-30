import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryModal from "./CategoryModal";

const CategoryTable = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/categories`);

      const data = res.data;
      // Pastikan bentuk data sesuai
      if (Array.isArray(data)) {
        setCategories(data); // langsung array
      } else if (Array.isArray(data.data)) {
        setCategories(data.message); // nested di .data
      } else {
        console.warn("⚠️ Unexpected data structure:", data);
        setCategories(data.message); // fallback
      }
    } catch (err) {
      console.error("❌ Failed to fetch categories:", err);
      setCategories([]); // fallback saat error
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">📂 Categories</h2>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setEditCategory(null);
            setOpenModal(true);
          }}
        >
          ➕ Add Category
        </button>
      </div>

      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Detail</th>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Icon</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(categories) &&
            categories.map((cat) => (
              <tr key={cat.id}>
                <td className="p-2 border">{cat.name}</td>
                <td className="p-2 border">{cat.detail}</td>
                <td className="p-2 border">
                  <img src={`${BASE_URL}/${cat.image_path}`} className="w-12" />
                </td>
                <td className="p-2 border">
                  <img src={`${BASE_URL}/${cat.icon}`} className="w-12" />
                </td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => {
                      setEditCategory(cat);
                      setOpenModal(true);
                    }}
                    className="text-blue-600"
                  >
                    Edit
                  </button>
                  <button className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {openModal && (
        <CategoryModal
          onClose={() => setOpenModal(false)}
          onSaved={() => {
            fetchCategories();
            setOpenModal(false);
          }}
          data={editCategory}
        />
      )}
    </div>
  );
};

export default CategoryTable;
