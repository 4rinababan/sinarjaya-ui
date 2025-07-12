import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FacilityShowcase = () => {
  const [activeTab, setActiveTab] = useState(0);

  const facilities = [
    {
      title: "Fasilitas Produksi",
      description: "Area produksi modern dengan teknologi terdepan untuk menghasilkan produk aluminum berkualitas tinggi",
      images: [
        {
          src: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg",
          alt: "Production facility main floor"
        },
        {
          src: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
          alt: "Manufacturing equipment"
        }
      ],
      features: [
        "Mesin cutting otomatis presisi tinggi",
        "Sistem powder coating berkualitas",
        "Area assembly dengan kontrol kualitas",
        "Kapasitas produksi 1000 unit/hari"
      ]
    },
    {
      title: "Quality Control Lab",
      description: "Laboratorium kontrol kualitas dengan peralatan testing standar internasional",
      images: [
        {
          src: "https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg",
          alt: "Quality control laboratory"
        },
        {
          src: "https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg",
          alt: "Testing equipment"
        }
      ],
      features: [
        "Uji kekuatan tarik aluminum",
        "Pengujian ketahanan korosi",
        "Analisis komposisi material",
        "Sertifikasi setiap batch produksi"
      ]
    },
    {
      title: "Warehouse & Distribusi",
      description: "Gudang modern dengan sistem manajemen inventory dan distribusi ke seluruh Indonesia",
      images: [
        {
          src: "https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg",
          alt: "Modern warehouse facility"
        },
        {
          src: "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg",
          alt: "Distribution center"
        }
      ],
      features: [
        "Kapasitas penyimpanan 5000 m³",
        "Sistem inventory real-time",
        "Loading dock untuk truk besar",
        "Jaringan distribusi 15 kota"
      ]
    }
  ];

  const stats = [
    {
      icon: "Factory",
      value: "3,500",
      unit: "m²",
      label: "Luas Fasilitas"
    },
    {
      icon: "Users",
      value: "45",
      unit: "+",
      label: "Karyawan Ahli"
    },
    {
      icon: "Package",
      value: "1,000",
      unit: "/hari",
      label: "Kapasitas Produksi"
    },
    {
      icon: "Truck",
      value: "15",
      unit: "kota",
      label: "Jaringan Distribusi"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            Fasilitas & Kapabilitas Produksi
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Fasilitas modern dengan teknologi terdepan untuk memastikan kualitas dan efisiensi produksi
          </p>
        </div>

        {/* Facility Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-card rounded-xl p-6 text-center border border-border shadow-elevation-1"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon 
                  name={stat.icon} 
                  size={24} 
                  className="text-primary"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline justify-center space-x-1">
                  <span className="text-2xl font-heading font-bold text-primary">
                    {stat.value}
                  </span>
                  <span className="text-sm font-medium text-primary">
                    {stat.unit}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Facility Tabs */}
        <div className="bg-card rounded-2xl border border-border shadow-elevation-1 overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-border">
            <div className="flex overflow-x-auto">
              {facilities.map((facility, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex-1 min-w-0 px-6 py-4 text-sm font-medium transition-smooth ${
                    activeTab === index
                      ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {facility.title}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className={`${activeTab === index ? 'block' : 'hidden'}`}
              >
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                  {/* Images */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {facility.images.map((image, imgIndex) => (
                        <div 
                          key={imgIndex}
                          className="relative overflow-hidden rounded-lg aspect-video"
                        >
                          <Image
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover hover:scale-105 transition-smooth"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-heading font-semibold text-foreground mb-3">
                        {facility.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {facility.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-heading font-semibold text-foreground mb-4">
                        Fitur Unggulan:
                      </h4>
                      <div className="space-y-3">
                        {facility.features.map((feature, featureIndex) => (
                          <div 
                            key={featureIndex}
                            className="flex items-start space-x-3"
                          >
                            <Icon 
                              name="CheckCircle" 
                              size={18} 
                              className="text-success flex-shrink-0 mt-0.5"
                            />
                            <span className="text-foreground">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Flow */}
        <div className="mt-12 bg-card rounded-xl p-8 border border-border">
          <h3 className="text-2xl font-heading font-semibold text-foreground text-center mb-8">
            Alur Proses Produksi
          </h3>
          
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { icon: "Package", title: "Material Input", desc: "Bahan baku aluminum berkualitas" },
              { icon: "Settings", title: "Processing", desc: "Cutting & forming presisi" },
              { icon: "Palette", title: "Finishing", desc: "Powder coating & anodizing" },
              { icon: "Shield", title: "Quality Check", desc: "Inspeksi kualitas berlapis" },
              { icon: "Truck", title: "Packaging", desc: "Kemasan aman untuk distribusi" }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name={step.icon} size={24} className="text-primary" />
                </div>
                <h4 className="font-heading font-semibold text-foreground mb-2">
                  {step.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {step.desc}
                </p>
                {index < 4 && (
                  <Icon 
                    name="ArrowRight" 
                    size={16} 
                    className="text-muted-foreground mx-auto mt-3 hidden md:block"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacilityShowcase;