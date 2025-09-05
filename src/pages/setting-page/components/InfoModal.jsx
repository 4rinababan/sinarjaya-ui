import React, { useState, useEffect, useRef } from "react";
import { infoService } from "../../../api/infoService";
import { PencilIcon } from "@heroicons/react/24/solid"; // Gunakan Heroicons atau ganti sendiri

const InfoModal = ({ isEdit, data, onClose, onSaved }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [loadingLocation, setLoadingLocation] = useState(false);
  const fileInputRef = useRef(null); // 🔁 Untuk trigger input file lewat ikon
  const [form, setForm] = useState({
    phone: "",
    telephone: "",
    address: "",
    latitude: null,
    longitude: null,
    useMap: false,
    name: "",
    detail: "",
    photo: null,
    photoPreview: null,
  });

  useEffect(() => {
    if (isEdit && data) {
      setForm((prev) => ({
        ...prev,
        phone: data.phone,
        telephone: data.telephone,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
        useMap: !!(data.latitude && data.longitude),
        name: data.name || "",
        detail: data.detail || "",
        photoPreview: data.image_path ? `${BASE_URL}/${data.image_path}` : null,
      }));
    }
  }, [isEdit, data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = async (e) => {
    const checked = e.target.checked;
    setForm((prev) => ({ ...prev, useMap: checked }));

    if (checked) {
      setLoadingLocation(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          setForm((prev) => ({
            ...prev,
            latitude: lat,
            longitude: lng,
          }));

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
            );
            const locationData = await response.json();
            setForm((prev) => ({
              ...prev,
              address: locationData.display_name || prev.address,
            }));
          } catch (error) {
            console.error("Error reverse geocoding:", error);
          }

          setLoadingLocation(false);
        });
      } else {
        alert("Geolocation tidak didukung di browser ini");
        setLoadingLocation(false);
      }
    } else {
      setForm((prev) => ({
        ...prev,
        latitude: null,
        longitude: null,
      }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        photo: file,
        photoPreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🔧 handleSubmit dipanggil");
    // console.log(e);
    const payload = {
      phone: form.phone,
      telephone: form.telephone,
      address: form.address,
      latitude: form.useMap ? parseFloat(form.latitude) : null,
      longitude: form.useMap ? parseFloat(form.longitude) : null,
      name: form.name,
      detail: form.detail,
    };
    console.log(payload);
    try {
      const formData = new FormData();
      Object.entries(payload).forEach(([key, val]) =>
        formData.append(key, val)
      );
      if (form.photo) {
        formData.append("photo", form.photo);
      }

      await infoService.updateInfo(formData);
      onSaved();
    } catch (err) {
      console.error("Error saving info:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-full max-w-sm p-6 shadow-lg relative">
        <h3 className="text-lg font-semibold mb-4">
          {isEdit ? "Edit Informasi" : "Tambah Informasi"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 🖼️ Photo Preview + Pencil */}
          <div className="flex justify-center relative">
            <img
              src={form.photoPreview}
              onError={(e) => {
                e.target.src =
                  "https://ui-avatars.com/api/?name=Company&size=100&background=random";
              }}
              alt="Company"
              className="w-24 h-24 rounded-full object-cover shadow border"
            />

            {/* Pencil Icon to trigger file input */}
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 right-[35%] bg-white p-1 rounded-full shadow hover:bg-gray-100"
              title="Ubah Foto"
            >
              <PencilIcon className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            ref={fileInputRef}
            className="hidden"
          />

          {/* Company Name */}
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nama Perusahaan"
            className="w-full border p-2 rounded"
            required
          />

          {/* Company Detail */}
          <textarea
            name="detail"
            value={form.detail}
            onChange={handleChange}
            placeholder="Detail Perusahaan"
            className="w-full border p-2 rounded resize-none"
            rows="2"
          />

          {/* Phone Inputs */}
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Nomor WhatsApp"
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="telephone"
            value={form.telephone}
            onChange={handleChange}
            placeholder="Nomor Telepon"
            className="w-full border p-2 rounded"
            required
          />

          {/* Address */}
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Alamat"
            className="w-full border p-2 rounded"
          />

          {/* Use Map */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={form.useMap}
              onChange={handleCheckbox}
            />
            <span>Gunakan Map</span>
            {loadingLocation && (
              <span className="text-xs text-gray-500">Mengambil lokasi...</span>
            )}
          </div>

          {/* Map Preview */}
          {form.useMap && form.latitude && form.longitude && (
            <div className="rounded-lg overflow-hidden">
              <iframe
                title="maps-preview"
                width="100%"
                height="150"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://www.google.com/maps?q=${form.latitude},${form.longitude}&hl=es;z=14&output=embed`}
                allowFullScreen
              ></iframe>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InfoModal;
