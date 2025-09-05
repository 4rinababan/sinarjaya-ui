import React, { useEffect, useState } from "react";
import {
  FaInfoCircle,
  FaPlus,
  FaEllipsisV,
  FaWhatsapp,
  FaPhoneAlt,
} from "react-icons/fa";
import InfoModal from "./InfoModal";
import { infoService } from "../../../api/infoService";

const InfoWidget = () => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    try {
      const res = await infoService.getInfo();
      if (res && res.data) {
        setInfo(res.data);
      } else {
        setInfo(null);
      }
    } catch (err) {
      console.error("Error fetching info:", err);
    }
    setLoading(false);
  };

  const handleAdd = () => {
    setIsEdit(false);
    setModalOpen(true);
  };

  const handleEdit = () => {
    setIsEdit(true);
    setModalOpen(true);
    setShowDropdown(false);
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="bg-gradient-to-br from-purple-100 via-white to-blue-100 rounded-xl shadow-md hover:shadow-lg transition p-6 relative border">
      {/* Titik Tiga Menu */}
      <div className="absolute top-3 right-3 z-20">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="text-gray-500 hover:text-gray-700"
        >
          <FaEllipsisV />
        </button>
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-24 bg-white shadow-lg rounded-md border text-sm z-10">
            <button
              onClick={handleEdit}
              className="block w-full text-left px-3 py-2 hover:bg-gray-100"
            >
              Edit
            </button>
          </div>
        )}
      </div>

      {/* Header: Logo + Nama + Detail */}
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={
            info.image_path
              ? `${import.meta.env.VITE_BASE_URL}/${info.image_path}`
              : "https://ui-avatars.com/api/?name=Logo&background=random"
          }
          alt="Logo"
          className="w-16 h-16 rounded-full object-cover border shadow"
        />
        <div>
          <h3 className="text-xl font-bold text-purple-800">
            {info.name || "Nama Perusahaan"}
          </h3>
          <p className="text-sm text-gray-600">
            {info.detail || "Deskripsi perusahaan belum tersedia."}
          </p>
        </div>
      </div>

      {/* Kontak */}
      <div className="flex items-center space-x-6 text-sm text-gray-700 mb-3">
        <div className="flex items-center space-x-2">
          <FaWhatsapp className="text-green-600" />
          <span>{info.phone}</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaPhoneAlt className="text-blue-600" />
          <span>{info.telephone}</span>
        </div>
      </div>

      {/* Alamat */}
      <p className="text-sm text-gray-800 italic mb-4">{info.address}</p>

      {/* Map Mini */}
      {info.latitude && info.longitude && (
        <div className="rounded-lg overflow-hidden">
          <iframe
            title="maps"
            width="100%"
            height="120"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://www.google.com/maps?q=${info.latitude},${info.longitude}&hl=es;z=14&output=embed`}
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Add button */}
      {!info && (
        <div className="text-right mt-4">
          <button
            onClick={handleAdd}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            <FaPlus className="inline mr-1" /> Tambah
          </button>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <InfoModal
          isEdit={isEdit}
          data={info}
          onClose={() => setModalOpen(false)}
          onSaved={() => {
            fetchInfo();
            setModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default InfoWidget;
