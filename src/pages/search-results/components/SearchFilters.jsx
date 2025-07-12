import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const SearchFilters = ({ isOpen, onClose, filters, onFiltersChange, isMobile = false }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const categories = [
    { id: 'kusen', label: 'Kusen Aluminum', count: 45 },
    { id: 'pintu', label: 'Pintu Aluminum', count: 32 },
    { id: 'jendela', label: 'Jendela Aluminum', count: 28 },
    { id: 'partisi', label: 'Partisi Aluminum', count: 18 },
    { id: 'railing', label: 'Railing Aluminum', count: 15 },
    { id: 'canopy', label: 'Canopy Aluminum', count: 12 }
  ];

  const priceRanges = [
    { id: 'under-500k', label: 'Di bawah Rp 500.000', min: 0, max: 500000 },
    { id: '500k-1m', label: 'Rp 500.000 - Rp 1.000.000', min: 500000, max: 1000000 },
    { id: '1m-2m', label: 'Rp 1.000.000 - Rp 2.000.000', min: 1000000, max: 2000000 },
    { id: '2m-5m', label: 'Rp 2.000.000 - Rp 5.000.000', min: 2000000, max: 5000000 },
    { id: 'above-5m', label: 'Di atas Rp 5.000.000', min: 5000000, max: null }
  ];

  const brands = [
    { id: 'alcopan', label: 'Alcopan', count: 25 },
    { id: 'alexindo', label: 'Alexindo', count: 20 },
    { id: 'ykk', label: 'YKK AP', count: 18 },
    { id: 'alcomex', label: 'Alcomex', count: 15 }
  ];

  const handleCategoryChange = (categoryId, checked) => {
    const newCategories = checked 
      ? [...localFilters.categories, categoryId]
      : localFilters.categories.filter(id => id !== categoryId);
    
    setLocalFilters(prev => ({
      ...prev,
      categories: newCategories
    }));
  };

  const handlePriceRangeChange = (rangeId, checked) => {
    const newPriceRanges = checked 
      ? [...localFilters.priceRanges, rangeId]
      : localFilters.priceRanges.filter(id => id !== rangeId);
    
    setLocalFilters(prev => ({
      ...prev,
      priceRanges: newPriceRanges
    }));
  };

  const handleBrandChange = (brandId, checked) => {
    const newBrands = checked 
      ? [...localFilters.brands, brandId]
      : localFilters.brands.filter(id => id !== brandId);
    
    setLocalFilters(prev => ({
      ...prev,
      brands: newBrands
    }));
  };

  const handlePriceInputChange = (field, value) => {
    setLocalFilters(prev => ({
      ...prev,
      customPrice: {
        ...prev.customPrice,
        [field]: value
      }
    }));
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    if (isMobile) {
      onClose();
    }
  };

  const clearFilters = () => {
    const emptyFilters = {
      categories: [],
      priceRanges: [],
      brands: [],
      customPrice: { min: '', max: '' },
      inStock: false
    };
    setLocalFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Kategori Produk
        </h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between">
              <Checkbox
                label={category.label}
                checked={localFilters.categories.includes(category.id)}
                onChange={(e) => handleCategoryChange(category.id, e.target.checked)}
              />
              <span className="text-sm text-muted-foreground">
                ({category.count})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Rentang Harga
        </h3>
        <div className="space-y-3 mb-4">
          {priceRanges.map((range) => (
            <Checkbox
              key={range.id}
              label={range.label}
              checked={localFilters.priceRanges.includes(range.id)}
              onChange={(e) => handlePriceRangeChange(range.id, e.target.checked)}
            />
          ))}
        </div>
        
        {/* Custom Price Range */}
        <div className="border-t border-border pt-4">
          <h4 className="text-sm font-medium text-foreground mb-3">
            Harga Kustom
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              placeholder="Min"
              value={localFilters.customPrice.min}
              onChange={(e) => handlePriceInputChange('min', e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max"
              value={localFilters.customPrice.max}
              onChange={(e) => handlePriceInputChange('max', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Merek
        </h3>
        <div className="space-y-3">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center justify-between">
              <Checkbox
                label={brand.label}
                checked={localFilters.brands.includes(brand.id)}
                onChange={(e) => handleBrandChange(brand.id, e.target.checked)}
              />
              <span className="text-sm text-muted-foreground">
                ({brand.count})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stock Status */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Status Stok
        </h3>
        <Checkbox
          label="Hanya produk tersedia"
          checked={localFilters.inStock}
          onChange={(e) => setLocalFilters(prev => ({ ...prev, inStock: e.target.checked }))}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col space-y-3 pt-4 border-t border-border">
        <Button
          variant="default"
          onClick={applyFilters}
          className="w-full"
        >
          Terapkan Filter
        </Button>
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full"
        >
          Hapus Semua Filter
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black/50" onClick={onClose} />
            <div className="fixed bottom-0 left-0 right-0 bg-card rounded-t-xl max-h-[80vh] overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-lg font-heading font-semibold text-foreground">
                  Filter Produk
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
              <div className="p-4 overflow-y-auto max-h-[calc(80vh-80px)]">
                <FilterContent />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 h-fit sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Filter Produk
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-muted-foreground hover:text-foreground"
        >
          Reset
        </Button>
      </div>
      <FilterContent />
    </div>
  );
};

export default SearchFilters;