import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';
import FAQSection from './components/FAQSection';
import Icon from '../../components/AppIcon';

const ContactInquiry = () => {
  const breadcrumbItems = [
    { label: 'Beranda', href: '/homepage' },
    { label: 'Kontak & Inquiry' }
  ];

  return (
    <>
      <Helmet>
        <title>Kontak & Inquiry - Sinar Jaya Aluminum Catalog</title>
        <meta name="description" content="Hubungi Sinar Jaya Aluminum untuk konsultasi proyek, penawaran harga, dan inquiry produk aluminum. Tim ahli kami siap membantu kebutuhan konstruksi Anda." />
        <meta name="keywords" content="kontak aluminum, inquiry proyek, konsultasi aluminum, penawaran harga, Sinar Jaya Aluminum, Jakarta" />
        <meta property="og:title" content="Kontak & Inquiry - Sinar Jaya Aluminum" />
        <meta property="og:description" content="Dapatkan konsultasi gratis dan penawaran terbaik untuk proyek aluminum Anda. Hubungi tim ahli Sinar Jaya Aluminum sekarang." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://sinarjayaaluminum.com/contact-inquiry" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Breadcrumb items={breadcrumbItems} />
              
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
                  Kontak & Inquiry
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Hubungi tim ahli kami untuk konsultasi gratis, penawaran harga, dan solusi aluminum terbaik untuk proyek Anda
                </p>
              </div>

              {/* Quick Contact Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-card rounded-lg p-4 text-center shadow-elevation-1">
                  <Icon name="Clock" size={24} className="text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">Respon Cepat</p>
                  <p className="text-xs text-muted-foreground">2-4 Jam</p>
                </div>
                <div className="bg-card rounded-lg p-4 text-center shadow-elevation-1">
                  <Icon name="Users" size={24} className="text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">Tim Ahli</p>
                  <p className="text-xs text-muted-foreground">15+ Tahun</p>
                </div>
                <div className="bg-card rounded-lg p-4 text-center shadow-elevation-1">
                  <Icon name="Award" size={24} className="text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">Garansi</p>
                  <p className="text-xs text-muted-foreground">10 Tahun</p>
                </div>
                <div className="bg-card rounded-lg p-4 text-center shadow-elevation-1">
                  <Icon name="MapPin" size={24} className="text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">Lokasi</p>
                  <p className="text-xs text-muted-foreground">Jakarta</p>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Contact Form - Takes 2 columns on large screens */}
                <div className="lg:col-span-2">
                  <ContactForm />
                </div>

                {/* Contact Information - Takes 1 column on large screens */}
                <div className="lg:col-span-1">
                  <ContactInfo />
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-12 md:py-16 bg-muted/30">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <FAQSection />
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-12 md:py-16 bg-gradient-to-r from-primary to-secondary">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
                <Icon name="Headphones" size={48} className="text-white mx-auto mb-6" />
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
                  Siap Memulai Proyek Anda?
                </h2>
                <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                  Dapatkan konsultasi gratis dari tim ahli kami dan wujudkan proyek aluminum impian Anda dengan kualitas terbaik
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => window.open('https://wa.me/6281234567890?text=Halo, saya ingin konsultasi proyek aluminum', '_blank')}
                    className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-smooth"
                  >
                    <Icon name="MessageCircle" size={20} className="mr-2" />
                    Konsultasi Gratis
                  </button>
                  <button
                    onClick={() => document.querySelector('form').scrollIntoView({ behavior: 'smooth' })}
                    className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-smooth"
                  >
                    <Icon name="FileText" size={20} className="mr-2" />
                    Isi Form Inquiry
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-primary-foreground"
                    fill="currentColor"
                  >
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 11 5.16-1.261 9-5.45 9-11V7l-10-5z"/>
                    <path d="M8 11l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
                <span className="text-lg font-heading font-bold text-foreground">
                  Sinar Jaya Aluminum
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Solusi Aluminum Terpercaya untuk Konstruksi Modern
              </p>
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} Sinar Jaya Aluminum. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ContactInquiry;