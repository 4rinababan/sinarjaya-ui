import React, { useState, useEffect } from "react";
import { infoService } from "../../../api/infoService";

const InfoModal = ({ isEdit, data, onClose, onSaved }) => {
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [form, setForm] = useState({
    phone: "",
    telephone: "",
    address: "",
    latitude: null,
    longitude: null,
    useMap: false,
  });

  useEffect(() => {
    if (isEdit && data) {
      setForm({
        phone: data.phone,
        telephone: data.telephone,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
        useMap: !!(data.latitude && data.longitude),
      });
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

          // Ambil alamat detail (reverse geocode)
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
            );
            const data = await response.json();
            setForm((prev) => ({
              ...prev,
              address: data.display_name || prev.address,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      phone: form.phone,
      telephone: form.telephone,
      address: form.address,
      latitude: form.useMap ? parseFloat(form.latitude) : null,
      longitude: form.useMap ? parseFloat(form.longitude) : null,
    };
    try {
      await infoService.updateInfo(payload);
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
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Alamat"
            className="w-full border p-2 rounded"
          />

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
