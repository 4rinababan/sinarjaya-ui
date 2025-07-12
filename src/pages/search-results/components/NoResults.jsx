import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NoResults = ({ searchQuery, onSearchSuggestion }) => {
  const popularProducts = [
    {
      id: 1,
      name: 'Kusen Aluminum Putih',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
      price: 850000,
      category: 'Kusen'
    },
    {
      id: 2,
      name: 'Pintu Sliding Aluminum',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
      price: 1250000,
      category: 'Pintu'
    },
    {
      id: 3,
      name: 'Jendela Casement',
      image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=300&h=300&fit=crop',
      price: 750000,
      category: 'Jendela'
    },
    {
      id: 4,
      name: 'Partisi Kantor Modern',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=300&fit=crop',
      price: 2100000,
      category: 'Partisi'
    }
  ];

  const searchSuggestions = [
    'kusen aluminum',
    'pintu sliding',
    'jendela casement',
    'partisi kantor',
    'railing tangga',
    'canopy minimalis'
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="text-center py-12">
      {/* No Results Icon */}
      <div className="mb-8">
        <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
          <Icon name="Search" size={48} className="text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
          Tidak Ada Hasil Ditemukan
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Maaf, kami tidak dapat menemukan produk yang sesuai dengan pencarian 
          <span className="font-medium text-foreground"> "{searchQuery}"</span>
        </p>
      </div>

      {/* Search Suggestions */}
      <div className="mb-12">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Coba Kata Kunci Lain
        </h3>
        <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
          {searchSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSearchSuggestion(suggestion)}
              className="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-full text-sm font-medium transition-micro"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Search Tips */}
      <div className="bg-muted/50 rounded-lg p-6 mb-12 max-w-2xl mx-auto">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Tips Pencarian
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div className="flex items-start space-x-3">
            <Icon name="CheckCircle" size={20} className="text-success mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Periksa Ejaan</p>
              <p className="text-sm text-muted-foreground">
                Pastikan kata kunci dieja dengan benar
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Icon name="CheckCircle" size={20} className="text-success mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Gunakan Kata Umum</p>
              <p className="text-sm text-muted-foreground">
                Coba kata kunci yang lebih umum
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Icon name="CheckCircle" size={20} className="text-success mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Kurangi Filter</p>
              <p className="text-sm text-muted-foreground">
                Hapus beberapa filter pencarian
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Icon name="CheckCircle" size={20} className="text-success mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Kata Kunci Berbeda</p>
              <p className="text-sm text-muted-foreground">
                Gunakan sinonim atau kata serupa
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Products */}
      <div className="max-w-6xl mx-auto">
        <h3 className="text-xl font-heading font-bold text-foreground mb-6">
          Produk Populer
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {popularProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product-detail?id=${product.id}`}
              className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-elevation-2 transition-smooth group"
            >
              <div className="aspect-square overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                />
              </div>
              <div className="p-3">
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                  {product.category}
                </span>
                <h4 className="font-medium text-foreground mt-2 mb-1 line-clamp-2 text-sm">
                  {product.name}
                </h4>
                <p className="text-sm font-bold text-primary">
                  {formatPrice(product.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/product-catalog">
            <Button variant="default" className="w-full sm:w-auto">
              <Icon name="Grid3X3" size={16} className="mr-2" />
              Lihat Semua Produk
            </Button>
          </Link>
          <Link to="/contact-inquiry">
            <Button variant="outline" className="w-full sm:w-auto">
              <Icon name="MessageCircle" size={16} className="mr-2" />
              Hubungi Kami
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoResults;