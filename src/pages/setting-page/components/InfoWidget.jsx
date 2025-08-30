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
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold flex items-center text-purple-800">
          <FaInfoCircle className="text-yellow-500 mr-2" /> Informasi
        </h2>
        {!info && (
          <button
            onClick={handleAdd}
            className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded flex items-center"
          >
            <FaPlus className="mr-1" /> Tambah
          </button>
        )}
      </div>

      {info && (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 relative">
          {/* Titik Tiga Menu */}
          <div className="absolute top-3 right-3">
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

          {/* Konten Card */}
          <div className="space-y-3">
            <p className="text-gray-700 font-medium text-sm">{info.address}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <FaWhatsapp className="text-green-500" />
                <span>{info.phone}</span>
              </div>
              <div className="flex items-center space-x-1">
                <FaPhoneAlt className="text-blue-500" />
                <span>{info.telephone}</span>
              </div>
            </div>

            {/* Mini Maps */}
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
          </div>
        </div>
      )}

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
