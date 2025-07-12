import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContactSection = () => {
  const contactInfo = [
    {
      id: 1,
      icon: "MapPin",
      title: "Alamat Showroom",
      content: "Jl. Industri Raya No. 45, Bekasi Timur\nJawa Barat 17111, Indonesia",
      action: "Lihat Peta",
      actionType: "map"
    },
    {
      id: 2,
      icon: "Phone",
      title: "Telepon & WhatsApp",
      content: "+62 21 8234 5678\n+62 812 3456 7890",
      action: "Hubungi Sekarang",
      actionType: "phone"
    },
    {
      id: 3,
      icon: "Mail",
      title: "Email",
      content: "info@sinarjayaaluminum.com\nsales@sinarjayaaluminum.com",
      action: "Kirim Email",
      actionType: "email"
    },
    {
      id: 4,
      icon: "Clock",
      title: "Jam Operasional",
      content: "Senin - Jumat: 08:00 - 17:00\nSabtu: 08:00 - 15:00\nMinggu: Tutup",
      action: null,
      actionType: null
    }
  ];

  const socialMedia = [
    {
      id: 1,
      name: "WhatsApp",
      icon: "MessageCircle",
      url: "https://wa.me/6281234567890",
      color: "text-green-600"
    },
    {
      id: 2,
      name: "Instagram",
      icon: "Instagram",
      url: "https://instagram.com/sinarjayaaluminum",
      color: "text-pink-600"
    },
    {
      id: 3,
      name: "Facebook",
      icon: "Facebook",
      url: "https://facebook.com/sinarjayaaluminum",
      color: "text-blue-600"
    },
    {
      id: 4,
      name: "YouTube",
      icon: "Youtube",
      url: "https://youtube.com/@sinarjayaaluminum",
      color: "text-red-600"
    }
  ];

  const handleContactAction = (actionType, content) => {
    switch (actionType) {
      case 'map':
        window.open('https://maps.google.com/?q=-6.2088,106.8456', '_blank');
        break;
      case 'phone':
        window.open('tel:+622182345678', '_self');
        break;
      case 'email':
        window.open('mailto:info@sinarjayaaluminum.com', '_self');
        break;
      default:
        break;
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Hubungi Kami
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Siap melayani konsultasi dan pemesanan produk aluminum berkualitas tinggi
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactInfo.map((info) => (
                <div
                  key={info.id}
                  className="bg-card rounded-xl p-6 border border-border hover:shadow-elevation-1 transition-smooth"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={info.icon} size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-foreground mb-2">
                        {info.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line mb-4">
                        {info.content}
                      </p>
                      {info.action && (
                        <button
                          onClick={() => handleContactAction(info.actionType, info.content)}
                          className="text-primary font-medium hover:text-primary/80 transition-micro flex items-center"
                        >
                          <span className="mr-1">{info.action}</span>
                          <Icon name="ExternalLink" size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Section */}
            <div className="mt-8">
              <div className="bg-card rounded-xl overflow-hidden border border-border">
                <div className="h-64 md:h-80">
                  <iframe
                    width="100%"
                    height="100%"
                    loading="lazy"
                    title="Sinar Jaya Aluminum Location"
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps?q=-6.2088,106.8456&z=14&output=embed"
                    className="border-0"
                  />
                </div>
                <div className="p-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-heading font-semibold text-foreground">
                        Showroom & Workshop
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Jl. Industri Raya No. 45, Bekasi Timur
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open('https://maps.google.com/?q=-6.2088,106.8456', '_blank')}
                    >
                      <Icon name="Navigation" size={16} className="mr-2" />
                      Petunjuk Arah
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Contact & Social Media */}
          <div className="space-y-8">
            {/* Quick Contact */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="font-heading font-semibold text-foreground mb-4">
                Kontak Cepat
              </h3>
              <div className="space-y-4">
                <Button
                  variant="default"
                  fullWidth
                  iconName="Phone"
                  iconPosition="left"
                  onClick={() => window.open('tel:+622182345678', '_self')}
                >
                  Telepon Sekarang
                </Button>
                <Button
                  variant="success"
                  fullWidth
                  iconName="MessageCircle"
                  iconPosition="left"
                  onClick={() => window.open('https://wa.me/6281234567890', '_blank')}
                >
                  Chat WhatsApp
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Mail"
                  iconPosition="left"
                  onClick={() => window.location.href = '/contact-inquiry'}
                >
                  Form Konsultasi
                </Button>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="font-heading font-semibold text-foreground mb-4">
                Ikuti Kami
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {socialMedia.map((social) => (
                  <button
                    key={social.id}
                    onClick={() => window.open(social.url, '_blank')}
                    className="flex items-center justify-center space-x-2 p-3 border border-border rounded-lg hover:bg-muted transition-smooth"
                  >
                    <Icon name={social.icon} size={18} className={social.color} />
                    <span className="text-sm font-medium text-foreground">
                      {social.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={20} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground">
                  Jam Buka Hari Ini
                </h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Senin - Jumat</span>
                  <span className="font-medium text-foreground">08:00 - 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sabtu</span>
                  <span className="font-medium text-foreground">08:00 - 15:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Minggu</span>
                  <span className="font-medium text-error">Tutup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;