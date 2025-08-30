import React from "react";
import { FaTools, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CategoryWidget from "./components/CategoryWidget";
import ProductWidget from "./components/ProductWidget";
import InfoWidget from "./components/InfoWidget";

const SettingsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-4 py-6 bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
              title="Kembali"
            >
              <FaArrowLeft className="text-xl" />
            </button>

            <h1 className="text-2xl font-bold flex items-center text-purple-800">
              <FaTools className="mr-2" /> Settings Panel
            </h1>
          </div>
        </div>

        <CategoryWidget />
        <ProductWidget />
        <InfoWidget />
      </div>
    </div>
  );
};

export default SettingsPage;
