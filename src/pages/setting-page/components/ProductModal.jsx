import React from 'react';

const ProductModal = ({
  formData,
  categories,
  onChange,
  onFileChange,
  onSubmit,
  onClose,
  isEdit,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-md relative">
        <h2 className="text-lg font-bold mb-4">
          {isEdit ? 'Edit Produk' : 'Tambah Produk'}
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            required
            placeholder="Nama Produk"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="detail"
            value={formData.detail}
            onChange={onChange}
            required
            placeholder="Detail Produk"
            className="w-full border px-3 py-2 rounded"
          />
          {/* <div className="mt-4">
            <label htmlFor="stok" className="text-sm font-medium text-gray-700 mb-1 block">
                Stok Produk
            </label>
            </div>
          <input
            type="text"
            name="stok"
            value={formData.detail}
            onChange={onChange}
            required
            placeholder="Stok (angka)"
            className="w-full border px-3 py-2 rounded"
          /> */}

          {/* Multiple file upload */}
          <input
            type="file"
            name="images"
            onChange={onFileChange}
            multiple
            accept="image/*"
            className="w-full border px-3 py-2 rounded"
          />

          {/* Optional preview */}
          {formData.imagesPreview?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.imagesPreview.map((src, i) => (
                <img key={i} src={src} alt="preview" className="w-12 h-12 rounded object-cover" />
              ))}
            </div>
          )}

          <select
                name="category_id"
                value={formData.category_id}
                onChange={onChange}
                required
                className="w-full border px-3 py-2 rounded z-10 max-h-60 overflow-auto"
                >
                <option value="">-- Pilih Kategori --</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                    {cat.name}
                    </option>
                ))}
            </select>


          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 text-sm bg-gray-300 rounded"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-3 py-1 text-sm bg-green-600 text-white rounded"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
