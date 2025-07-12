import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    productCategory: '',
    quantity: '',
    timeline: '',
    budget: '',
    message: '',
    agreeToTerms: false,
    subscribeNewsletter: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const projectTypes = [
    { value: 'residential', label: 'Proyek Residensial' },
    { value: 'commercial', label: 'Proyek Komersial' },
    { value: 'industrial', label: 'Proyek Industri' },
    { value: 'renovation', label: 'Renovasi' },
    { value: 'new-construction', label: 'Konstruksi Baru' },
    { value: 'other', label: 'Lainnya' }
  ];

  const productCategories = [
    { value: 'windows', label: 'Jendela Aluminum' },
    { value: 'doors', label: 'Pintu Aluminum' },
    { value: 'curtain-wall', label: 'Curtain Wall' },
    { value: 'roofing', label: 'Atap Aluminum' },
    { value: 'railing', label: 'Railing & Pagar' },
    { value: 'partition', label: 'Partisi' },
    { value: 'facade', label: 'Fasad' },
    { value: 'custom', label: 'Produk Custom' }
  ];

  const timelineOptions = [
    { value: 'urgent', label: 'Segera (1-2 minggu)' },
    { value: 'short', label: 'Pendek (1 bulan)' },
    { value: 'medium', label: 'Menengah (2-3 bulan)' },
    { value: 'long', label: 'Panjang (6+ bulan)' },
    { value: 'planning', label: 'Masih Perencanaan' }
  ];

  const budgetRanges = [
    { value: 'under-50', label: 'Di bawah Rp 50 juta' },
    { value: '50-100', label: 'Rp 50 - 100 juta' },
    { value: '100-500', label: 'Rp 100 - 500 juta' },
    { value: '500-1000', label: 'Rp 500 juta - 1 miliar' },
    { value: 'above-1000', label: 'Di atas Rp 1 miliar' },
    { value: 'discuss', label: 'Akan didiskusikan' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nama lengkap wajib diisi';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Nomor telepon wajib diisi';
    } else if (!/^(\+62|62|0)[0-9]{9,12}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Format nomor telepon Indonesia tidak valid';
    }

    if (!formData.projectType) {
      newErrors.projectType = 'Jenis proyek wajib dipilih';
    }

    if (!formData.productCategory) {
      newErrors.productCategory = 'Kategori produk wajib dipilih';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Pesan atau deskripsi proyek wajib diisi';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Pesan minimal 20 karakter';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'Anda harus menyetujui syarat dan ketentuan';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        alert(`File ${file.name} terlalu besar. Maksimal 5MB.`);
        return false;
      }
      if (!allowedTypes.includes(file.type)) {
        alert(`File ${file.name} format tidak didukung.`);
        return false;
      }
      return true;
    });

    setUploadedFiles(prev => [...prev, ...validFiles].slice(0, 5)); // Max 5 files
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        productCategory: '',
        quantity: '',
        timeline: '',
        budget: '',
        message: '',
        agreeToTerms: false,
        subscribeNewsletter: false
      });
      setUploadedFiles([]);
    } catch (error) {
      alert('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-card rounded-lg shadow-elevation-1 p-6 md:p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>
          <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
            Inquiry Berhasil Dikirim!
          </h3>
          <p className="text-muted-foreground mb-6">
            Terima kasih atas inquiry Anda. Tim kami akan menghubungi Anda dalam 1-2 hari kerja.
          </p>
          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={() => setIsSubmitted(false)}
              className="w-full sm:w-auto"
            >
              Kirim Inquiry Lain
            </Button>
            <div className="text-sm text-muted-foreground">
              <p>Untuk pertanyaan mendesak, hubungi:</p>
              <p className="font-medium text-foreground">WhatsApp: +62 812-3456-7890</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg shadow-elevation-1 p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
          Form Inquiry Proyek
        </h2>
        <p className="text-muted-foreground">
          Isi form di bawah ini untuk mendapatkan penawaran terbaik dari tim kami
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-semibold text-foreground border-b border-border pb-2">
            Informasi Kontak
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nama Lengkap"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Masukkan nama lengkap"
              required
              error={errors.fullName}
            />
            
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="nama@email.com"
              required
              error={errors.email}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nomor Telepon"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+62 812-3456-7890"
              required
              error={errors.phone}
              description="Format: +62 atau 08xx-xxxx-xxxx"
            />
            
            <Input
              label="Nama Perusahaan"
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="PT. Nama Perusahaan (Opsional)"
            />
          </div>
        </div>

        {/* Project Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-semibold text-foreground border-b border-border pb-2">
            Informasi Proyek
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Jenis Proyek <span className="text-error">*</span>
              </label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                required
              >
                <option value="">Pilih jenis proyek</option>
                {projectTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.projectType && (
                <p className="mt-1 text-sm text-error">{errors.projectType}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Kategori Produk <span className="text-error">*</span>
              </label>
              <select
                name="productCategory"
                value={formData.productCategory}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                required
              >
                <option value="">Pilih kategori produk</option>
                {productCategories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              {errors.productCategory && (
                <p className="mt-1 text-sm text-error">{errors.productCategory}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Perkiraan Kuantitas"
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="Contoh: 20 unit, 100 m²"
              description="Perkiraan jumlah atau luas area"
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Timeline Proyek
              </label>
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              >
                <option value="">Pilih timeline</option>
                {timelineOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Estimasi Budget
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              >
                <option value="">Pilih range budget</option>
                {budgetRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Project Description */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-semibold text-foreground border-b border-border pb-2">
            Deskripsi Proyek
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Pesan & Deskripsi Proyek <span className="text-error">*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={5}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
              placeholder="Jelaskan detail proyek Anda, spesifikasi khusus, atau pertanyaan lainnya..."
              required
            />
            {errors.message && (
              <p className="mt-1 text-sm text-error">{errors.message}</p>
            )}
            <p className="mt-1 text-sm text-muted-foreground">
              Minimal 20 karakter. Semakin detail, semakin akurat penawaran kami.
            </p>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Upload File Pendukung
            </label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Icon name="Upload" size={32} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag & drop file atau klik untuk browse
              </p>
              <input
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('file-upload').click()}
              >
                Pilih File
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Format: JPG, PNG, PDF, DOC. Maksimal 5MB per file, 5 file total.
              </p>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="mt-3 space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                    <div className="flex items-center space-x-2">
                      <Icon name="File" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">{file.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({(file.size / 1024 / 1024).toFixed(1)} MB)
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      <Icon name="X" size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Terms and Submit */}
        <div className="space-y-4">
          <div className="space-y-3">
            <Checkbox
              label="Saya menyetujui syarat dan ketentuan serta kebijakan privasi"
              checked={formData.agreeToTerms}
              onChange={(e) => handleInputChange(e)}
              name="agreeToTerms"
              required
              error={errors.agreeToTerms}
            />
            
            <Checkbox
              label="Saya ingin menerima newsletter dan update produk terbaru"
              checked={formData.subscribeNewsletter}
              onChange={(e) => handleInputChange(e)}
              name="subscribeNewsletter"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="submit"
              variant="default"
              loading={isSubmitting}
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Mengirim...' : 'Kirim Inquiry'}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={() => window.open('https://wa.me/6281234567890?text=Halo, saya tertarik dengan produk aluminum Sinar Jaya', '_blank')}
              iconName="MessageCircle"
              iconPosition="left"
              className="flex-1 sm:flex-none"
            >
              Chat WhatsApp
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;