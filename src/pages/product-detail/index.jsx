import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Header from "../../components/ui/Header";
import Breadcrumb from "../../components/ui/Breadcrumb";
import ProductImageGallery from "./components/ProductImageGallery";
import ProductInfo from "./components/ProductInfo";
import InquiryForm from "./components/InquiryForm";
import SocialShare from "./components/SocialShare";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const ProductDetail = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id") || "1";
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/api/products/${productId}`);
        if (!res.ok) throw new Error("Gagal mengambil data produk");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message || "Terjadi kesalahan saat mengambil data");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const breadcrumbItems = [
    { label: "Beranda", href: "/homepage" },
    { label: "Katalog Produk", href: "/product-catalog" },
    { label: product?.category?.name || "Kategori", href: "/product-catalog" },
    { label: product?.name || "Detail Produk" },
  ];

  const currentUrl = `${window.location.origin}/product-detail?id=${productId}`;

  if (loading) {
    return (
      <div className="min-h-screen bg-background overflow-x-hidden">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse space-y-8">
              <div className="h-6 bg-muted rounded w-1/3"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="aspect-square bg-muted rounded-lg"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-muted rounded w-3/4"></div>
                  <div className="h-6 bg-muted rounded w-1/2"></div>
                  <div className="h-20 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background overflow-x-hidden">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
            <Icon name="AlertCircle" size={64} className="text-error mx-auto" />
            <h1 className="text-2xl font-heading font-bold text-foreground mb-4">
              Error
            </h1>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Link to="/product-catalog">
              <Button variant="default">
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Kembali ke Katalog
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center space-y-4">
              <Icon
                name="AlertCircle"
                size={64}
                className="text-muted-foreground mx-auto"
              />
              <h1 className="text-2xl font-heading font-bold text-foreground">
                Produk Tidak Ditemukan
              </h1>
              <p className="text-muted-foreground">
                Produk yang Anda cari tidak tersedia atau telah dihapus.
              </p>
              <Link to="/product-catalog">
                <Button variant="default">
                  <Icon name="ArrowLeft" size={16} className="mr-2" />
                  Kembali ke Katalog
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Product Detail Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Product Images */}
            <div className="relative w-full max-w-full overflow-hidden rounded-xl">
              <ProductImageGallery
                images={product.data.images}
                productName={product.data.name}
              />
            </div>

            {/* Product Information */}
            <div>
              <ProductInfo product={product.data} />
            </div>
          </div>

          {/* Inquiry and Social Share Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <InquiryForm
                productName={product.data.name}
                productSku={product.data.sku}
                product={product.data}
              />
            </div>
            <div>
              <SocialShare productName={product.name} productUrl={currentUrl} />
            </div>
          </div>

          {/* Back to Catalog */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="text-center">
              <Link to="/product-catalog">
                <Button variant="outline" size="lg">
                  <Icon name="ArrowLeft" size={20} className="mr-2" />
                  Kembali ke Katalog Produk
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
