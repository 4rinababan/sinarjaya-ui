import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import HeroSection from './components/HeroSection';
import ValuePropositions from './components/ValuePropositions';
import CertificationsSection from './components/CertificationsSection';
import CompanyHistory from './components/CompanyHistory';
import TeamSection from './components/TeamSection';
import FacilityShowcase from './components/FacilityShowcase';
import TestimonialsSection from './components/TestimonialsSection';
import LocationSection from './components/LocationSection';

const CompanyInformation = () => {
  const breadcrumbItems = [
    { label: 'Beranda', href: '/homepage' },
    { label: 'Tentang Kami' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Tentang Kami - Sinar Jaya Aluminum | Solusi Aluminum Terpercaya Indonesia</title>
        <meta 
          name="description" 
          content="Pelajari lebih lanjut tentang Sinar Jaya Aluminum - perusahaan aluminum terpercaya dengan 15+ tahun pengalaman, sertifikasi ISO, dan komitmen terhadap kualitas produk aluminum terbaik di Indonesia."
        />
        <meta name="keywords" content="tentang sinar jaya aluminum, perusahaan aluminum indonesia, sertifikasi iso aluminum, sejarah perusahaan aluminum, tim ahli aluminum, fasilitas produksi aluminum" />
        <meta property="og:title" content="Tentang Kami - Sinar Jaya Aluminum" />
        <meta property="og:description" content="Perusahaan aluminum terpercaya dengan 15+ tahun pengalaman dan komitmen terhadap kualitas produk aluminum terbaik di Indonesia." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://sinarjayaaluminum.co.id/company-information" />
      </Helmet>

      <Header />
      
      <main className="pt-16">
        {/* Breadcrumb */}
        <div className="bg-muted/30 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>

        {/* Hero Section */}
        <HeroSection />

        {/* Value Propositions */}
        <ValuePropositions />

        {/* Certifications Section */}
        <CertificationsSection />

        {/* Company History */}
        <CompanyHistory />

        {/* Team Section */}
        <TeamSection />

        {/* Facility Showcase */}
        <FacilityShowcase />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Location Section */}
        <LocationSection />
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-primary-foreground"
                    fill="currentColor"
                  >
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 11 5.16-1.261 9-5.45 9-11V7l-10-5z"/>
                    <path d="M8 11l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold">Sinar Jaya Aluminum</h3>
                  <p className="text-xs opacity-80">Solusi Aluminum Terpercaya</p>
                </div>
              </div>
              <p className="text-sm opacity-80 leading-relaxed">
                Perusahaan aluminum terpercaya dengan 15+ tahun pengalaman melayani kebutuhan konstruksi di Indonesia.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-semibold mb-4">Navigasi</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/homepage" className="opacity-80 hover:opacity-100 transition-micro">Beranda</a></li>
                <li><a href="/product-catalog" className="opacity-80 hover:opacity-100 transition-micro">Katalog Produk</a></li>
                <li><a href="/company-information" className="opacity-80 hover:opacity-100 transition-micro">Tentang Kami</a></li>
                <li><a href="/contact-inquiry" className="opacity-80 hover:opacity-100 transition-micro">Kontak</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-heading font-semibold mb-4">Kontak</h4>
              <ul className="space-y-2 text-sm">
                <li className="opacity-80">+62 21 4608 7890</li>
                <li className="opacity-80">info@sinarjayaaluminum.co.id</li>
                <li className="opacity-80">Jl. Industri Raya No. 45<br />Jakarta Timur 13260</li>
              </ul>
            </div>

            {/* Business Hours */}
            <div>
              <h4 className="font-heading font-semibold mb-4">Jam Operasional</h4>
              <ul className="space-y-2 text-sm">
                <li className="opacity-80">Senin - Jumat: 08:00 - 17:00</li>
                <li className="opacity-80">Sabtu: 08:00 - 15:00</li>
                <li className="opacity-80">Minggu: Tutup</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
            <p className="text-sm opacity-80">
              © {new Date().getFullYear()} Sinar Jaya Aluminum. Semua hak dilindungi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CompanyInformation;