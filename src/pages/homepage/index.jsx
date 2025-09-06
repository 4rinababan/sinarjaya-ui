import React, { useEffect, useState } from "react";
import Header from "../../components/ui/Header";
import HeroSection from "./components/HeroSection";
import CategorySection from "./components/CategorySection";
import CompanyOverview from "./components/CompanyOverview";
import FeaturedProducts from "./components/FeaturedProducts";
import { productService } from "./../../api/productService";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import { getUserFromToken } from "../../utils/storage";
import { useNavigate } from "react-router-dom"; // <- untuk redirect
import GetOnPlaystoreCard from "./components/GetOnPlaystoreCard";

const Homepage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const navigate = useNavigate(); // hook navigate
  const user = getUserFromToken();

  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/dashboard");
    }

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

        {/* Widget Get on Playstore */}
  {/* <section className="my-12 flex justify-center">
    <GetOnPlaystoreCard
      title="Download Meisha Aluminium Kaca App"
      description="Nikmati kemudahan Pesan langsung dari smartphone Anda."
      link="https://play.google.com/store/apps/details?id=com.mak.app"
    />
  </section> */}

        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;
