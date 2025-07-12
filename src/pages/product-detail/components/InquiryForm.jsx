import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const InquiryForm = ({ productName, productSku }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    quantity: '',
    projectDetails: '',
    urgency: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        quantity: '',
        projectDetails: '',
        urgency: 'normal'
      });
    }, 3000);
  };

  const handleWhatsAppInquiry = () => {
    const message = `Halo, saya tertarik dengan produk:\n\nNama Produk: ${productName}\nSKU: ${productSku}\nJumlah: ${formData.quantity || 'Belum ditentukan'}\n\nMohon informasi lebih lanjut. Terima kasih.`;
    const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (isSubmitted) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
              Inquiry Terkirim!
            </h3>
            <p className="text-muted-foreground">
              Tim kami akan menghubungi Anda dalam 1x24 jam.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
          Ajukan Inquiry
        </h3>
        <p className="text-muted-foreground text-sm">
          Dapatkan penawaran terbaik untuk proyek Anda
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Nama Lengkap"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Masukkan nama lengkap"
            required
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="nama@email.com"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Nomor Telepon"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="08xxxxxxxxxx"
            required
          />
          <Input
            label="Nama Perusahaan"
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="PT. Nama Perusahaan"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Jumlah Kebutuhan"
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            placeholder="Contoh: 100 meter, 50 unit"
            required
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Tingkat Urgensi
            </label>
            <select
              name="urgency"
              value={formData.urgency}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            >
              <option value="normal">Normal (1-2 minggu)</option>
              <option value="urgent">Mendesak (3-7 hari)</option>
              <option value="emergency">Darurat (&lt;3 hari)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Detail Proyek
          </label>
          <textarea
            name="projectDetails"
            value={formData.projectDetails}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
            placeholder="Jelaskan detail proyek, spesifikasi khusus, atau pertanyaan lainnya..."
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="submit"
            variant="default"
            loading={isSubmitting}
            className="flex-1"
          >
            <Icon name="Send" size={16} className="mr-2" />
            {isSubmitting ? 'Mengirim...' : 'Kirim Inquiry'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleWhatsAppInquiry}
            className="flex-1"
          >
            <Icon name="MessageCircle" size={16} className="mr-2" />
            WhatsApp
          </Button>
        </div>
      </form>

      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} />
            <span>Respon 1x24 jam</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} />
            <span>Data aman</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Award" size={16} />
            <span>Harga terbaik</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryForm;