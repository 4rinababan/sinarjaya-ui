import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ContactInfo = () => {
  const contactMethods = [
    {
      icon: 'Phone',
      title: 'Telepon',
      primary: '+62 21 8765-4321',
      secondary: '+62 21 8765-4322',
      description: 'Senin - Jumat: 08:00 - 17:00 WIB\nSabtu: 08:00 - 12:00 WIB',
      action: () => window.open('tel:+622187654321'),
      actionLabel: 'Telepon Sekarang'
    },
    {
      icon: 'MessageCircle',
      title: 'WhatsApp',
      primary: '+62 812-3456-7890',
      secondary: '+62 813-4567-8901',
      description: 'Respon cepat 24/7\nChat langsung dengan tim sales',
      action: () => window.open('https://wa.me/6281234567890?text=Halo, saya tertarik dengan produk aluminum Sinar Jaya', '_blank'),
      actionLabel: 'Chat WhatsApp'
    },
    {
      icon: 'Mail',
      title: 'Email',
      primary: 'info@sinarjayaaluminum.com',
      secondary: 'sales@sinarjayaaluminum.com',
      description: 'Respon dalam 2-4 jam kerja\nKirim spesifikasi detail proyek',
      action: () => window.open('mailto:info@sinarjayaaluminum.com?subject=Inquiry Produk Aluminum'),
      actionLabel: 'Kirim Email'
    },
    {
      icon: 'MapPin',
      title: 'Alamat Kantor',
      primary: 'Jl. Industri Raya No. 123',
      secondary: 'Kawasan Industri Pulogadung\nJakarta Timur 13260',
      description: 'Showroom & Workshop\nParkir tersedia',
      action: () => window.open('https://maps.google.com/?q=-6.1944,106.8229', '_blank'),
      actionLabel: 'Lihat Peta'
    }
  ];

  const businessHours = [
    { day: 'Senin - Jumat', hours: '08:00 - 17:00 WIB' },
    { day: 'Sabtu', hours: '08:00 - 12:00 WIB' },
    { day: 'Minggu', hours: 'Tutup' },
    { day: 'Hari Libur Nasional', hours: 'Tutup' }
  ];

  const socialMedia = [
    {
      platform: 'Instagram',
      icon: 'Instagram',
      handle: '@sinarjayaaluminum',
      url: 'https://instagram.com/sinarjayaaluminum',
      description: 'Lihat portfolio proyek terbaru'
    },
    {
      platform: 'Facebook',
      icon: 'Facebook',
      handle: 'Sinar Jaya Aluminum',
      url: 'https://facebook.com/sinarjayaaluminum',
      description: 'Update dan promosi terbaru'
    },
    {
      platform: 'YouTube',
      icon: 'Youtube',
      handle: 'Sinar Jaya Aluminum',
      url: 'https://youtube.com/@sinarjayaaluminum',
      description: 'Video tutorial dan showcase'
    },
    {
      platform: 'LinkedIn',
      icon: 'Linkedin',
      handle: 'Sinar Jaya Aluminum',
      url: 'https://linkedin.com/company/sinarjayaaluminum',
      description: 'Koneksi bisnis dan karir'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Contact Methods */}
      <div className="bg-card rounded-lg shadow-elevation-1 p-6">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
          Hubungi Kami
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactMethods.map((method, index) => (
            <div key={index} className="border border-border rounded-lg p-4 hover:shadow-elevation-1 transition-smooth">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={method.icon} size={20} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-semibold text-foreground mb-1">
                    {method.title}
                  </h3>
                  <p className="text-sm font-medium text-foreground mb-1">
                    {method.primary}
                  </p>
                  {method.secondary && (
                    <p className="text-sm text-muted-foreground mb-2">
                      {method.secondary}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mb-3 whitespace-pre-line">
                    {method.description}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={method.action}
                    className="w-full"
                  >
                    {method.actionLabel}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Business Hours */}
      <div className="bg-card rounded-lg shadow-elevation-1 p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Clock" size={20} className="mr-2 text-primary" />
          Jam Operasional
        </h3>
        
        <div className="space-y-3">
          {businessHours.map((schedule, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
              <span className="text-sm font-medium text-foreground">
                {schedule.day}
              </span>
              <span className={`text-sm font-medium ${
                schedule.hours === 'Tutup' ? 'text-error' : 'text-success'
              }`}>
                {schedule.hours}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-warning/10 rounded-lg">
          <p className="text-sm text-warning-foreground">
            <Icon name="Info" size={16} className="inline mr-1" />
            Untuk layanan darurat di luar jam kerja, hubungi WhatsApp kami.
          </p>
        </div>
      </div>

      {/* Location Map */}
      <div className="bg-card rounded-lg shadow-elevation-1 p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
          <Icon name="MapPin" size={20} className="mr-2 text-primary" />
          Lokasi Kami
        </h3>
        
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">
              Sinar Jaya Aluminum
            </p>
            <p>Jl. Industri Raya No. 123</p>
            <p>Kawasan Industri Pulogadung</p>
            <p>Jakarta Timur 13260, Indonesia</p>
          </div>
          
          <div className="h-64 rounded-lg overflow-hidden border border-border">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Sinar Jaya Aluminum Location"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=-6.1944,106.8229&z=15&output=embed"
              className="w-full h-full"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://maps.google.com/?q=-6.1944,106.8229', '_blank')}
              iconName="Navigation"
              iconPosition="left"
              className="flex-1"
            >
              Petunjuk Arah
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://maps.google.com/?q=-6.1944,106.8229&layer=c&cbll=-6.1944,106.8229', '_blank')}
              iconName="Eye"
              iconPosition="left"
              className="flex-1"
            >
              Street View
            </Button>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-card rounded-lg shadow-elevation-1 p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Share2" size={20} className="mr-2 text-primary" />
          Ikuti Kami
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {socialMedia.map((social, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/50 transition-smooth">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={social.icon} size={16} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {social.handle}
                </p>
                <p className="text-xs text-muted-foreground">
                  {social.description}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(social.url, '_blank')}
                iconName="ExternalLink"
                iconPosition="right"
              >
                Kunjungi
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-error/5 border border-error/20 rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-error mb-3 flex items-center">
          <Icon name="AlertTriangle" size={20} className="mr-2" />
          Kontak Darurat
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Untuk kebutuhan mendesak di luar jam kerja atau situasi darurat proyek:
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => window.open('tel:+6281234567890')}
            iconName="Phone"
            iconPosition="left"
            className="flex-1"
          >
            Telepon Darurat
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open('https://wa.me/6281234567890?text=DARURAT: Saya membutuhkan bantuan segera', '_blank')}
            iconName="MessageCircle"
            iconPosition="left"
            className="flex-1"
          >
            WhatsApp Darurat
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;