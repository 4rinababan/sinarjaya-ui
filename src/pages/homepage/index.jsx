import React, { useEffect, useState } from "react";
import Header from "../../components/ui/Header";
import HeroSection from "./components/HeroSection";
import CategorySection from "./components/CategorySection";
import CompanyOverview from "./components/CompanyOverview";
import FeaturedProducts from "./components/FeaturedProducts";
import { productService } from "./../../api/productService";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

const Homepage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getBestSellingProducts();
        if (response?.data && response.data.length > 0) {
          setFeaturedProducts(response.data);
        }
      } catch (error) {
        console.error("Gagal memuat produk unggulan:", error);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main Content */}
      <main className="pt-16">
        <HeroSection />
        <CategorySection />
        <CompanyOverview />

        {/* Render hanya jika ada produk */}
        {/* {!loadingProducts && featuredProducts.length > 0 && (
          <FeaturedProducts products={featuredProducts} />
        )} */}

        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;
