import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import Breadcrumb from "../../components/ui/Breadcrumb";
import FAQSection from "./components/FAQSection";
import Icon from "../../components/AppIcon";
import React, { useState, useEffect } from "react";
import { infoService } from "./../../api/infoService";

const ContactInquiry = () => {
  const breadcrumbItems = [
    { label: "Beranda", href: "/homepage" },
    { label: "Kontak & Inquiry" },
  ];
  const [whatsappNumber, setWhatsappNumber] = useState("");

  useEffect(() => {
    const fetchPhone = async () => {
      try {
        const response = await infoService.getInfo();
        if (response?.status === 200 && response.data?.phone) {
          setWhatsappNumber(response.data.phone);
        }
      } catch (error) {
        console.error("Gagal mengambil nomor WhatsApp:", error);
      }
    };

    fetchPhone();
  }, []);

  return (
    <>
      <Helmet>
        <title>Kontak & Inquiry - Meisha Aluminium Kaca Catalog</title>
        <meta
          name="description"
          content="Hubungi Meisha Aluminium  Kaca untuk konsultasi proyek, penawaran harga, dan inquiry produk Aluminium . Tim ahli kami siap membantu kebutuhan konstruksi Anda."
        />
        <meta
          name="keywords"
          content="kontak Aluminium , inquiry proyek, konsultasi Aluminium , penawaran harga, Meisha Aluminium  Kaca, Jakarta"
        />
        <meta
          property="og:title"
          content="Kontak & Inquiry - Meisha Aluminium  Kaca"
        />
        <meta
          property="og:description"
          content="Dapatkan konsultasi gratis dan penawaran terbaik untuk proyek Aluminium  Anda. Hubungi tim ahli Meisha Aluminium  Kaca sekarang."
        />
        <meta property="og:type" content="website" />
        <link
          rel="canonical"
          href="https://sinarjayaAluminium.com/contact-inquiry"
        />
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
                  Hubungi tim ahli kami untuk konsultasi gratis, penawaran
                  harga, dan solusi Aluminium terbaik untuk proyek Anda
                </p>
              </div>

              {/* Quick Contact Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-card rounded-lg p-4 text-center shadow-elevation-1">
                  <Icon
                    name="Clock"
                    size={24}
                    className="text-primary mx-auto mb-2"
                  />
                  <p className="text-sm font-medium text-foreground">
                    Respon Cepat
                  </p>
                  <p className="text-xs text-muted-foreground">
                    langsung dibalas otomatis
                  </p>
                </div>
                <div className="bg-card rounded-lg p-4 text-center shadow-elevation-1">
                  <Icon
                    name="Users"
                    size={24}
                    className="text-primary mx-auto mb-2"
                  />
                  <p className="text-sm font-medium text-foreground">
                    Tim Ahli
                  </p>
                  <p className="text-xs text-muted-foreground">5+ Tahun</p>
                </div>
                <div className="bg-card rounded-lg p-4 text-center shadow-elevation-1">
                  <Icon
                    name="Award"
                    size={24}
                    className="text-primary mx-auto mb-2"
                  />
                  <p className="text-sm font-medium text-foreground">Garansi</p>
                  <p className="text-xs text-muted-foreground">Bergaransi</p>
                </div>
                <div className="bg-card rounded-lg p-4 text-center shadow-elevation-1">
                  <Icon
                    name="MapPin"
                    size={24}
                    className="text-primary mx-auto mb-2"
                  />
                  <p className="text-sm font-medium text-foreground">Lokasi</p>
                  <p className="text-xs text-muted-foreground">Jabodetabek</p>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content */}

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
                <Icon
                  name="Headphones"
                  size={48}
                  className="text-white mx-auto mb-6"
                />
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
                  Siap Memulai Proyek Anda?
                </h2>
                <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                  Dapatkan konsultasi gratis dari tim ahli kami dan wujudkan
                  proyek Aluminium impian Anda dengan kualitas terbaik
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => {
                      if (whatsappNumber) {
                        const message =
                          "Halo, saya ingin konsultasi proyek Aluminium";
                        const formattedNumber = whatsappNumber.replace(
                          /\D/g,
                          ""
                        );
                        window.open(
                          `https://wa.me/${formattedNumber}?text=${encodeURIComponent(
                            message
                          )}`,
                          "_blank"
                        );
                      }
                    }}
                    disabled={!whatsappNumber}
                    className={`inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold transition-smooth ${
                      whatsappNumber
                        ? "bg-white text-primary hover:bg-gray-100"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <Icon name="MessageCircle" size={20} className="mr-2" />
                    {whatsappNumber ? "Konsultasi Gratis" : "Memuat..."}
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
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 11 5.16-1.261 9-5.45 9-11V7l-10-5z" />
                    <path
                      d="M8 11l2 2 4-4"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>
                <span className="text-lg font-heading font-bold text-foreground">
                  Meisha Aluminium Kaca
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Solusi Aluminium Terpercaya untuk Konstruksi Modern
              </p>
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} Meisha Aluminium Kaca. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ContactInquiry;
