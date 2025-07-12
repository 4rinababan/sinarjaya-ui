import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Ir. Bambang Sutrisno",
      position: "Direktur PT. Konstruksi Mandiri",
      company: "PT. Konstruksi Mandiri",
      project: "Pembangunan Gedung Perkantoran 15 Lantai",
      image: "https://randomuser.me/api/portraits/men/52.jpg",
      rating: 5,
      testimonial: `Sinar Jaya Aluminum telah menjadi partner terpercaya kami selama 8 tahun. Kualitas produk aluminum mereka sangat konsisten dan sesuai dengan spesifikasi teknis yang ketat. Tim teknis mereka juga sangat responsif dalam memberikan solusi untuk kebutuhan khusus proyek kami.`,
      projectValue: "Rp 2.5 Miliar",
      completedYear: "2023"
    },
    {
      name: "Arsitek Sari Dewi",
      position: "Principal Architect",
      company: "Studio Arsitektur Modern",
      project: "Desain Rumah Minimalis Premium",
      image: "https://randomuser.me/api/portraits/women/35.jpg",
      rating: 5,
      testimonial: `Sebagai arsitek, saya sangat memperhatikan detail dan kualitas material. Produk aluminum dari Sinar Jaya selalu memenuhi ekspektasi klien dengan finishing yang sempurna dan presisi yang tinggi. Mereka juga menyediakan konsultasi teknis yang sangat membantu dalam proses desain.`,
      projectValue: "Rp 850 Juta",
      completedYear: "2023"
    },
    {
      name: "Budi Hartono",
      position: "Pemilik Rumah",
      company: "Renovasi Rumah Pribadi",
      project: "Renovasi Kusen dan Pintu Aluminum",
      image: "https://randomuser.me/api/portraits/men/41.jpg",
      rating: 5,
      testimonial: `Sangat puas dengan produk dan layanan Sinar Jaya Aluminum. Proses pemesanan mudah, pengiriman tepat waktu, dan hasil pemasangan sangat memuaskan. Kusen aluminum yang dipasang sudah 2 tahun dan masih terlihat seperti baru. Harga juga sangat kompetitif.`,
      projectValue: "Rp 45 Juta",
      completedYear: "2022"
    },
    {
      name: "Ir. Ahmad Fauzi",
      position: "Project Manager",
      company: "PT. Pembangunan Jaya",
      project: "Kompleks Perumahan Green Valley",
      image: "https://randomuser.me/api/portraits/men/48.jpg",
      rating: 5,
      testimonial: `Untuk proyek perumahan skala besar, kami membutuhkan supplier yang dapat memenuhi volume besar dengan kualitas konsisten. Sinar Jaya Aluminum terbukti mampu memenuhi kebutuhan 150 unit rumah dengan standar kualitas yang sama. Sistem distribusi mereka juga sangat efisien.`,
      projectValue: "Rp 4.2 Miliar",
      completedYear: "2023"
    },
    {
      name: "Linda Kusuma",
      position: "Interior Designer",
      company: "Creative Interior Solutions",
      project: "Desain Interior Kantor Modern",
      image: "https://randomuser.me/api/portraits/women/29.jpg",
      rating: 5,
      testimonial: `Kolaborasi dengan Sinar Jaya Aluminum selalu memberikan hasil yang memuaskan. Mereka memiliki variasi produk yang lengkap dan dapat disesuaikan dengan konsep desain yang kami buat. Tim mereka juga sangat kooperatif dalam mengakomodasi permintaan custom.`,
      projectValue: "Rp 320 Juta",
      completedYear: "2023"
    }
  ];

  const clientLogos = [
    { name: "PT. Konstruksi Mandiri", logo: "Building2" },
    { name: "Studio Arsitektur Modern", logo: "Compass" },
    { name: "PT. Pembangunan Jaya", logo: "Home" },
    { name: "Creative Interior Solutions", logo: "Palette" },
    { name: "PT. Properti Nusantara", logo: "Building" },
    { name: "Arsitek & Associates", logo: "Ruler" }
  ];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            Testimoni Klien
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Kepercayaan dan kepuasan klien adalah prioritas utama kami
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="bg-muted/30 rounded-2xl p-8 lg:p-12 mb-12 relative overflow-hidden">
          <div className="absolute top-4 right-4 text-6xl text-primary/10">
            <Icon name="Quote" size={80} />
          </div>
          
          <div className="relative z-10">
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              {/* Client Info */}
              <div className="text-center lg:text-left">
                <div className="w-24 h-24 mx-auto lg:mx-0 mb-4 overflow-hidden rounded-full">
                  <Image
                    src={testimonials[activeTestimonial].image}
                    alt={testimonials[activeTestimonial].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-1">
                  {testimonials[activeTestimonial].name}
                </h3>
                <p className="text-primary font-medium mb-1">
                  {testimonials[activeTestimonial].position}
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  {testimonials[activeTestimonial].company}
                </p>
                
                {/* Rating */}
                <div className="flex justify-center lg:justify-start space-x-1 mb-4">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
                  ))}
                </div>

                {/* Project Details */}
                <div className="bg-card rounded-lg p-4 border border-border">
                  <h4 className="font-heading font-semibold text-foreground text-sm mb-2">
                    Detail Proyek:
                  </h4>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p><span className="font-medium">Proyek:</span> {testimonials[activeTestimonial].project}</p>
                    <p><span className="font-medium">Nilai:</span> {testimonials[activeTestimonial].projectValue}</p>
                    <p><span className="font-medium">Selesai:</span> {testimonials[activeTestimonial].completedYear}</p>
                  </div>
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="lg:col-span-2">
                <blockquote className="text-lg lg:text-xl text-foreground leading-relaxed mb-6">
                  "{testimonials[activeTestimonial].testimonial}"
                </blockquote>
                
                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveTestimonial(index)}
                        className={`w-3 h-3 rounded-full transition-smooth ${
                          index === activeTestimonial ? 'bg-primary' : 'bg-border hover:bg-primary/50'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={prevTestimonial}
                      className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center hover:bg-muted/50 transition-smooth"
                    >
                      <Icon name="ChevronLeft" size={20} className="text-muted-foreground" />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center hover:bg-muted/50 transition-smooth"
                    >
                      <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Client Logos */}
        <div className="text-center">
          <h3 className="text-xl font-heading font-semibold text-foreground mb-8">
            Dipercaya oleh Perusahaan Terkemuka
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {clientLogos.map((client, index) => (
              <div 
                key={index}
                className="bg-muted/30 rounded-lg p-6 border border-border hover:border-primary/30 transition-smooth group"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-smooth">
                    <Icon 
                      name={client.logo} 
                      size={24} 
                      className="text-primary"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">
                    {client.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-12 bg-primary/5 rounded-xl p-8 border border-primary/20">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-heading font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Proyek Selesai</div>
            </div>
            <div>
              <div className="text-3xl font-heading font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Tingkat Kepuasan</div>
            </div>
            <div>
              <div className="text-3xl font-heading font-bold text-primary mb-2">150+</div>
              <div className="text-sm text-muted-foreground">Klien Aktif</div>
            </div>
            <div>
              <div className="text-3xl font-heading font-bold text-primary mb-2">15</div>
              <div className="text-sm text-muted-foreground">Tahun Pengalaman</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;