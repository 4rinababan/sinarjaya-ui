import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import QuickInquiryModal from "./QuickInquiryModal";

import { userService } from "../../../api/userService";
import { orderService } from "../../../api/orderService";
import { authService } from "../../../api/authService";
import {
  saveUser,
  getSavedUser,
  getUserFromToken,
} from "../../../utils/storage";

export default function InquiryForm({ productName, productSku, product }) {
  const navigate = useNavigate();
  const [savedUser, setSavedUser] = useState(() => getSavedUser());

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    kabupaten: "",
    kecamatan: "",
    quantity: "",
    projectDetails: "",
    urgency: "normal",
    lat: null,
    lang: null,
    useCurrentLocation: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showQuickInquiry, setShowQuickInquiry] = useState(false);

  const [loadingLocation, setLoadingLocation] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  // console.log(savedUser);
  // ✅ Prefill data dari saved user
  useEffect(() => {
    if (savedUser) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || savedUser?.name || "",
        email: prev.email || savedUser?.email || "",
        address: prev.address || savedUser?.address || "",
        phone: prev.phone || savedUser?.phone || "",
      }));
    }
  }, [savedUser]);

  // ✅ Autofill ketika phone cocok dengan savedUser
  useEffect(() => {
    if (savedUser && formData.phone === (savedUser.phone || "")) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || savedUser.name || "",
        email: prev.email || savedUser.email || "",
        address: prev.address || savedUser.address || "",
      }));
    }
  }, [formData.phone, savedUser]);

  // ✅ Validation
  const errors = useMemo(() => {
    const e = {};
    if (!formData.name?.trim()) e.name = "Nama wajib diisi.";
    if (!formData.phone?.trim()) e.phone = "Nomor telepon wajib diisi.";
    if (formData.phone && !/^0[0-9]{9,14}$/.test(formData.phone))
      e.phone = "Nomor telepon tidak valid (gunakan format 08xxxxxxxx).";
    if (!formData.address?.trim()) e.address = "Alamat wajib diisi.";
    if (!formData.quantity?.toString().trim())
      e.quantity = "Jumlah kebutuhan wajib diisi.";
    if (
      formData.quantity &&
      (!/^\d+$/.test(formData.quantity) || Number(formData.quantity) <= 0)
    )
      e.quantity = "Jumlah harus berupa angka positif.";
    return e;
  }, [formData]);

  const isFormValid = Object.keys(errors).length === 0;

  // ✅ Handlers
  const handleInputChange = (e) => {
    setErrorMsg("");
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetLocation = () => {
    setErrorMsg("");
    if (!navigator.geolocation) {
      setErrorMsg("Browser Anda tidak mendukung geolokasi.");
      return;
    }
    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          setFormData((prev) => ({
            ...prev,
            address: data?.display_name || prev.address,
            lat: latitude,
            lang: longitude,
            useCurrentLocation: true,
          }));
        } catch {
          setFormData((prev) => ({
            ...prev,
            lat: latitude,
            lang: longitude,
            useCurrentLocation: true,
          }));
        } finally {
          setLoadingLocation(false);
        }
      },
      (err) => {
        setErrorMsg(`Gagal mendapatkan lokasi: ${err.message}`);
        setLoadingLocation(false);
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!isFormValid) {
      setErrorMsg("Silakan periksa kembali input Anda.");
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    setErrorMsg("");
    setShowConfirmation(false);
    setIsSubmitting(true);

    try {
      let userId = savedUser?.id;

      if (!savedUser) {
        // ✅ Buat password random
        const password =
          Math.random().toString(36).slice(2) + Date.now().toString().slice(-4);

        // ✅ Buat user baru
        const userRes = await userService.createUser({
          name: formData.name,
          email: formData.email || "",
          address: formData.address || "",
          phone: formData.phone || "",
          district: formData.kabupaten || "",
          regency: formData.kecamatan || "",
          lat: formData.lat || "",
          lang: formData.lang || "",
        });

        userId = userRes.data?.id;

        // ✅ Buat account
        await userService.createAccount({
          phone: formData.phone,
          password,
          user_id: userId,
          role: "user",
        });

        // ✅ Login
        await authService.login({ phone: formData.phone, password });
      }

      const localSaved = getUserFromToken();
      // ✅ Buat order
      const payload = {
        user: {
          id: localSaved?.user_id || userId || "",
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          district: formData.kabupaten || "",
          regency: formData.kecamatan || "",
          lat: formData.lat || "",
          lang: formData.lang || "",
        },
        product_id: product?.id || productSku,
        company_name: formData.company || "",
        priority: formData.urgency || "normal",
        details: formData.projectDetails || "",
        address: formData.address,
        quantity: parseInt(formData.quantity, 10),
        lat: formData.lat || null,
        lang: formData.lang || null,
      };

      const result = await orderService.create(payload);

      if (result?.data?.user) {
        saveUser(result.data.user);
        setSavedUser(result.data.user);
      }

      setIsSubmitted(true);
      setTimeout(() => navigate("/order-history", { replace: true }), 900);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Terjadi kesalahan saat memproses order.";
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ========================= UI =========================

  if (isSubmitted) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 text-center">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} className="text-success" />
        </div>
        <h3 className="text-lg font-heading font-semibold mb-2">
          Inquiry Terkirim!
        </h3>
        <p className="text-muted-foreground">
          Tim kami akan menghubungi Anda dalam 1x24 jam.
        </p>
      </div>
    );
  }

  return (
    <div className="relative bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-heading font-semibold mb-2">Buat Order</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4 text-sm text-blue-800">
          Sudah yakin dengan produk ini? Isi form di bawah untuk membuat order
          atau inquiry. Jika ada pertanyaan, gunakan{" "}
          <button
            type="button"
            onClick={() => setShowQuickInquiry(true)}
            className="text-blue-600 underline hover:text-blue-700"
          >
            Inquiry Cepat
          </button>{" "}
          atau WhatsApp.
        </div>

        {errorMsg && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMsg}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nama + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Input
              label="Nama Lengkap"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name}</p>
            )}
          </div>

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        {/* Phone + Company */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Input
              label="Nomor Telepon"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              required
              aria-invalid={!!errors.phone}
              placeholder="08xxxxxxxxxx"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
            )}
          </div>

          <Input
            label="Nama Perusahaan (Optional)"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Alamat Lengkap
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border rounded-md bg-input text-foreground resize-none"
            required
            aria-invalid={!!errors.address}
          />
          {errors.address && (
            <p className="mt-1 text-xs text-red-600">{errors.address}</p>
          )}
          {!formData.useCurrentLocation && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
              <Input
                label="Kabupaten"
                name="kabupaten"
                value={formData.kabupaten}
                onChange={handleInputChange}
              />
              <Input
                label="Kecamatan"
                name="kecamatan"
                value={formData.kecamatan}
                onChange={handleInputChange}
              />
            </div>
          )}
          <button
            type="button"
            onClick={handleGetLocation}
            className="mt-2 px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded disabled:opacity-60"
            disabled={loadingLocation}
          >
            {loadingLocation
              ? "Mengambil lokasi..."
              : "📍 Gunakan Lokasi Sekarang"}
          </button>
        </div>

        {/* Quantity + Urgency */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Input
              label="Jumlah Kebutuhan"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              required
              aria-invalid={!!errors.quantity}
              placeholder="contoh: 10"
            />
            {errors.quantity && (
              <p className="mt-1 text-xs text-red-600">{errors.quantity}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Tingkat Urgensi</label>
            <select
              name="urgency"
              value={formData.urgency}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md bg-input text-foreground"
            >
              <option value="normal">Normal</option>
              <option value="urgent">Mendesak</option>
              <option value="emergency">Darurat</option>
            </select>
          </div>
        </div>

        {/* Project details */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Detail Proyek
          </label>
          <textarea
            name="projectDetails"
            value={formData.projectDetails}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border rounded-md bg-input text-foreground resize-none"
            placeholder="Opsional: jelaskan kebutuhan atau spesifikasi."
          />
        </div>

        <Button
          type="submit"
          variant="default"
          className="w-full"
          loading={isSubmitting}
          disabled={isSubmitting || !isFormValid}
        >
          <Icon name="ShoppingCart" size={16} className="mr-2" />
          {isSubmitting ? "Membuat Orderan..." : "Order Sekarang"}
        </Button>
      </form>

      {/* --- Konfirmasi Modal --- */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Konfirmasi Order</h2>
            <div className="text-sm space-y-1">
              <p>
                <strong>Nama:</strong> {formData.name}
              </p>
              <p>
                <strong>Email:</strong> {formData.email || "-"}
              </p>
              <p>
                <strong>Telepon:</strong> {formData.phone}
              </p>
              <p>
                <strong>Perusahaan:</strong> {formData.company || "-"}
              </p>
              <p>
                <strong>Alamat:</strong> {formData.address}
              </p>
              <p>
                <strong>Kebutuhan:</strong> {formData.quantity}
              </p>
              <p>
                <strong>Urgensi:</strong> {formData.urgency}
              </p>
              <p>
                <strong>Detail Proyek:</strong> {formData.projectDetails || "-"}
              </p>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 border rounded-md"
              >
                Batal
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-60"
                disabled={isSubmitting}
              >
                Proses
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Quick Inquiry Modal --- */}
      {showQuickInquiry && (
        <QuickInquiryModal
          productName={productName}
          onClose={() => setShowQuickInquiry(false)}
        />
      )}
    </div>
  );
}
