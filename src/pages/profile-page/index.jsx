import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Icon from "../../components/AppIcon";
import { FaArrowLeft } from "react-icons/fa";
import { getUserFromToken, saveToken } from "../../utils/storage";
import { userService } from "../../api/userService";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const mockProfile = {
  user_id: "",
  name: "",
  email: "",
  phone: "",
  address: {
    location: "",
    street: "",
    city: "",
    district: "",
    subDistrict: "",
  },
  photo_url: "",
  lat: 0,
  lang: 0,
  is_active: false,
};

// ====================== Helper mapping API user ke Profile ======================
const mapUserToProfile = (_user) => ({
  user_id: _user.id,
  name: _user.name,
  email: _user.email,
  phone: _user.phone,
  photo_url: _user.photo_url,
  lat: _user.lat,
  lang: _user.lang,
  is_active: _user.is_active,
  address: {
    location: _user.address || "",
    street: "",
    city: "",
    district: "",
    subDistrict: "",
  },
});

// ====================== Cek perbedaan profile ======================
const isProfileDifferent = (localUser, apiUser) => {
  if (!localUser || !apiUser) return true;
  return (
    localUser.name !== apiUser.name ||
    localUser.email !== apiUser.email ||
    localUser.address !== apiUser.address ||
    String(localUser.lat) !== String(apiUser.lat) ||
    String(localUser.lang) !== String(apiUser.lang) ||
    (localUser.photo_url || "") !== (apiUser.photo_url || "")
  );
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [profile, setProfile] = useState(mockProfile);
  const [newPhotoFile, setNewPhotoFile] = useState(null);
  const [newPhotoPreview, setNewPhotoPreview] = useState("");
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const fileInputRef = useRef(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [changedPassword, setChangedPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // ====================== Load user from token + sync with API ======================
  useEffect(() => {
    const initProfile = async () => {
      const localUser = getUserFromToken();
      if (!localUser?.user_id) return;

      try {
        const res = await userService.getUserByID(localUser.user_id);
        const apiUser = res.data.token;
        const _user = res.data.user;

        if (isProfileDifferent(localUser, apiUser)) {
          localStorage.removeItem("jwt");
          saveToken(apiUser);
        }

        setProfile(mapUserToProfile(_user));
      } catch (error) {
        console.error("Gagal sinkronisasi user:", error.message);
        setProfile({
          ...mockProfile,
          ...localUser,
          address: {
            location: localUser.address || "",
            street: "",
            city: "",
            district: "",
            subDistrict: "",
          },
        });
      }
    };

    initProfile();
  }, []);

  // ====================== Check if user active ======================
  useEffect(() => {
    if (profile.user_id) {
      userService
        .checkUserActive(profile.user_id)
        .then((res) => setIsActive(res.data?.is_active || false))
        .catch(() => setIsActive(false));
    }
  }, [profile.user_id]);

  // ====================== Image Upload ======================
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPhotoFile(file);
      setNewPhotoPreview(URL.createObjectURL(file));
    }
  };

  // ====================== Use Current Location ======================
  const handleUseCurrentLocation = async (checked) => {
    setUseCurrentLocation(checked);
    if (checked && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lang = pos.coords.longitude;

          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lang}`
            );
            const data = await res.json();
            const { road, city, suburb, state } = data.address || {};
            setProfile((prev) => ({
              ...prev,
              lat,
              lang,
              address: {
                location: data.display_name || "",
                street: road || "",
                city: city || "",
                district: suburb || "",
                subDistrict: state || "",
              },
            }));
          } catch (error) {
            console.error("Gagal ambil alamat:", error);
            alert("Gagal ambil alamat dari lokasi saat ini");
          }
        },
        (err) => {
          alert("Gagal mendapatkan lokasi: " + err.message);
          setUseCurrentLocation(false);
        }
      );
    }
  };

  // ====================== Save Profile ======================
  const handleSaveProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("name", profile.name);
      formData.append("email", profile.email);
      formData.append("phone", profile.phone);
      formData.append("address_location", profile.address?.location || "");
      formData.append("address_street", profile.address?.street || "");
      formData.append("address_city", profile.address?.city || "");
      formData.append("address_district", profile.address?.district || "");
      formData.append(
        "address_subDistrict",
        profile.address?.subDistrict || ""
      );
      if (newPhotoFile) formData.append("photo", newPhotoFile);

      const res = await userService.updateUserProfile(
        profile.user_id,
        formData
      );
      if (res?.status !== 200)
        throw new Error(res?.message || "Gagal update profil");

      alert("Profil berhasil diperbarui");
    } catch (error) {
      alert("Gagal update profil: " + error.message);
    }
  };

  // ====================== Update Password ======================
  const handleUpdatePassword = async () => {
    try {
      if (!isActive && !newPassword?.trim())
        return alert("Password baru harus diisi");
      if (isActive && (!currentPassword?.trim() || !changedPassword?.trim()))
        return alert("Isi password lama & password baru");

      const payload = {
        user_account_id: profile?.user_id || "",
        new_password: isActive ? changedPassword : newPassword,
        is_active: isActive,
        old_password: isActive ? currentPassword : "",
      };

      const res = await userService.updatePasswordUserAccount(payload);
      if (res?.status !== 200)
        throw new Error(res?.message || "Gagal memperbarui password");

      setNewPassword("");
      setCurrentPassword("");
      setChangedPassword("");

      if (!isActive) setIsActive(true);
      alert("Password berhasil diperbarui");
    } catch (err) {
      alert(err?.message || "Terjadi kesalahan saat memperbarui password");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex items-center mb-6 space-x-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded hover:bg-gray-200"
          aria-label="Kembali"
          type="button"
        >
          <FaArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">Profil Pengguna</h1>
      </div>

      {/* Update Profile Section */}
      <section className="mb-8 border p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Update Profil</h2>
        {!isActive && (
          <p className="text-red-500 text-sm mb-2">
            Akun belum aktif. Silakan buat password terlebih dahulu.
          </p>
        )}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${
            !isActive ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-2">
              {newPhotoPreview || `${BASE_URL}/${profile.photo_url}` ? (
                <img
                  src={
                    newPhotoPreview
                      ? newPhotoPreview
                      : profile.photo_url
                      ? `${BASE_URL}/${profile.photo_url}`
                      : undefined
                  }
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              ) : (
                <Icon name="user" className="w-full h-full text-gray-400" />
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <Button onClick={() => fileInputRef.current.click()}>
              {newPhotoPreview || `${BASE_URL}${profile.photo_url}`
                ? "Ubah Gambar"
                : "Upload Foto"}
            </Button>
          </div>

          <div className="md:col-span-2 space-y-4">
            <Input
              label="Nama"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              disabled={!isActive}
            />
            <Input
              label="Email"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              disabled={!isActive}
            />
            <Input
              label="Nomor HP"
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              disabled={!isActive}
            />

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={useCurrentLocation}
                onChange={(e) => handleUseCurrentLocation(e.target.checked)}
              />
              <label>Gunakan lokasi saat ini</label>
            </div>

            {profile.address?.location && (
              <div className="text-sm text-gray-600">
                <p>Alamat: {profile.address.location}</p>
                {profile.address.city && (
                  <p>Kabupaten/Kota: {profile.address.city}</p>
                )}
                {profile.address.district && (
                  <p>Kecamatan: {profile.address.district}</p>
                )}
              </div>
            )}

            {isActive && (
              <Button onClick={handleSaveProfile}>Simpan Perubahan</Button>
            )}
          </div>
        </div>
      </section>

      {/* Update Password Section */}
      <section className="border p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">
          {isActive ? "Ganti Password" : "Buat Password"}
        </h2>
        {!isActive ? (
          <Input
            type="password"
            placeholder="Password baru"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        ) : (
          <>
            <Input
              type="password"
              placeholder="Password saat ini"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password baru"
              value={changedPassword}
              onChange={(e) => setChangedPassword(e.target.value)}
            />
          </>
        )}
        <Button onClick={handleUpdatePassword} className="mt-4">
          {isActive ? "Update Password" : "Aktifkan Akun"}
        </Button>
      </section>
    </div>
  );
};

export default ProfilePage;
