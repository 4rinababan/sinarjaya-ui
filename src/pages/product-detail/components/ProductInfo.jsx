import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductInfo = ({ product }) => {
  const [activeTab, setActiveTab] = useState('specifications');

  const tabs = [
    { id: 'specifications', label: 'Spesifikasi', icon: 'FileText' },
    { id: 'features', label: 'Fitur', icon: 'Star' },
    { id: 'applications', label: 'Aplikasi', icon: 'Wrench' },
    { id: 'installation', label: 'Instalasi', icon: 'Tool' }
  ];

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
        return 'text-success bg-success/10';
      case 'low_stock':
        return 'text-warning bg-warning/10';
      case 'out_of_stock':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'in_stock':
        return 'Tersedia';
      case 'low_stock':
        return 'Stok Terbatas';
      case 'out_of_stock':
        return 'Habis';
      default:
        return 'Tidak Diketahui';
    }
  };

  return (
    <div className="space-y-6">
      {/* Product Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">
            {product.name}
          </h1>
          <p className="text-muted-foreground font-caption">
            SKU: {product.sku}
          </p>
        </div>

        {/* Price and Status */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="text-2xl font-heading font-bold text-primary">
              {formatPrice(product.price)}
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </div>
            )}
            <div className="text-xs text-muted-foreground">
              Per {product.unit || 'unit'}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                product.status
              )}`}
            >
              <Icon
                name={product.status === 'in_stock' ? 'CheckCircle' : 'AlertCircle'}
                size={16}
                className="mr-1"
              />
              {getStatusText(product.status)}
            </span>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-muted-foreground leading-relaxed">
          {product.shortDescription}
        </p>
      </div>

      {/* Product Details Tabs */}
      <div className="border border-border rounded-lg overflow-hidden">
        {/* Tab Headers */}
        <div className="flex overflow-x-auto bg-muted/30">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'text-primary bg-card border-b-2 border-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 bg-card">
          {activeTab === 'specifications' && (
            <div className="space-y-4">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                Spesifikasi Teknis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specifications?.map((spec, index) => (
                  <div key={index} className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground font-medium">{spec.label}:</span>
                    <span className="text-foreground font-semibold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-4">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                Fitur Unggulan
              </h3>
              <ul className="space-y-3">
                {product.features?.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Icon name="CheckCircle" size={20} className="text-success mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'applications' && (
            <div className="space-y-4">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                Aplikasi Penggunaan
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.applications?.map((app, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                    <Icon name="Building2" size={20} className="text-primary flex-shrink-0" />
                    <span className="text-foreground font-medium">{app}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'installation' && (
            <div className="space-y-4">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                Panduan Instalasi
              </h3>
              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground mb-4">
                  {product.installationGuide}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm">
                    <Icon name="Download" size={16} className="mr-2" />
                    Manual PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="Video" size={16} className="mr-2" />
                    Video Tutorial
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;