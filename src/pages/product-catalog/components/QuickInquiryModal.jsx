import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const QuickInquiryModal = ({ isOpen, onClose, product }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Create WhatsApp message
    const message = `Halo, saya tertarik dengan produk:\n\n*${product.name}*\n\nDetail:\n- Nama: ${formData.name}\n- Email: ${formData.email}\n- Telepon: ${formData.phone}\n- Jumlah: ${formData.quantity} ${product.unit}\n- Pesan: ${formData.message || 'Tidak ada pesan tambahan'}\n\nMohon informasi lebih lanjut. Terima kasih!`;
    
    const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    setIsSubmitting(false);
    onClose();
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      quantity: '',
      message: ''
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative bg-card rounded-lg shadow-elevation-3 w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Inquiry Cepat
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={24} />
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6">
            {/* Product Info */}
            <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg mb-6">
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-semibold text-foreground mb-1">
                  {product.name}
                </h3>
                <p className="text-sm font-caption text-muted-foreground mb-2">
                  {product.category}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-heading font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-sm font-caption text-muted-foreground">
                    per {product.unit}
                  </span>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nama Lengkap"
                  type="text"
                  required
                  placeholder="Masukkan nama lengkap"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
                <Input
                  label="Email"
                  type="email"
                  required
                  placeholder="nama@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nomor Telepon"
                  type="tel"
                  required
                  placeholder="08xxxxxxxxxx"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
                <Input
                  label={`Jumlah (${product.unit})`}
                  type="number"
                  required
                  placeholder="1"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                />
              </div>

              <Input
                label="Pesan Tambahan"
                type="text"
                placeholder="Spesifikasi khusus, pertanyaan, atau catatan lainnya..."
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                description="Opsional - Jelaskan kebutuhan spesifik Anda"
              />

              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="Info" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-heading font-semibold text-foreground mb-1">
                      Informasi Penting
                    </h4>
                    <ul className="text-sm font-caption text-muted-foreground space-y-1">
                      <li>• Inquiry akan dikirim melalui WhatsApp</li>
                      <li>• Tim kami akan merespons dalam 1-2 jam kerja</li>
                      <li>• Harga dapat berubah sesuai kuantitas dan spesifikasi</li>
                      <li>• Konsultasi gratis untuk proyek besar</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  className="flex-1"
                  loading={isSubmitting}
                  iconName="MessageCircle"
                  iconPosition="left"
                >
                  {isSubmitting ? 'Mengirim...' : 'Kirim via WhatsApp'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickInquiryModal;