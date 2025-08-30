import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ProductInfo = ({ product }) => {
  const [activeTab, setActiveTab] = useState("specifications");
  // console.log('ProductInfo product:', product);
  const tabs = [
    { id: "specifications", label: "Spesifikasi", icon: "FileText" },
    { id: "features", label: "Fitur", icon: "Star" },
    { id: "applications", label: "Aplikasi", icon: "Wrench" },
    { id: "installation", label: "Instalasi", icon: "Tool" },
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "in_stock":
        return "text-success bg-success/10";
      case "low_stock":
        return "text-warning bg-warning/10";
      case "out_of_stock":
        return "text-error bg-error/10";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "in_stock":
        return "Tersedia";
      case "low_stock":
        return "Stok Terbatas";
      case "out_of_stock":
        return "Habis";
      default:
        return "Tidak Diketahui";
    }
  };

  return (
    <div className="space-y-6">
      {/* Product Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">
            {product.name}
          </h1>
          <p className="text-muted-foreground font-caption flex items-center gap-2">
            <b>Kategori</b> :
            <span className="bg-[#A3DC9A] text-white text-sm font-medium px-3 py-1 rounded-full border border-[#3b463d]">
              {product.category?.detail || "Tidak ada kategori"}
            </span>
          </p>
        </div>

        {/* Price and Status */}
        {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="text-2xl font-heading font-bold text-primary">
              {formatPrice(product.price)}
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </div>
            )}
            <div className="text-xs text-muted-foreground">
              Per {product.unit || 'unit'}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                product.status
              )}`}
            >
              <Icon
                name={product.status === 'in_stock' ? 'CheckCircle' : 'AlertCircle'}
                size={16}
                className="mr-1"
              />
              {getStatusText(product.status)}
            </span>
          </div>
        </div> */}

        {/* Short Description */}
        <p className="text-muted-foreground leading-relaxed">
          {product.shortDescription}
        </p>
      </div>

      {/* Product Details Tabs */}
    </div>
  );
};

export default ProductInfo;
