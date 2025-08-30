import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Slider from "react-slick";

const CompanyOverview = () => {
  const features = [
    
    {
      id: 2,
      icon: "Truck",
      title: "Pengiriman Cepat",
      description: "Layanan ke seluruh Jabodetabek"
    },
    {
      id: 3,
      icon: "Shield",
      title: "Garansi Kepuasaaan",
      description: "Kami memberi Garansi Kepuasaan pada Pelanggan"
    },
    {
      id: 4,
      icon: "Users",
      title: "Tim Ahli",
      description: "Didukung oleh tim teknisi berpengalaman lebih dari 5 tahun"
    }
  ];

  const stats = [
    { label: "Tahun Pengalaman", value: "5+", icon: "Calendar" },
    { label: "Proyek Selesai", value: "1.500+", icon: "Building" },
    { label: "Klien Puas", value: "98%", icon: "Heart" },
    { label: "Seluruh Jabodetabek", value: "50+", icon: "MapPin" }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Side */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Tentang Meisha Aluminium Kaca
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Sejak tahun 2020, Meisha Aluminium Kaca telah menjadi pelopor dalam industri Aluminium di Indonesia. 
                Kami berkomitmen memberikan solusi terbaik untuk kebutuhan konstruksi dan arsitektur modern.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Dengan pengalaman lebih dari lima tahun, kami telah melayani ribuan proyek dari skala rumah tinggal 
                hingga gedung bertingkat tinggi. Kepercayaan pelanggan adalah prioritas utama kami.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature) => (
                <div key={feature.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={feature.icon} size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => window.location.href = '/company-information'}
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-smooth"
            >
              <span className="mr-2">Pelajari Lebih Lanjut</span>
              <Icon name="ArrowRight" size={16} />
            </button>
          </div>

          {/* Image + Video Carousel Side */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-elevation-2">
              <Slider dots infinite autoplay autoplaySpeed={5000} arrows={false}>
                {[
                  { type: "image", src: "../assets/images/K1.jpeg", alt: "Proyek Pemasangan" },
                  { type: "image", src: "../assets/images/K2.jpeg", alt: "Toko Meisha" },
                  { type: "image", src: "../assets/images/K8.jpg", alt: "Toko Meisha" },
                  { type: "image", src: "../assets/images/K9.jpeg", alt: "Toko Meisha" },
                  { type: "video", src: "../assets/videos/demo.mp4", alt: "Video Pemasangan" },
                ].map((item, index) => (
                  <div key={index} className="w-full h-96 lg:h-[500px]">
                    {item.type === "image" ? (
                      <Image
                        src={item.src}
                        alt={item.alt}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          >
  <source src={item.src} type="video/mp4" />
  Browser tidak mendukung video.
</video>
          )}
        </div>
      ))}
    </Slider>
    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl" />
  </div>

  {/* Stats Overlay */}
      <div className="absolute -bottom-4 left-2 right-2 hidden sm:block">
  <div className="bg-card rounded-lg shadow-elevation-1 p-3 sm:p-4 border border-border">
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="flex items-center justify-center w-6 h-6 bg-primary/10 rounded-md mx-auto mb-1">
            <Icon name={stat.icon} size={12} className="text-primary" />
          </div>
          <div className="text-base sm:text-lg font-heading font-semibold text-foreground mb-0.5">
            {stat.value}
          </div>
          <div className="text-[10px] sm:text-xs text-muted-foreground font-medium leading-tight">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  </div>
</div>


</div>
        </div>
      </div>
    </section>
  );
};

export default CompanyOverview;