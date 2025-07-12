import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onQuickInquiry }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const getStockStatus = (stock) => {
    if (stock > 50) return { label: 'Tersedia', color: 'text-success', bgColor: 'bg-success/10' };
    if (stock > 10) return { label: 'Terbatas', color: 'text-warning', bgColor: 'bg-warning/10' };
    if (stock > 0) return { label: 'Sisa Sedikit', color: 'text-error', bgColor: 'bg-error/10' };
    return { label: 'Habis', color: 'text-muted-foreground', bgColor: 'bg-muted' };
  };

  const stockStatus = getStockStatus(product.stock);

  return (
    <div className="group bg-card rounded-lg border border-border overflow-hidden shadow-elevation-1 hover:shadow-elevation-2 transition-smooth">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${stockStatus.color} ${stockStatus.bgColor}`}>
            {stockStatus.label}
          </span>
        </div>
        {product.isNew && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-accent-foreground bg-accent">
              Baru
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-heading font-semibold text-foreground text-sm line-clamp-2 group-hover:text-primary transition-micro">
            <Link to={`/product-detail?id=${product.id}`}>
              {product.name}
            </Link>
          </h3>
          <p className="text-xs font-caption text-muted-foreground mt-1">
            {product.category}
          </p>
        </div>

        <div className="mb-3">
          <div className="flex items-center justify-between">
            <span className="text-lg font-heading font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <p className="text-xs font-caption text-muted-foreground">
            per {product.unit}
          </p>
        </div>

        <div className="mb-3">
          <div className="flex items-center space-x-4 text-xs font-caption text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Package" size={12} />
              <span>Stok: {product.stock}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={12} />
              <span>{product.rating}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            iconName="Eye"
            iconPosition="left"
            iconSize={14}
            asChild
          >
            <Link to={`/product-detail?id=${product.id}`}>
              Detail
            </Link>
          </Button>
          <Button
            variant="success"
            size="sm"
            className="flex-1"
            iconName="MessageCircle"
            iconPosition="left"
            iconSize={14}
            onClick={() => onQuickInquiry(product)}
            disabled={product.stock === 0}
          >
            Tanya
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;