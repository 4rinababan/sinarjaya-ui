import React from "react";
import { Link } from "react-router-dom";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ProductCard = ({ product = {}, onQuickInquiry = () => {} }) => {
  const formatPrice = (price) => {
    if (price == null || isNaN(price)) return "Harga tidak tersedia";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // console.log('ProductCard product:', product);
  const getStockStatus = (stock) => {
    if (typeof stock !== "number")
      return {
        label: "Tidak diketahui",
        color: "text-gray-500",
        bgColor: "bg-gray-100",
      };
    if (stock > 10)
      return {
        label: "Terbatas",
        color: "text-warning",
        bgColor: "bg-warning/10",
      };
    if (stock > 0)
      return {
        label: "Sisa Sedikit",
        color: "text-error",
        bgColor: "bg-error/10",
      };
    return {
      label: "Habis",
      color: "text-muted-foreground",
      bgColor: "bg-muted",
    };
  };

  const stockStatus = getStockStatus(product.stock);

  const firstImage = product.images?.[0] || "/placeholder.png";
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  return (
    <div className="group bg-card rounded-lg border border-border overflow-hidden shadow-elevation-1 hover:shadow-elevation-2 transition-smooth">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={API_BASE_URL + "/" + firstImage}
          alt={product.name ?? "Produk"}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
        {product.isNew && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-accent-foreground bg-accent">
              Terlaris
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-heading font-semibold text-foreground text-sm line-clamp-2 group-hover:text-primary transition-micro">
            <Link to={`/product-detail?id=${product.id ?? ""}`}>
              {product.name ?? "Nama produk tidak tersedia"}
            </Link>
          </h3>
          <p className="text-xs font-caption text-muted-foreground mt-1">
            {product.category?.detail || "Tidak ada kategori"}
          </p>
        </div>

        <div className="mb-3">
          <div className="flex items-center space-x-4 text-xs font-caption text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Package" size={12} />
              <span>Stok: {product.stock ?? "100"}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={12} />
              <span>{product.rating ?? "5"}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outlined"
            size="sm"
            className="flex-1 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
            iconName="Eye"
            iconPosition="left"
            iconSize={14}
            asChild
          >
            <Link to={`/product-detail?id=${product.id ?? ""}`}>Detail</Link>
          </Button>
          <Button
            variant="success"
            size="sm"
            className="flex-1"
            iconName="MessageCircle"
            iconPosition="left"
            iconSize={14}
            onClick={() => onQuickInquiry(product)}
            // disabled={product.stock === 0 || product.stock == null}
          >
            Tanya
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
