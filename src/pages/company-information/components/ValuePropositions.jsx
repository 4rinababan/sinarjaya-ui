import React from 'react';
import Icon from '../../../components/AppIcon';

const ValuePropositions = () => {
  const values = [
    {
      icon: "Award",
      title: "Kualitas Terjamin",
      description: "Produk aluminum berkualitas tinggi dengan standar internasional dan sertifikasi resmi"
    },
    {
      icon: "Users",
      title: "Tim Berpengalaman",
      description: "Didukung oleh tim ahli dengan pengalaman puluhan tahun di industri aluminum"
    },
    {
      icon: "Truck",
      title: "Pengiriman Cepat",
      description: "Jaringan distribusi luas dengan pengiriman ke seluruh Indonesia"
    },
    {
      icon: "Shield",
      title: "Garansi Produk",
      description: "Jaminan kualitas dengan garansi resmi untuk semua produk aluminum"
    },
    {
      icon: "HeartHandshake",
      title: "Layanan Prima",
      description: "Konsultasi gratis dan dukungan teknis untuk setiap kebutuhan proyek"
    },
    {
      icon: "Zap",
      title: "Inovasi Berkelanjutan",
      description: "Terus mengembangkan produk dengan teknologi terdepan dan ramah lingkungan"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            Mengapa Memilih Sinar Jaya Aluminum?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Komitmen kami terhadap keunggulan menjadikan Sinar Jaya Aluminum sebagai pilihan utama untuk semua kebutuhan aluminum Anda
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div 
              key={index}
              className="bg-card rounded-xl p-6 shadow-elevation-1 border border-border hover:shadow-elevation-2 transition-smooth group"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                    <Icon 
                      name={value.icon} 
                      size={24} 
                      className="text-primary"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePropositions;