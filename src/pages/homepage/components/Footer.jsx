import React from 'react';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: "Tentang Kami", href: "/company-information" },
      { label: "Visi & Misi", href: "/company-information#vision" },
      { label: "Tim Kami", href: "/company-information#team" },
      { label: "Karir", href: "/company-information#career" }
    ],
    products: [
      { label: "Profil Aluminum", href: "/product-catalog?category=1" },
      { label: "Kusen & Jendela", href: "/product-catalog?category=2" },
      { label: "Pintu Aluminum", href: "/product-catalog?category=3" },
      { label: "Partisi & Dinding", href: "/product-catalog?category=4" }
    ],
    services: [
      { label: "Konsultasi Gratis", href: "/contact-inquiry" },
      { label: "Custom Design", href: "/contact-inquiry?service=custom" },
      { label: "Instalasi", href: "/contact-inquiry?service=installation" },
      { label: "After Sales", href: "/contact-inquiry?service=support" }
    ],
    support: [
      { label: "Hubungi Kami", href: "/contact-inquiry" },
      { label: "FAQ", href: "/company-information#faq" },
      { label: "Garansi", href: "/company-information#warranty" },
      { label: "Panduan Perawatan", href: "/company-information#maintenance" }
    ]
  };

  const socialLinks = [
    { name: "WhatsApp", icon: "MessageCircle", url: "https://wa.me/6281234567890" },
    { name: "Instagram", icon: "Instagram", url: "https://instagram.com/sinarjayaaluminum" },
    { name: "Facebook", icon: "Facebook", url: "https://facebook.com/sinarjayaaluminum" },
    { name: "YouTube", icon: "Youtube", url: "https://youtube.com/@sinarjayaaluminum" }
  ];

  const certifications = [
    "SNI Certified",
    "ISO 9001:2015",
    "SIUP & TDP",
    "Garansi 10 Tahun"
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-7 h-7 text-primary-foreground"
                  fill="currentColor"
                >
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 11 5.16-1.261 9-5.45 9-11V7l-10-5z"/>
                  <path d="M8 11l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold">
                  Sinar Jaya Aluminum
                </h3>
                <p className="text-sm opacity-80">
                  Solusi Aluminum Terpercaya
                </p>
              </div>
            </div>
            
            <p className="text-sm opacity-90 leading-relaxed mb-6">
              Sejak 1998, kami telah menjadi pelopor dalam industri aluminum di Indonesia. 
              Memberikan solusi terbaik untuk kebutuhan konstruksi dan arsitektur modern 
              dengan kualitas terjamin dan pelayanan terpercaya.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="MapPin" size={16} className="opacity-80" />
                <span className="text-sm">
                  Jl. Industri Raya No. 45, Bekasi Timur, Jawa Barat 17111
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Phone" size={16} className="opacity-80" />
                <span className="text-sm">+62 21 8234 5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={16} className="opacity-80" />
                <span className="text-sm">info@sinarjayaaluminum.com</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Perusahaan</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm opacity-80 hover:opacity-100 transition-micro"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Produk</h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm opacity-80 hover:opacity-100 transition-micro"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm opacity-80 hover:opacity-100 transition-micro"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Dukungan</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm opacity-80 hover:opacity-100 transition-micro"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Certifications */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h4 className="font-heading font-semibold mb-3 text-center md:text-left">
                Sertifikasi & Jaminan
              </h4>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                {certifications.map((cert, index) => (
                  <span
                    key={index}
                    className="text-xs bg-white/10 px-3 py-1 rounded-full"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-heading font-semibold mb-3 text-center">
                Ikuti Kami
              </h4>
              <div className="flex items-center space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-smooth"
                    aria-label={social.name}
                  >
                    <Icon name={social.icon} size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm opacity-80 text-center md:text-left">
              © {currentYear} Sinar Jaya Aluminum. Seluruh hak cipta dilindungi undang-undang.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="/privacy-policy" className="opacity-80 hover:opacity-100 transition-micro">
                Kebijakan Privasi
              </a>
              <a href="/terms-of-service" className="opacity-80 hover:opacity-100 transition-micro">
                Syarat & Ketentuan
              </a>
              <a href="/sitemap" className="opacity-80 hover:opacity-100 transition-micro">
                Peta Situs
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;