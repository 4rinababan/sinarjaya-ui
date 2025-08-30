import React, { useEffect, useState } from "react";
import { FaFolder, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { categoryService } from "../../../api/categoryService";
import { FiEdit, FiTrash } from "react-icons/fi";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const CategoryWidget = () => {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    detail: "",
    image: null,
    icon: null,
  });

  const limit = 10;

  useEffect(() => {
    fetchCategories();
  }, [page]);

  const fetchCategories = async () => {
    try {
      const res = await categoryService.getAll(page, limit);
      setCategories(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("detail", formData.detail);
    if (formData.image) data.append("image_path", formData.image);
    if (formData.icon) data.append("icon", formData.icon);

    try {
      if (editId) {
        await categoryService.update(editId, data);
      } else {
        await categoryService.create(data);
      }
      setShowModal(false);
      setEditId(null);
      setFormData({ name: "", detail: "", image: null, icon: null });
      fetchCategories();
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const handleEdit = (cat) => {
    setFormData({
      name: cat.name,
      detail: cat.detail,
      image: null,
      icon: null,
    });
    setEditId(cat.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await categoryService.delete(id);
      fetchCategories();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold flex items-center text-purple-800">
          <FaFolder className="text-yellow-500 mr-2" /> Categories
        </h2>
        <button
          onClick={() => {
            setShowModal(true);
            setEditId(null);
            setFormData({ name: "", detail: "", image: null, icon: null });
          }}
          className="bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1 rounded flex items-center"
        >
          <FaPlus className="mr-1 text-xs" /> Tambah
        </button>
      </div>

      <table className="w-full text-left border rounded text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2">Name</th>
            <th className="px-3 py-2">Detail</th>
            <th className="px-3 py-2">Image</th>
            <th className="px-3 py-2">Icon</th>
            <th className="px-3 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id} className="border-t">
              <td className="px-3 py-2">{cat.name}</td>
              <td className="px-3 py-2">{cat.detail}</td>
              <td className="px-3 py-2">
                <img
                  src={`${API_BASE_URL}/${cat.image_path}`}
                  className="w-8 h-8 object-cover rounded"
                />
              </td>
              <td className="px-3 py-2">
                <img
                  src={`${API_BASE_URL}/${cat.icon}`}
                  className="w-5 h-5 object-cover rounded"
                />
              </td>
              <td className="p-2 flex flex-wrap gap-2">
                <button
                  className="flex items-center gap-1 text-blue-500 hover:underline"
                  onClick={() => handleEdit(cat)}
                >
                  <FiEdit size={16} />
                  Edit
                </button>
                <button
                  className="flex items-center gap-1 text-red-500 hover:underline"
                  onClick={() => handleDelete(cat.id)}
                >
                  <FiTrash size={16} />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end items-center mt-2 text-sm space-x-2">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">
              {editId ? "Edit" : "Add"} Category
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Name"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="detail"
                value={formData.detail}
                onChange={handleInputChange}
                required
                placeholder="Detail"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleInputChange}
                className="w-full"
              />
              <input
                type="file"
                name="icon"
                accept="image/*"
                onChange={handleInputChange}
                className="w-full"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1 text-sm bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 text-sm bg-green-600 text-white rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryWidget;
