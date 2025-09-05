import React, { useEffect, useState } from "react";
import { FaBoxOpen, FaPlus } from "react-icons/fa";
import ProductModal from "./ProductModal";
import ProductTable from "./ProductTable"; // ✅ import
import { productService } from "../../../api/productService";
import { categoryService } from "../../../api/categoryService";

const ProductWidget = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    detail: "",
    images: "",
    category_id: "",
  });

  const limit = 10;

  const handleFileChange = (e) => {
    const files = e.target.files;
    const previews = Array.from(files).map((file) => URL.createObjectURL(file));

    setFormData((prev) => ({
      ...prev,
      images: files,
      imagesPreview: previews,
    }));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchCategories = async () => {
    try {
      const res = await categoryService.getAll();
      setCategories(res?.data?.data || []);
    } catch (err) {
      console.error("Fetch categories error:", err);
      setCategories([]);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await productService.getAll(page, limit);
      setProducts(res.data || []);
      setTotalPages(Math.ceil(res.data.length / limit) || 1);
    } catch (err) {
      console.error("Fetch products error:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setProgress(0);

      // ✅ Delay agar UI render dulu
      await new Promise((resolve) => setTimeout(resolve, 100));

      const data = new FormData();
      data.append("name", formData.name);
      data.append("detail", formData.detail);
      data.append("category_id", formData.category_id);

      if (formData.images && formData.images.length > 0) {
        for (let i = 0; i < formData.images.length; i++) {
          data.append("images", formData.images[i]);
        }
      }

      const config = {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) => {
          if (event.total > 0) {
            const percent = Math.round((event.loaded * 100) / event.total);
            setProgress(percent);
          } else {
            // ✅ Fallback kalau event.total = 0 (mobile issue)
            setProgress((prev) => (prev < 95 ? prev + 5 : prev));
          }
        },
      };

      if (editId) {
        await productService.update(editId, data, config);
      } else {
        await productService.create(data, config);
      }

      // ✅ Biar user sempat lihat progress 100%
      setProgress(100);
      await new Promise((resolve) => setTimeout(resolve, 300));

      fetchProducts();
      setShowModal(false);
      setEditId(null);
      setFormData({ name: "", detail: "", images: "", category_id: "" });
    } catch (err) {
      console.error("Save product error:", err);
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      detail: product.detail,
      images: "",
      category_id: product.category_id,
    });
    setEditId(product.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await productService.delete(id);
      fetchProducts();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold flex items-center text-purple-800">
          <FaBoxOpen className="text-blue-500 mr-2" /> Produk
        </h2>
        <button
          onClick={() => {
            setShowModal(true);
            setEditId(null);
            setFormData({ name: "", detail: "", images: "", category_id: "" });
          }}
          className="bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1 rounded flex items-center"
        >
          <FaPlus className="mr-1 text-xs" /> Tambah
        </button>
      </div>

      {/* ✅ Ganti table manual dengan ProductTable */}
      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

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
        <ProductModal
          formData={formData}
          categories={categories}
          onChange={handleInputChange}
          onFileChange={handleFileChange}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
          isEdit={!!editId}
        />
      )}

      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center z-50">
          <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-8 h-8 animate-spin"></div>
          <p className="mt-2 text-gray-700">{progress}%</p>
        </div>
      )}
    </div>
  );
};

export default ProductWidget;
