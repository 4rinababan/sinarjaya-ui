import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import InquiryForm from './components/InquiryForm';
import RelatedProducts from './components/RelatedProducts';
import SocialShare from './components/SocialShare';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ProductDetail = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('id') || '1';
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock product data
  const mockProducts = [
    {
      id: '1',
      name: 'Profil Aluminium T-Slot 40x40mm',
      sku: 'ALU-TS-4040-001',
      price: 125000,
      originalPrice: 150000,
      unit: 'meter',
      status: 'in_stock',
      category: 'Profil Struktural',
      shortDescription: 'Profil aluminium T-slot berkualitas tinggi dengan sistem sambungan modular yang mudah dipasang. Ideal untuk konstruksi rangka mesin, meja kerja, dan aplikasi industri.',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop',
          alt: 'Profil Aluminium T-Slot tampak depan'
        },
        {
          url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=800&fit=crop',
          alt: 'Detail sambungan T-Slot'
        },
        {
          url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=800&fit=crop',
          alt: 'Aplikasi profil dalam konstruksi'
        }
      ],
      specifications: [
        { label: 'Dimensi', value: '40mm x 40mm' },
        { label: 'Panjang Standar', value: '6 meter' },
        { label: 'Ketebalan Dinding', value: '2.5mm' },
        { label: 'Material', value: 'Aluminium 6063-T5' },
        { label: 'Finishing', value: 'Anodized Silver' },
        { label: 'Berat per Meter', value: '1.2 kg' },
        { label: 'Toleransi', value: '±0.1mm' },
        { label: 'Standar', value: 'JIS H4100' }
      ],
      features: [
        'Sistem sambungan modular tanpa pengelasan',
        'Tahan korosi dengan finishing anodized',
        'Presisi tinggi dengan toleransi ketat',
        'Kompatibel dengan aksesori T-slot standar',
        'Mudah dipotong dan dibentuk',
        'Ramah lingkungan dan dapat didaur ulang',
        'Kekuatan struktural yang excellent',
        'Permukaan halus dan estetis'
      ],
      applications: [
        'Rangka Mesin Industri',
        'Meja Kerja & Workbench',
        'Sistem Konveyor',
        'Booth Pameran',
        'Rak & Shelving',
        'Automation Equipment',
        'Prototype & Testing Rig',
        'Clean Room Construction'
      ],
      installationGuide: `Profil T-slot dapat dipasang dengan mudah menggunakan bracket dan fastener khusus. Pastikan permukaan rata dan gunakan square untuk memastikan sudut 90 derajat. Untuk sambungan yang kuat, gunakan corner bracket internal dan kencangkan dengan torque yang sesuai.`,
      isNew: false
    },
    {
      id: '2',
      name: 'Kusen Aluminium Sliding Window 120x150cm',
      sku: 'ALU-SW-120150-002',
      price: 2850000,
      originalPrice: null,
      unit: 'set',
      status: 'in_stock',
      category: 'Kusen & Jendela',
      shortDescription: 'Kusen jendela sliding aluminium premium dengan kaca double glazing. Desain modern dengan performa thermal dan akustik yang excellent.',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop',
          alt: 'Kusen Aluminium Sliding Window'
        }
      ],
      specifications: [
        { label: 'Dimensi', value: '120cm x 150cm' },
        { label: 'Ketebalan Frame', value: '1.4mm' },
        { label: 'Material', value: 'Aluminium 6063-T5' },
        { label: 'Kaca', value: 'Double Glazing 5+12+5mm' },
        { label: 'Finishing', value: 'Powder Coating' },
        { label: 'Hardware', value: 'Stainless Steel' }
      ],
      features: [
        'Double glazing untuk insulasi thermal',
        'Weather stripping untuk kedap air',
        'Hardware berkualitas tinggi',
        'Mudah dibersihkan dan maintenance'
      ],
      applications: [
        'Rumah Tinggal',
        'Apartemen',
        'Kantor',
        'Hotel'
      ],
      installationGuide: 'Pastikan bukaan sudah square dan level. Pasang frame dengan anchor bolt, lalu pasang daun jendela dan sesuaikan hardware.',
      isNew: true
    }
  ];

  const mockRelatedProducts = [
    {
      id: '3',
      name: 'Profil Aluminium L-Shape 50x50mm',
      sku: 'ALU-LS-5050-003',
      price: 95000,
      originalPrice: 110000,
      status: 'in_stock',
      images: [{ url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop' }],
      isNew: false
    },
    {
      id: '4',
      name: 'Bracket Corner T-Slot 40x40mm',
      sku: 'ALU-BC-4040-004',
      price: 25000,
      originalPrice: null,
      status: 'in_stock',
      images: [{ url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=400&fit=crop' }],
      isNew: true
    },
    {
      id: '5',
      name: 'Profil Aluminium Round Tube 25mm',
      sku: 'ALU-RT-25-005',
      price: 75000,
      originalPrice: null,
      status: 'low_stock',
      images: [{ url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=400&fit=crop' }],
      isNew: false
    },
    {
      id: '6',
      name: 'Panel Aluminium Composite 4mm',
      sku: 'ALU-ACP-4-006',
      price: 185000,
      originalPrice: 200000,
      status: 'in_stock',
      images: [{ url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop' }],
      isNew: false
    }
  ];

  useEffect(() => {
    const loadProductData = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundProduct = mockProducts.find(p => p.id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
        setRelatedProducts(mockRelatedProducts);
      }
      
      setLoading(false);
    };

    loadProductData();
  }, [productId]);

  const breadcrumbItems = [
    { label: 'Beranda', href: '/homepage' },
    { label: 'Katalog Produk', href: '/product-catalog' },
    { label: product?.category || 'Kategori', href: '/product-catalog' },
    { label: product?.name || 'Detail Produk' }
  ];

  const currentUrl = `${window.location.origin}/product-detail?id=${productId}`;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse space-y-8">
              <div className="h-6 bg-muted rounded w-1/3"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="aspect-square bg-muted rounded-lg"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-muted rounded w-3/4"></div>
                  <div className="h-6 bg-muted rounded w-1/2"></div>
                  <div className="h-20 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center space-y-4">
              <Icon name="AlertCircle" size={64} className="text-muted-foreground mx-auto" />
              <h1 className="text-2xl font-heading font-bold text-foreground">
                Produk Tidak Ditemukan
              </h1>
              <p className="text-muted-foreground">
                Produk yang Anda cari tidak tersedia atau telah dihapus.
              </p>
              <Link to="/product-catalog">
                <Button variant="default">
                  <Icon name="ArrowLeft" size={16} className="mr-2" />
                  Kembali ke Katalog
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Product Detail Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Product Images */}
            <div>
              <ProductImageGallery 
                images={product.images} 
                productName={product.name} 
              />
            </div>

            {/* Product Information */}
            <div>
              <ProductInfo product={product} />
            </div>
          </div>

          {/* Inquiry and Social Share Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <InquiryForm 
                productName={product.name} 
                productSku={product.sku} 
              />
            </div>
            <div>
              <SocialShare 
                productName={product.name} 
                productUrl={currentUrl} 
              />
            </div>
          </div>

          {/* Related Products */}
          <RelatedProducts 
            products={relatedProducts} 
            currentProductId={product.id} 
          />

          {/* Back to Catalog */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="text-center">
              <Link to="/product-catalog">
                <Button variant="outline" size="lg">
                  <Icon name="ArrowLeft" size={20} className="mr-2" />
                  Kembali ke Katalog Produk
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-50">
        <Button
          variant="default"
          size="icon"
          className="w-14 h-14 rounded-full shadow-elevation-3"
          onClick={() => window.open('https://wa.me/6281234567890', '_blank')}
        >
          <Icon name="MessageCircle" size={24} />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="w-12 h-12 rounded-full shadow-elevation-2"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Icon name="ArrowUp" size={20} />
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;