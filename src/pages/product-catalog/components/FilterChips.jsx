import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterChips = ({ activeFilters, onRemoveFilter, onClearAll }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const getFilterChips = () => {
    const chips = [];

    // Category chips
    activeFilters.categories.forEach(categoryId => {
      const categoryLabels = {
        'profil': 'Profil Aluminum',
        'plat': 'Plat Aluminum',
        'pipa': 'Pipa Aluminum',
        'sudut': 'Sudut Aluminum',
        'strip': 'Strip Aluminum',
        'kawat': 'Kawat Aluminum'
      };

      chips.push({
        id: `category-${categoryId}`,
        label: categoryLabels[categoryId] || categoryId,
        type: 'category',
        value: categoryId
      });
    });

    // Material chips
    activeFilters.materials.forEach(materialId => {
      const materialLabels = {
        '6061': 'Aluminum 6061',
        '6063': 'Aluminum 6063',
        '5052': 'Aluminum 5052',
        '1100': 'Aluminum 1100'
      };

      chips.push({
        id: `material-${materialId}`,
        label: materialLabels[materialId] || materialId,
        type: 'material',
        value: materialId
      });
    });

    // Finish chips
    activeFilters.finishes.forEach(finishId => {
      const finishLabels = {
        'natural': 'Natural',
        'anodized': 'Anodized',
        'powder-coated': 'Powder Coated',
        'mill-finish': 'Mill Finish'
      };

      chips.push({
        id: `finish-${finishId}`,
        label: finishLabels[finishId] || finishId,
        type: 'finish',
        value: finishId
      });
    });

    // Price range chip
    if (activeFilters.priceRange.min || activeFilters.priceRange.max) {
      const min = activeFilters.priceRange.min ? formatPrice(activeFilters.priceRange.min) : '0';
      const max = activeFilters.priceRange.max ? formatPrice(activeFilters.priceRange.max) : '∞';
      
      chips.push({
        id: 'price-range',
        label: `${min} - ${max}`,
        type: 'priceRange',
        value: 'priceRange'
      });
    }

    // Stock filter chip
    if (activeFilters.inStock) {
      chips.push({
        id: 'in-stock',
        label: 'Tersedia',
        type: 'inStock',
        value: 'inStock'
      });
    }

    return chips;
  };

  const chips = getFilterChips();

  if (chips.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 py-3">
      <span className="text-sm font-medium text-muted-foreground mr-2">
        Filter aktif:
      </span>
      
      {chips.map(chip => (
        <div
          key={chip.id}
          className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
        >
          <span>{chip.label}</span>
          <button
            onClick={() => onRemoveFilter(chip.type, chip.value)}
            className="ml-1 hover:bg-primary/20 rounded-full p-0.5 transition-micro"
            aria-label={`Remove ${chip.label} filter`}
          >
            <Icon name="X" size={14} />
          </button>
        </div>
      ))}

      {chips.length > 1 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-muted-foreground hover:text-foreground"
        >
          Hapus Semua
        </Button>
      )}
    </div>
  );
};

export default FilterChips;