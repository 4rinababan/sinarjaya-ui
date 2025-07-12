import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ isOpen, onClose, filters, onFiltersChange, isMobile }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const categories = [
    { id: 'profil', label: 'Profil Aluminum', count: 45 },
    { id: 'plat', label: 'Plat Aluminum', count: 32 },
    { id: 'pipa', label: 'Pipa Aluminum', count: 28 },
    { id: 'sudut', label: 'Sudut Aluminum', count: 24 },
    { id: 'strip', label: 'Strip Aluminum', count: 18 },
    { id: 'kawat', label: 'Kawat Aluminum', count: 15 }
  ];

  const materials = [
    { id: '6061', label: 'Aluminum 6061', count: 67 },
    { id: '6063', label: 'Aluminum 6063', count: 54 },
    { id: '5052', label: 'Aluminum 5052', count: 43 },
    { id: '1100', label: 'Aluminum 1100', count: 28 }
  ];

  const finishes = [
    { id: 'natural', label: 'Natural', count: 89 },
    { id: 'anodized', label: 'Anodized', count: 45 },
    { id: 'powder-coated', label: 'Powder Coated', count: 32 },
    { id: 'mill-finish', label: 'Mill Finish', count: 28 }
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

  const handleMaterialChange = (materialId, checked) => {
    const newMaterials = checked
      ? [...localFilters.materials, materialId]
      : localFilters.materials.filter(id => id !== materialId);
    
    setLocalFilters(prev => ({
      ...prev,
      materials: newMaterials
    }));
  };

  const handleFinishChange = (finishId, checked) => {
    const newFinishes = checked
      ? [...localFilters.finishes, finishId]
      : localFilters.finishes.filter(id => id !== finishId);
    
    setLocalFilters(prev => ({
      ...prev,
      finishes: newFinishes
    }));
  };

  const handlePriceChange = (field, value) => {
    setLocalFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
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
    const clearedFilters = {
      categories: [],
      materials: [],
      finishes: [],
      priceRange: { min: '', max: '' },
      inStock: false
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const FilterSection = ({ title, children, defaultOpen = true }) => {
    const [isExpanded, setIsExpanded] = useState(defaultOpen);

    return (
      <div className="border-b border-border last:border-b-0">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full py-4 text-left"
        >
          <h3 className="font-heading font-semibold text-foreground">{title}</h3>
          <Icon
            name={isExpanded ? 'ChevronUp' : 'ChevronDown'}
            size={20}
            className="text-muted-foreground"
          />
        </button>
        {isExpanded && (
          <div className="pb-4">
            {children}
          </div>
        )}
      </div>
    );
  };

  const content = (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-heading font-semibold text-foreground">Filter Produk</h2>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={24} />
          </Button>
        )}
      </div>

      {/* Filter Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-0">
          {/* Categories */}
          <FilterSection title="Kategori">
            <div className="space-y-3">
              {categories.map(category => (
                <Checkbox
                  key={category.id}
                  label={
                    <div className="flex items-center justify-between w-full">
                      <span>{category.label}</span>
                      <span className="text-xs font-caption text-muted-foreground">
                        ({category.count})
                      </span>
                    </div>
                  }
                  checked={localFilters.categories.includes(category.id)}
                  onChange={(e) => handleCategoryChange(category.id, e.target.checked)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Price Range */}
          <FilterSection title="Rentang Harga">
            <div className="space-y-3">
              <Input
                type="number"
                label="Harga Minimum"
                placeholder="0"
                value={localFilters.priceRange.min}
                onChange={(e) => handlePriceChange('min', e.target.value)}
              />
              <Input
                type="number"
                label="Harga Maksimum"
                placeholder="10000000"
                value={localFilters.priceRange.max}
                onChange={(e) => handlePriceChange('max', e.target.value)}
              />
            </div>
          </FilterSection>

          {/* Materials */}
          <FilterSection title="Material">
            <div className="space-y-3">
              {materials.map(material => (
                <Checkbox
                  key={material.id}
                  label={
                    <div className="flex items-center justify-between w-full">
                      <span>{material.label}</span>
                      <span className="text-xs font-caption text-muted-foreground">
                        ({material.count})
                      </span>
                    </div>
                  }
                  checked={localFilters.materials.includes(material.id)}
                  onChange={(e) => handleMaterialChange(material.id, e.target.checked)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Finishes */}
          <FilterSection title="Finishing">
            <div className="space-y-3">
              {finishes.map(finish => (
                <Checkbox
                  key={finish.id}
                  label={
                    <div className="flex items-center justify-between w-full">
                      <span>{finish.label}</span>
                      <span className="text-xs font-caption text-muted-foreground">
                        ({finish.count})
                      </span>
                    </div>
                  }
                  checked={localFilters.finishes.includes(finish.id)}
                  onChange={(e) => handleFinishChange(finish.id, e.target.checked)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Stock Status */}
          <FilterSection title="Ketersediaan">
            <Checkbox
              label="Hanya tampilkan produk tersedia"
              checked={localFilters.inStock}
              onChange={(e) => setLocalFilters(prev => ({
                ...prev,
                inStock: e.target.checked
              }))}
            />
          </FilterSection>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={clearFilters}
          >
            Reset
          </Button>
          <Button
            variant="default"
            className="flex-1"
            onClick={applyFilters}
          >
            Terapkan Filter
          </Button>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 z-mobile-menu lg:hidden">
            <div className="fixed inset-0 bg-black/50" onClick={onClose} />
            <div className="fixed top-0 left-0 h-full w-80 max-w-full bg-card shadow-elevation-3">
              {content}
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="w-80 bg-card border-r border-border">
      {content}
    </div>
  );
};

export default FilterPanel;