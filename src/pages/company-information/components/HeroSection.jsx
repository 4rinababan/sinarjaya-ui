import React from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary to-secondary text-primary-foreground py-16 lg:py-24">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold leading-tight">
                Sinar Jaya Aluminum
              </h1>
              <p className="text-xl lg:text-2xl font-medium opacity-90">
                Solusi Terpercaya untuk Kebutuhan Aluminum Berkualitas
              </p>
            </div>
            
            <p className="text-lg opacity-80 leading-relaxed">
              Dengan pengalaman lebih dari 15 tahun di industri aluminum, kami telah menjadi mitra terpercaya untuk kontraktor, arsitek, dan pemilik rumah di seluruh Indonesia. Komitmen kami terhadap kualitas dan inovasi menjadikan produk aluminum kami pilihan utama untuk berbagai proyek konstruksi.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="secondary" 
                size="lg"
                iconName="Package"
                iconPosition="left"
                onClick={() => window.location.href = '/product-catalog'}
              >
                Lihat Katalog Produk
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                iconName="Phone"
                iconPosition="left"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                onClick={() => window.location.href = '/contact-inquiry'}
              >
                Hubungi Kami
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-elevation-3">
              <Image
                src="https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg"
                alt="Sinar Jaya Aluminum facility and products"
                className="w-full h-80 lg:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-6 shadow-elevation-2 border border-border">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-heading font-bold text-primary">15+</div>
                  <div className="text-sm text-muted-foreground">Tahun Pengalaman</div>
                </div>
                <div>
                  <div className="text-2xl font-heading font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Proyek Selesai</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;