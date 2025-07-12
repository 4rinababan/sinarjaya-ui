import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CompanyOverview = () => {
  const features = [
    {
      id: 1,
      icon: "Award",
      title: "Bersertifikat SNI",
      description: "Produk berkualitas dengan sertifikasi Standar Nasional Indonesia"
    },
    {
      id: 2,
      icon: "Truck",
      title: "Pengiriman Cepat",
      description: "Layanan pengiriman ke seluruh Indonesia dengan jaminan keamanan"
    },
    {
      id: 3,
      icon: "Shield",
      title: "Garansi Kualitas",
      description: "Garansi produk hingga 10 tahun untuk kepuasan pelanggan"
    },
    {
      id: 4,
      icon: "Users",
      title: "Tim Ahli",
      description: "Didukung oleh tim teknisi berpengalaman lebih dari 15 tahun"
    }
  ];

  const stats = [
    { label: "Tahun Pengalaman", value: "25+", icon: "Calendar" },
    { label: "Proyek Selesai", value: "1.500+", icon: "Building" },
    { label: "Klien Puas", value: "98%", icon: "Heart" },
    { label: "Kota Terjangkau", value: "50+", icon: "MapPin" }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Side */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Tentang Sinar Jaya Aluminum
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Sejak tahun 1998, Sinar Jaya Aluminum telah menjadi pelopor dalam industri aluminum di Indonesia. 
                Kami berkomitmen memberikan solusi terbaik untuk kebutuhan konstruksi dan arsitektur modern.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Dengan pengalaman lebih dari dua dekade, kami telah melayani ribuan proyek dari skala rumah tinggal 
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

          {/* Image Side */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-elevation-2">
              <Image
                src="https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Sinar Jaya Aluminum Workshop"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Stats Overlay */}
            <div className="absolute -bottom-6 left-6 right-6">
              <div className="bg-card rounded-xl shadow-elevation-2 p-6 border border-border">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg mx-auto mb-2">
                        <Icon name={stat.icon} size={16} className="text-primary" />
                      </div>
                      <div className="text-2xl font-heading font-bold text-foreground mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground font-medium">
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