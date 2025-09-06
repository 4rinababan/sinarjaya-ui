import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [

    {
      id: 1,
      image: "../../assets/images/BG-1.jpeg",
      title: "Solusi Aluminium Anda",
      subtitle: "Produk berkualitas tinggi untuk konstruksi dan renovasi",
      description: "Dapatkan material Aluminium premium dengan harga terjangkau"
    },
    {
      id: 2,
      image: "../../assets/images/BG-2.jpg",
      title: "Inovasi Desain Modern",
      subtitle: "Aluminium berkualitas untuk arsitektur kontemporer",
      description: "Wujudkan visi arsitektur Anda dengan produk Aluminium yang tahan lama dan estetis"
    },
    {
      id: 3,
      image: "../../assets/images/BG-3.jpg",
      title: "Kepercayaan Kontraktor",
      subtitle: "Partner terpilih untuk proyek konstruksi",
      description: "Dipercaya oleh ribuan kontraktor di seluruh Indonesia untuk proyek berkualitas tinggi"
    },
    {
      id: 4,
      image: "../../assets/images/BG-4.jpeg",
      title: "Pengerjaan Cepat",
      subtitle: "Dengan layanan pengiriman cepat dan tepat waktu",
      description: "Dipercaya oleh ribuan kontraktor di seluruh Indonesia untuk proyek berkualitas tinggi"
    },{
      id: 5,
      image: "../../assets/images/BG-5.jpg",
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
    <section className="relative bg-muted">
      {/* Mobile Layout - Stacked */}
      <div className="block sm:hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
            }`}
          >
            {/* Mobile Image */}
            <div className="relative h-[300px] overflow-hidden">
              <Image
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            {/* Mobile Content Below Image */}
            <div className="px-4 py-6 text-center bg-background">
              <h1 className="text-xl font-heading font-bold mb-2 leading-tight text-foreground">
                {slide.title}
              </h1>
              <p className="text-base font-medium mb-2 text-muted-foreground leading-relaxed">
                {slide.subtitle}
              </p>
              <p className="text-sm mb-4 text-muted-foreground leading-relaxed">
                {slide.description}
              </p>
              
              {/* Mobile Buttons - Single Row */}
              <div className="flex gap-2 justify-center">
                <Button
                  variant="default"
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1 max-w-[180px] text-sm py-2.5 px-4 h-9"
                  onClick={() => window.location.href = '/product-catalog'}
                >
                  Lihat Katalog
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground flex-1 max-w-[140px] text-sm py-2.5 px-4 h-9"
                  onClick={() => window.location.href = '/contact-inquiry'}
                >
                  Hubungi Kami
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Mobile Slide Indicators */}
        <div className="flex justify-center pb-4 space-x-2 bg-background">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-smooth ${
                index === currentSlide ? 'bg-primary' : 'bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Layout - Overlay (existing) */}
      <div className="hidden sm:block relative h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
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
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>
            
            {/* Desktop Content Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center text-white">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-xl lg:text-2xl font-medium mb-3 opacity-90 leading-relaxed">
                  {slide.subtitle}
                </p>
                <p className="text-base md:text-lg mb-8 opacity-80 max-w-2xl mx-auto leading-relaxed">
                  {slide.description}
                </p>
                <div className="flex flex-row gap-4 justify-center items-center">
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[200px] text-base py-3 px-6 h-11"
                    onClick={() => window.location.href = '/product-catalog'}
                  >
                    Lihat Katalog Produk
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-success hover:bg-primary/90 text-primary-foreground min-w-[200px] text-base py-3 px-6 h-11"
                    onClick={() => window.location.href = '/contact-inquiry'}
                  >
                    Hubungi Kami
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Desktop Navigation Arrows */}
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

        {/* Desktop Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-smooth ${
                index === currentSlide ? 'bg-white' : 'bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;