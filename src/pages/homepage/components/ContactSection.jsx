import React, { useEffect, useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import { infoService } from "../../../api/infoService"; // import API service

const ContactSection = () => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    try {
      const response = await infoService.getInfo();
      if (response?.data) {
        setInfo(response.data);
      }
    } catch (err) {
      console.error("Error fetching info:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleContactAction = (actionType, value) => {
    switch (actionType) {
      case "map":
        window.open(
          `https://maps.google.com/?q=${info.latitude},${info.longitude}`,
          "_blank"
        );
        break;
      case "phone":
        window.open(`tel:${value}`, "_self");
        break;
      case "whatsapp":
        window.open(`https://wa.me/${value}`, "_blank");
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="text-center text-muted-foreground">Loading...</div>
      </section>
    );
  }

  // ✅ Validasi koordinat
  const hasValidCoordinates =
    info?.address !== "" &&
    info?.latitude &&
    info?.longitude &&
    parseFloat(info.latitude) !== 0 &&
    parseFloat(info.longitude) !== 0;

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Hubungi Kami
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Siap melayani konsultasi dan pemesanan produk Aluminium berkualitas
            tinggi
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Alamat */}
              {info?.address && (
                <div className="bg-card rounded-xl p-6 border border-border hover:shadow-elevation-1 transition-smooth">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="MapPin" size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-foreground mb-2">
                        Alamat Showroom
                      </h3>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line mb-4">
                        {info.address}
                      </p>
                      {hasValidCoordinates && (
                        <button
                          onClick={() => handleContactAction("map")}
                          className="text-primary font-medium hover:text-primary/80 transition-micro flex items-center"
                        >
                          <span className="mr-1">Lihat Peta</span>
                          <Icon name="ExternalLink" size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ✅ Map Section */}
            {hasValidCoordinates && (
              <div className="mt-8">
                <div className="bg-card rounded-xl overflow-hidden border border-border">
                  <div className="h-64 md:h-80">
                    <iframe
                      width="100%"
                      height="100%"
                      loading="lazy"
                      title="Location"
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps?q=${info.latitude},${info.longitude}&z=14&output=embed`}
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
                          {info.address}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          window.open(
                            `https://maps.google.com/?q=${info.latitude},${info.longitude}`,
                            "_blank"
                          )
                        }
                      >
                        <Icon name="Navigation" size={16} className="mr-2" />
                        Petunjuk Arah
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Contact */}
          <div className="space-y-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="font-heading font-semibold text-foreground mb-4">
                Kontak Cepat
              </h3>
              <div className="space-y-4">
                {info?.telephone && (
                  <Button
                    variant="default"
                    fullWidth
                    iconName="Phone"
                    iconPosition="left"
                    onClick={() => handleContactAction("phone", info.telephone)}
                  >
                    Telepon Sekarang
                  </Button>
                )}
                {info?.phone && (
                  <Button
                    variant="success"
                    fullWidth
                    iconName="MessageCircle"
                    iconPosition="left"
                    onClick={() => handleContactAction("whatsapp", info.phone)}
                  >
                    Chat WhatsApp
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
