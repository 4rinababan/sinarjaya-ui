import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TestimonialSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Budi Santoso",
      role: "Kontraktor",
      company: "PT. Bangun Jaya",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      content: `Sinar Jaya Aluminum sudah menjadi partner terpercaya kami selama 8 tahun. Kualitas produk sangat baik dan pelayanan yang memuaskan. Tim mereka selalu responsif dan membantu dalam setiap proyek yang kami kerjakan.`,
      project: "Pembangunan Perumahan Green Valley",
      date: "Desember 2024"
    },
    {
      id: 2,
      name: "Sari Dewi",
      role: "Arsitek",
      company: "Studio Arsitektur Modern",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      content: `Produk aluminum dari Sinar Jaya memiliki finishing yang sangat baik dan sesuai dengan standar arsitektur modern. Mereka juga bisa custom sesuai dengan desain yang kita inginkan. Sangat recommended!`,
      project: "Renovasi Kantor Pusat",
      date: "November 2024"
    },
    {
      id: 3,
      name: "Ahmad Rahman",
      role: "Pemilik Rumah",
      company: "Pribadi",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
      rating: 5,
      content: `Kusen dan pintu aluminum yang saya beli dari Sinar Jaya sangat berkualitas. Sudah 3 tahun tidak ada masalah sama sekali. Harga juga kompetitif dibanding tempat lain. Pelayanan ramah dan profesional.`,
      project: "Renovasi Rumah Tinggal",
      date: "Oktober 2024"
    }
  ];

  const certifications = [
    {
      id: 1,
      name: "SNI Certified",
      description: "Standar Nasional Indonesia",
      icon: "Award",
      color: "text-success"
    },
    {
      id: 2,
      name: "ISO 9001:2015",
      description: "Quality Management",
      icon: "Shield",
      color: "text-primary"
    },
    {
      id: 3,
      name: "SIUP & TDP",
      description: "Legalitas Usaha",
      icon: "FileCheck",
      color: "text-warning"
    },
    {
      id: 4,
      name: "Garansi 10 Tahun",
      description: "Jaminan Kualitas",
      icon: "Clock",
      color: "text-accent"
    }
  ];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Testimoni Pelanggan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kepercayaan dan kepuasan pelanggan adalah prioritas utama kami
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Testimonials Side */}
          <div>
            <div className="relative">
              {/* Main Testimonial */}
              <div className="bg-card rounded-2xl shadow-elevation-2 p-8 border border-border">
                <div className="flex items-center mb-6">
                  <div className="relative">
                    <Image
                      src={testimonials[activeTestimonial].avatar}
                      alt={testimonials[activeTestimonial].name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                      <Icon name="Check" size={12} className="text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-heading font-semibold text-foreground">
                      {testimonials[activeTestimonial].name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[activeTestimonial].role} • {testimonials[activeTestimonial].company}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={18}
                      className="text-warning fill-current"
                    />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-foreground leading-relaxed mb-6 text-lg">
                  "{testimonials[activeTestimonial].content}"
                </blockquote>

                {/* Project Info */}
                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="font-medium">
                      {testimonials[activeTestimonial].project}
                    </span>
                    <span>{testimonials[activeTestimonial].date}</span>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-smooth"
                >
                  <Icon name="ChevronLeft" size={20} />
                </button>

                {/* Dots Indicator */}
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-smooth ${
                        index === activeTestimonial ? 'bg-primary' : 'bg-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextTestimonial}
                  className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-smooth"
                >
                  <Icon name="ChevronRight" size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Certifications Side */}
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                Sertifikasi & Jaminan
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Komitmen kami terhadap kualitas didukung oleh berbagai sertifikasi dan jaminan resmi
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-card rounded-xl p-6 border border-border hover:shadow-elevation-1 transition-smooth"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${cert.color}`}>
                      <Icon name={cert.icon} size={24} />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-foreground mb-1">
                        {cert.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {cert.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Stats */}
            <div className="mt-8 bg-card rounded-xl p-6 border border-border">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-heading font-bold text-primary mb-1">
                    1.500+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Proyek Selesai
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-heading font-bold text-success mb-1">
                    98%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Kepuasan Klien
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-heading font-bold text-warning mb-1">
                    25+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Tahun Pengalaman
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;