import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, loading, onQuickInquiry }) => {
  const SkeletonCard = () => (
    <div className="bg-card rounded-lg border border-border overflow-hidden shadow-elevation-1">
      <div className="aspect-square bg-muted animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded animate-pulse" />
          <div className="h-3 bg-muted rounded w-2/3 animate-pulse" />
        </div>
        <div className="h-6 bg-muted rounded w-1/2 animate-pulse" />
        <div className="flex space-x-2">
          <div className="h-8 bg-muted rounded flex-1 animate-pulse" />
          <div className="h-8 bg-muted rounded flex-1 animate-pulse" />
        </div>
      </div>
    </div>
  );

  if (loading && products.length === 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <svg
            viewBox="0 0 24 24"
            className="w-12 h-12 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
        </div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
          Tidak ada produk ditemukan
        </h3>
        <p className="text-muted-foreground max-w-md">
          Coba ubah filter pencarian atau kata kunci untuk menemukan produk yang Anda cari.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickInquiry={onQuickInquiry}
          />
        ))}
      </div>

      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={`skeleton-${index}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;