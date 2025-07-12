import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedProducts = ({ products = [], currentProductId }) => {
  const filteredProducts = products.filter(product => product.id !== currentProductId);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'in_stock':
        return 'text-success';
      case 'low_stock':
        return 'text-warning';
      case 'out_of_stock':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  if (!filteredProducts.length) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Produk Terkait
        </h2>
        <Link to="/product-catalog">
          <Button variant="outline" size="sm">
            Lihat Semua
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.slice(0, 4).map((product) => (
          <div
            key={product.id}
            className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevation-2 transition-all duration-300 group"
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={product.images?.[0]?.url}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {product.isNew && (
                <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                  Baru
                </div>
              )}
              <div className="absolute top-3 right-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 bg-white/80 hover:bg-white/90"
                >
                  <Icon name="Heart" size={16} />
                </Button>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-heading font-semibold text-foreground line-clamp-2 mb-1">
                  {product.name}
                </h3>
                <p className="text-xs text-muted-foreground font-caption">
                  SKU: {product.sku}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-heading font-bold text-primary">
                    {formatPrice(product.price)}
                  </div>
                  <div className={`text-xs font-medium ${getStatusColor(product.status)}`}>
                    <Icon
                      name={product.status === 'in_stock' ? 'CheckCircle' : 'AlertCircle'}
                      size={12}
                      className="inline mr-1"
                    />
                    {product.status === 'in_stock' ? 'Tersedia' : 
                     product.status === 'low_stock' ? 'Terbatas' : 'Habis'}
                  </div>
                </div>

                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="text-xs text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </div>
                )}
              </div>

              <div className="flex space-x-2">
                <Link to={`/product-detail?id=${product.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    <Icon name="Eye" size={14} className="mr-2" />
                    Detail
                  </Button>
                </Link>
                <Button variant="default" size="sm" className="flex-1">
                  <Icon name="MessageCircle" size={14} className="mr-2" />
                  Inquiry
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;