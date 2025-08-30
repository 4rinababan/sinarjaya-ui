import React, { useState, useEffect, useRef } from "react";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";

const FeaturedProducts = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const carouselRef = useRef(null);
  const itemsPerPage = 3;
  const minSwipeDistance = 50;

  if (!products || products.length === 0) return null; // Double safety

  const maxIndex = Math.max(0, products.length - itemsPerPage);

  const nextSlide = () =>
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  const prevSlide = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance && currentIndex < maxIndex) nextSlide();
    if (distance < -minSwipeDistance && currentIndex > 0) prevSlide();
  };

  const handleProductClick = (productId) => {
    window.location.href = `/product-detail?id=${productId}`;
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Produk Unggulan
            </h2>
            <p className="text-lg text-muted-foreground">
              Produk terlaris dan terpopuler dari Sinar Jaya Aluminum
            </p>
          </div>
          {/* Navigasi Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-smooth disabled:opacity-50"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-smooth disabled:opacity-50"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="relative overflow-hidden md:overflow-hidden"
          ref={carouselRef}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="hidden md:flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
              >
                <div
                  onClick={() => handleProductClick(product.id)}
                  className="bg-card rounded-xl shadow-elevation-1 hover:shadow-elevation-2 transition-smooth cursor-pointer overflow-hidden border border-border group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.jpg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-2 group-hover:text-primary">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {product.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => (window.location.href = "/product-catalog")}
            className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-smooth"
          >
            <span className="mr-2">Lihat Semua Produk</span>
            <Icon name="ArrowRight" size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
