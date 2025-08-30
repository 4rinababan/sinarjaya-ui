import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Icon from "../../../components/AppIcon";
import { categoryService } from "./../../../api/categoryService"; // <-- import service

export default function CategoryCarousel() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    categoryService
      .getAll(1, 10)
      .then((json) => {
        // console.log("API response:", json); // <--- cek struktur response
        setCategories(json.data?.data || []);
      })
      .catch((err) => console.error("API error:", err));
  }, []);

  return (
    <section className="py-8 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Kategori Produk</h2>

        <Swiper
          spaceBetween={16}
          slidesPerView={1.2}
          navigation={true}
          modules={[Navigation]}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.2 },
          }}
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <div className="bg-card rounded-xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden border border-border">
                <div className="relative h-48">
                  <img
                    src={`${BASE_URL}/${category.image_path}`}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 rounded-lg flex items-center justify-center">
                    <img
                      src={`${BASE_URL}/${category.icon}`}
                      alt="icon"
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {category.detail}
                  </p>
                  <div className="flex items-center text-primary font-medium">
                    {/* <div
                      className="flex items-center text-primary font-medium cursor-pointer"
                      onClick={() => handleClick(category.name)}
                    ></div>
                    <span className="mr-1">Lihat Produk</span>
                    <Icon name="ArrowRight" size={16} /> */}

                    <button
                      onClick={() =>
                        (window.location.href = `/product-catalog?category=${category.name}`)
                      }
                      className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-smooth"
                    >
                      <span className="mr-1">Lihat Produk</span>
                      <Icon name="ArrowRight" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
