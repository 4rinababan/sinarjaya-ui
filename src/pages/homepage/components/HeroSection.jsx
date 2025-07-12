import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      id: 1,
      image: "https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Solusi Aluminum Terpercaya",
      subtitle: "Produk berkualitas tinggi untuk konstruksi dan renovasi",
      description: "Dapatkan material aluminum premium dengan harga terjangkau dan layanan terbaik di Indonesia"
    },
    {
      id: 2,
      image: "https://images.pixabay.com/photo/2016/11/29/06/15/facade-1867308_1280.jpg",
      title: "Inovasi Desain Modern",
      subtitle: "Aluminum berkualitas untuk arsitektur kontemporer",
      description: "Wujudkan visi arsitektur Anda dengan produk aluminum yang tahan lama dan estetis"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      title: "Kepercayaan Kontraktor",
      subtitle: "Partner terpilih untuk proyek konstruksi",
      description: "Dipercaya oleh ribuan kontraktor di seluruh Indonesia untuk proyek berkualitas tinggi"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section className="relative h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden bg-muted">
      {/* Hero Slides */}
      <div className="relative w-full h-full">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
            
            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl font-medium mb-2 opacity-90">
                  {slide.subtitle}
                </p>
                <p className="text-base md:text-lg mb-8 opacity-80 max-w-2xl mx-auto">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="default"
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => window.location.href = '/product-catalog'}
                  >
                    Lihat Katalog Produk
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-primary"
                    onClick={() => window.location.href = '/contact-inquiry'}
                  >
                    Hubungi Kami
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-smooth backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-smooth backdrop-blur-sm"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-smooth ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;