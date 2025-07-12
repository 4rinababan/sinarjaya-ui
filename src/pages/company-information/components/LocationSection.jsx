import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationSection = () => {
  const [activeLocation, setActiveLocation] = useState(0);

  const locations = [
    {
      name: "Kantor Pusat & Showroom",
      type: "Headquarters",
      address: "Jl. Industri Raya No. 45, Kawasan Industri Pulogadung",
      city: "Jakarta Timur, DKI Jakarta 13260",
      phone: "+62 21 4608 7890",
      whatsapp: "+62 812 3456 7890",
      email: "info@sinarjayaaluminum.co.id",
      hours: {
        weekdays: "08:00 - 17:00 WIB",
        saturday: "08:00 - 15:00 WIB",
        sunday: "Tutup"
      },
      coordinates: "-6.1944,106.8229",
      services: [
        "Showroom produk lengkap",
        "Konsultasi teknis",
        "Kantor administrasi",
        "Customer service"
      ],
      isMain: true
    },
    {
      name: "Pabrik Produksi",
      type: "Manufacturing",
      address: "Jl. Raya Bekasi KM 28, Kawasan Industri MM2100",
      city: "Cikarang Barat, Bekasi 17520",
      phone: "+62 21 8998 5432",
      whatsapp: "+62 812 3456 7891",
      email: "production@sinarjayaaluminum.co.id",
      hours: {
        weekdays: "07:00 - 16:00 WIB",
        saturday: "07:00 - 12:00 WIB",
        sunday: "Tutup"
      },
      coordinates: "-6.2608,107.1534",
      services: [
        "Fasilitas produksi",
        "Quality control lab",
        "Warehouse utama",
        "Loading dock"
      ],
      isMain: false
    },
    {
      name: "Cabang Surabaya",
      type: "Branch Office",
      address: "Jl. Margomulyo Indah Blok B-15",
      city: "Surabaya, Jawa Timur 60183",
      phone: "+62 31 7532 1098",
      whatsapp: "+62 812 3456 7892",
      email: "surabaya@sinarjayaaluminum.co.id",
      hours: {
        weekdays: "08:00 - 17:00 WIB",
        saturday: "08:00 - 15:00 WIB",
        sunday: "Tutup"
      },
      coordinates: "-7.2575,112.7521",
      services: [
        "Showroom regional",
        "Layanan pelanggan",
        "Gudang distribusi",
        "Technical support"
      ],
      isMain: false
    }
  ];

  const contactMethods = [
    {
      icon: "Phone",
      title: "Telepon",
      value: "+62 21 4608 7890",
      description: "Senin - Jumat: 08:00 - 17:00 WIB",
      action: () => window.open('tel:+622146087890', '_self')
    },
    {
      icon: "MessageCircle",
      title: "WhatsApp",
      value: "+62 812 3456 7890",
      description: "Chat langsung dengan tim kami",
      action: () => window.open('https://wa.me/6281234567890', '_blank')
    },
    {
      icon: "Mail",
      title: "Email",
      value: "info@sinarjayaaluminum.co.id",
      description: "Respon dalam 24 jam",
      action: () => window.open('mailto:info@sinarjayaaluminum.co.id', '_self')
    },
    {
      icon: "Globe",
      title: "Website",
      value: "www.sinarjayaaluminum.co.id",
      description: "Katalog online lengkap",
      action: () => window.open('https://sinarjayaaluminum.co.id', '_blank')
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            Lokasi & Kontak
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Kunjungi showroom kami atau hubungi tim untuk konsultasi dan informasi produk
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <div 
              key={index}
              className="bg-card rounded-xl p-6 border border-border hover:shadow-elevation-2 transition-smooth group cursor-pointer"
              onClick={method.action}
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-smooth">
                  <Icon 
                    name={method.icon} 
                    size={24} 
                    className="text-primary"
                  />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">
                  {method.title}
                </h3>
                <p className="text-primary font-medium text-sm mb-2">
                  {method.value}
                </p>
                <p className="text-xs text-muted-foreground">
                  {method.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Location Tabs */}
        <div className="bg-card rounded-2xl border border-border shadow-elevation-1 overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-border">
            <div className="flex overflow-x-auto">
              {locations.map((location, index) => (
                <button
                  key={index}
                  onClick={() => setActiveLocation(index)}
                  className={`flex-1 min-w-0 px-6 py-4 text-sm font-medium transition-smooth ${
                    activeLocation === index
                      ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Icon 
                      name={location.isMain ? "Building2" : "MapPin"} 
                      size={16} 
                    />
                    <span className="truncate">{location.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {locations.map((location, index) => (
              <div
                key={index}
                className={`${activeLocation === index ? 'block' : 'hidden'}`}
              >
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Location Info */}
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-2xl font-heading font-semibold text-foreground">
                          {location.name}
                        </h3>
                        {location.isMain && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                            Utama
                          </span>
                        )}
                      </div>
                      <p className="text-primary font-medium mb-1">
                        {location.type}
                      </p>
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                      <div className="flex items-start space-x-3">
                        <Icon name="MapPin" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-foreground font-medium">
                            {location.address}
                          </p>
                          <p className="text-muted-foreground">
                            {location.city}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Icon name="Phone" size={18} className="text-primary" />
                        <span className="text-foreground">{location.phone}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Icon name="MessageCircle" size={18} className="text-primary" />
                        <span className="text-foreground">{location.whatsapp}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Icon name="Mail" size={18} className="text-primary" />
                        <span className="text-foreground">{location.email}</span>
                      </div>
                    </div>

                    {/* Business Hours */}
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-heading font-semibold text-foreground mb-3 flex items-center">
                        <Icon name="Clock" size={18} className="mr-2 text-primary" />
                        Jam Operasional
                      </h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Senin - Jumat:</span>
                          <span className="font-medium text-foreground">{location.hours.weekdays}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Sabtu:</span>
                          <span className="font-medium text-foreground">{location.hours.saturday}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Minggu:</span>
                          <span className="font-medium text-foreground">{location.hours.sunday}</span>
                        </div>
                      </div>
                    </div>

                    {/* Services */}
                    <div>
                      <h4 className="font-heading font-semibold text-foreground mb-3">
                        Layanan Tersedia:
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {location.services.map((service, serviceIndex) => (
                          <div 
                            key={serviceIndex}
                            className="flex items-center space-x-2"
                          >
                            <Icon 
                              name="CheckCircle" 
                              size={16} 
                              className="text-success flex-shrink-0"
                            />
                            <span className="text-sm text-foreground">
                              {service}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        variant="default"
                        iconName="Navigation"
                        iconPosition="left"
                        onClick={() => window.open(`https://www.google.com/maps?q=${location.coordinates}&z=15`, '_blank')}
                      >
                        Buka di Maps
                      </Button>
                      <Button
                        variant="outline"
                        iconName="MessageCircle"
                        iconPosition="left"
                        onClick={() => window.open(`https://wa.me/${location.whatsapp.replace(/[^0-9]/g, '')}`, '_blank')}
                      >
                        WhatsApp
                      </Button>
                    </div>
                  </div>

                  {/* Map */}
                  <div className="space-y-4">
                    <div className="relative overflow-hidden rounded-xl border border-border">
                      <iframe
                        width="100%"
                        height="400"
                        loading="lazy"
                        title={location.name}
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps?q=${location.coordinates}&z=15&output=embed`}
                        className="w-full h-full"
                      />
                    </div>
                    
                    <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                      <div className="flex items-start space-x-3">
                        <Icon name="Info" size={18} className="text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-foreground mb-1">
                            Petunjuk Arah:
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {location.isMain 
                              ? "Dari Tol Cakung, keluar di Pulogadung. Lurus sekitar 2km, lokasi di sebelah kanan jalan." :"Akses mudah dari Tol Jakarta-Cikampek, keluar di Cikarang Barat. Ikuti papan petunjuk MM2100."
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-12 bg-card rounded-xl p-8 border border-border text-center">
          <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
            Butuh Bantuan Segera?
          </h3>
          <p className="text-muted-foreground mb-6">
            Tim customer service kami siap membantu Anda 24/7 melalui WhatsApp
          </p>
          <Button
            variant="default"
            size="lg"
            iconName="MessageCircle"
            iconPosition="left"
            onClick={() => window.open('https://wa.me/6281234567890', '_blank')}
          >
            Chat WhatsApp Sekarang
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;