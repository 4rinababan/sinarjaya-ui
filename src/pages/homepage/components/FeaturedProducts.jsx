import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const FeaturedProducts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const featuredProducts = [
    {
      id: 1,
      name: "Profil Aluminum 40x40",
      category: "Profil Aluminum",
      price: "Rp 85.000",
      originalPrice: "Rp 95.000",
      image: "https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      reviews: 124,
      isNew: false,
      isBestseller: true,
      discount: "11%"
    },
    {
      id: 2,
      name: "Kusen Jendela Sliding",
      category: "Kusen & Jendela",
      price: "Rp 1.250.000",
      originalPrice: "Rp 1.400.000",
      image: "https://images.pixabay.com/photo/2017/03/22/17/39/kitchen-2165756_640.jpg",
      rating: 4.9,
      reviews: 89,
      isNew: true,
      isBestseller: false,
      discount: "11%"
    },
    {
      id: 3,
      name: "Pintu Aluminum Kaca",
      category: "Pintu Aluminum",
      price: "Rp 2.850.000",
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.7,
      reviews: 156,
      isNew: false,
      isBestseller: true,
      discount: null
    },
    {
      id: 4,
      name: "Partisi Office Modern",
      category: "Partisi & Dinding",
      price: "Rp 3.200.000",
      originalPrice: "Rp 3.600.000",
      image: "https://images.pexels.com/photos/6782567/pexels-photo-6782567.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.6,
      reviews: 67,
      isNew: true,
      isBestseller: false,
      discount: "11%"
    },
    {
      id: 5,
      name: "Kanopi Aluminum Minimalis",
      category: "Atap & Kanopi",
      price: "Rp 1.850.000",
      originalPrice: null,
      image: "https://images.pixabay.com/photo/2016/11/18/17/20/roof-1836758_640.jpg",
      rating: 4.8,
      reviews: 203,
      isNew: false,
      isBestseller: true,
      discount: null
    },
    {
      id: 6,
      name: "Handle Pintu Premium",
      category: "Aksesoris",
      price: "Rp 125.000",
      originalPrice: "Rp 150.000",
      image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.5,
      reviews: 91,
      isNew: false,
      isBestseller: false,
      discount: "17%"
    }
  ];

  const itemsPerPage = 3;
  const maxIndex = Math.max(0, featuredProducts.length - itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleProductClick = (productId) => {
    window.location.href = `/product-detail?id=${productId}`;
  };

  const formatPrice = (price) => {
    return price.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Produk Unggulan
            </h2>
            <p className="text-lg text-muted-foreground">
              Produk terlaris dan terpopuler dari Sinar Jaya Aluminum
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>
        </div>

        {/* Products Carousel */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
          >
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
              >
                <div
                  onClick={() => handleProductClick(product.id)}
                  className="bg-card rounded-xl shadow-elevation-1 hover:shadow-elevation-2 transition-smooth cursor-pointer overflow-hidden border border-border group"
                >
                  {/* Product Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col space-y-2">
                      {product.isNew && (
                        <span className="bg-success text-success-foreground text-xs font-medium px-2 py-1 rounded-md">
                          Baru
                        </span>
                      )}
                      {product.isBestseller && (
                        <span className="bg-warning text-warning-foreground text-xs font-medium px-2 py-1 rounded-md">
                          Terlaris
                        </span>
                      )}
                      {product.discount && (
                        <span className="bg-error text-error-foreground text-xs font-medium px-2 py-1 rounded-md">
                          -{product.discount}
                        </span>
                      )}
                    </div>

                    {/* Quick Action */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-smooth">
                      <button className="w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center hover:bg-white transition-smooth">
                        <Icon name="Heart" size={16} className="text-muted-foreground" />
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="mb-2">
                      <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
                        {product.category}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-micro">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={14}
                            className={`${
                              i < Math.floor(product.rating)
                                ? 'text-warning fill-current' :'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-xl font-heading font-bold text-foreground">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* Action Button */}
                    <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90 transition-smooth">
                      Lihat Detail
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation Dots */}
        <div className="flex justify-center space-x-2 mt-8 md:hidden">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-smooth ${
                index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>

        {/* View All Products Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => window.location.href = '/product-catalog'}
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