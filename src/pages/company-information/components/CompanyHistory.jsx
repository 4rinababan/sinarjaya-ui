import React from 'react';
import Icon from '../../../components/AppIcon';

const CompanyHistory = () => {
  const milestones = [
    {
      year: "2008",
      title: "Pendirian Perusahaan",
      description: "Sinar Jaya Aluminum didirikan dengan visi menjadi distributor aluminum terpercaya di Indonesia",
      icon: "Building2"
    },
    {
      year: "2011",
      title: "Ekspansi Produk",
      description: "Menambah lini produk kusen, pintu, dan jendela aluminum dengan kualitas premium",
      icon: "Package"
    },
    {
      year: "2014",
      title: "Sertifikasi ISO",
      description: "Memperoleh sertifikasi ISO 9001:2015 untuk sistem manajemen mutu",
      icon: "Award"
    },
    {
      year: "2017",
      title: "Jaringan Distribusi",
      description: "Memperluas jaringan distribusi ke seluruh Indonesia dengan 15 cabang",
      icon: "MapPin"
    },
    {
      year: "2020",
      title: "Inovasi Digital",
      description: "Meluncurkan platform digital untuk kemudahan pemesanan dan konsultasi online",
      icon: "Smartphone"
    },
    {
      year: "2023",
      title: "Teknologi Ramah Lingkungan",
      description: "Mengadopsi teknologi produksi ramah lingkungan dan program daur ulang aluminum",
      icon: "Leaf"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            Perjalanan Sinar Jaya Aluminum
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Dari perusahaan kecil hingga menjadi pemimpin industri aluminum di Indonesia
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:transform md:-translate-x-0.5"></div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full border-4 border-card md:transform md:-translate-x-1/2 z-10"></div>

                {/* Content */}
                <div className={`flex-1 ml-12 md:ml-0 ${
                  index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                }`}>
                  <div className="bg-card rounded-xl p-6 shadow-elevation-1 border border-border hover:shadow-elevation-2 transition-smooth">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon 
                            name={milestone.icon} 
                            size={24} 
                            className="text-primary"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                            {milestone.year}
                          </span>
                        </div>
                        <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Status */}
        <div className="mt-16 text-center">
          <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
              Sinar Jaya Aluminum Hari Ini
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-primary mb-2">15+</div>
                <div className="text-sm text-muted-foreground">Tahun Pengalaman</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Proyek Selesai</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Varian Produk</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-primary mb-2">15</div>
                <div className="text-sm text-muted-foreground">Cabang di Indonesia</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyHistory;