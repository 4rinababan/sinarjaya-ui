import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CertificationsSection = () => {
  const certifications = [
    {
      name: "ISO 9001:2015",
      description: "Sistem Manajemen Mutu",
      icon: "Award",
      verified: true
    },
    {
      name: "SNI 03-0409-1989",
      description: "Standar Nasional Indonesia untuk Aluminum",
      icon: "Shield",
      verified: true
    },
    {
      name: "SIUP & TDP",
      description: "Izin Usaha Perdagangan Resmi",
      icon: "FileCheck",
      verified: true
    },
    {
      name: "NPWP",
      description: "Nomor Pokok Wajib Pajak",
      icon: "Building2",
      verified: true
    }
  ];

  const qualityStandards = [
    "Aluminum Grade 6063-T5",
    "Ketebalan sesuai standar internasional",
    "Finishing powder coating berkualitas",
    "Uji kekuatan dan daya tahan",
    "Kontrol kualitas berlapis"
  ];

  return (
    <section className="py-16 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            Sertifikasi & Standar Kualitas
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Komitmen kami terhadap kualitas didukung oleh berbagai sertifikasi resmi dan standar internasional
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Certifications */}
          <div className="space-y-6">
            <h3 className="text-2xl font-heading font-semibold text-foreground mb-6">
              Sertifikasi Resmi
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <div 
                  key={index}
                  className="bg-muted/30 rounded-lg p-4 border border-border hover:border-primary/30 transition-smooth"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon 
                          name={cert.icon} 
                          size={20} 
                          className="text-primary"
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-heading font-semibold text-foreground text-sm">
                          {cert.name}
                        </h4>
                        {cert.verified && (
                          <Icon 
                            name="CheckCircle" 
                            size={16} 
                            className="text-success flex-shrink-0"
                          />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {cert.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Business Registration */}
            <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
              <h4 className="font-heading font-semibold text-foreground mb-3 flex items-center">
                <Icon name="Building2" size={20} className="mr-2 text-primary" />
                Informasi Perusahaan
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">SIUP:</span>
                  <span className="font-medium text-foreground">510.1/2008/PK/VII</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">TDP:</span>
                  <span className="font-medium text-foreground">09.09.1.51.02008</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">NPWP:</span>
                  <span className="font-medium text-foreground">01.234.567.8-901.000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quality Standards */}
          <div className="space-y-6">
            <h3 className="text-2xl font-heading font-semibold text-foreground mb-6">
              Standar Kualitas
            </h3>
            
            <div className="relative overflow-hidden rounded-xl">
              <Image
                src="https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg"
                alt="Quality control process at Sinar Jaya Aluminum"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-medium">
                  Proses kontrol kualitas berlapis untuk memastikan standar terbaik
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {qualityStandards.map((standard, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg"
                >
                  <Icon 
                    name="CheckCircle" 
                    size={18} 
                    className="text-success flex-shrink-0"
                  />
                  <span className="text-foreground font-medium">
                    {standard}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;