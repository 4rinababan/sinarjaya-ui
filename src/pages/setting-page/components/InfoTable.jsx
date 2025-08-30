import React, { useEffect, useState } from "react";
import axios from "axios";
import InfoModal from "./InfoModal";

const InfoTable = () => {
  const [info, setinfo] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editInfo, setEditInfo] = useState(null);

  const fetchinfo = async () => {
    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const res = await axios.get(`${BASE_URL}/api/info`);

      const data = res.data;
      // Pastikan bentuk data sesuai
      if (Array.isArray(data)) {
        setinfo(data); // langsung array
      } else if (Array.isArray(data.data)) {
        setinfo(data.message); // nested di .data
      } else {
        console.warn("⚠️ Unexpected data structure:", data);
        setinfo(data.message); // fallback
      }
    } catch (err) {
      console.error("❌ Failed to fetch info:", err);
      setinfo([]); // fallback saat error
    }
  };

  useEffect(() => {
    fetchinfo();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">ℹ️ informasi</h2>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setEditInfo(null);
            setOpenModal(true);
          }}
        >
          ➕ Tambah
        </button>
      </div>

      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Telepon</th>
            <th className="p-2 border">Alamat</th>
            <th className="p-2 border">Maps</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(info) &&
            info.map((cat) => (
              <tr key={cat.id}>
                <td className="p-2 border">{cat.phone}</td>
                <td className="p-2 border">{cat.tel}</td>
                <td className="p-2 border">{cat.address}</td>
                <td className="p-2 border">{cat.maps}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => {
                      setEditInfo(cat);
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
        <InfoModal
          onClose={() => setOpenModal(false)}
          onSaved={() => {
            fetchinfo();
            setOpenModal(false);
          }}
          data={editInfo}
        />
      )}
    </div>
  );
};

export default InfoTable;
