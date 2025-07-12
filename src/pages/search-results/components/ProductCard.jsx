import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, searchQuery }) => {
  const highlightSearchTerm = (text, query) => {
    if (!query || query.length < 2) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-accent/20 text-accent font-medium">
          {part}
        </mark>
      ) : part
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getStockBadge = (stock) => {
    if (stock > 10) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
          <Icon name="CheckCircle" size={12} className="mr-1" />
          Tersedia
        </span>
      );
    } else if (stock > 0) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning">
          <Icon name="AlertCircle" size={12} className="mr-1" />
          Stok Terbatas
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-error/10 text-error">
          <Icon name="XCircle" size={12} className="mr-1" />
          Habis
        </span>
      );
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden shadow-elevation-1 hover:shadow-elevation-2 transition-smooth group">
      <Link to={`/product-detail?id=${product.id}`} className="block">
        <div className="relative overflow-hidden aspect-square">
          <Image
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          />
          {product.isNew && (
            <div className="absolute top-3 left-3">
              <span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
                Baru
              </span>
            </div>
          )}
          {product.discount && (
            <div className="absolute top-3 right-3">
              <span className="bg-error text-error-foreground text-xs font-medium px-2 py-1 rounded-full">
                -{product.discount}%
              </span>
            </div>
          )}
          <div className="absolute bottom-3 right-3">
            {getStockBadge(product.stock)}
          </div>
        </div>
      </Link>

      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>

        <Link to={`/product-detail?id=${product.id}`}>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-micro">
            {highlightSearchTerm(product.name, searchQuery)}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {highlightSearchTerm(product.description, searchQuery)}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={14}
                  className={`${
                    i < Math.floor(product.rating)
                      ? 'text-warning fill-current' :'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-1">
              ({product.reviews})
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            {product.brand}
          </span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-muted-foreground line-through mr-2">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-lg font-heading font-bold text-foreground">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            variant="default"
            size="sm"
            className="flex-1"
            disabled={product.stock === 0}
            onClick={(e) => {
              e.preventDefault();
              // Handle add to cart
            }}
          >
            <Icon name="ShoppingCart" size={16} className="mr-2" />
            {product.stock === 0 ? 'Habis' : 'Keranjang'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              // Handle wishlist
            }}
          >
            <Icon name="Heart" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;