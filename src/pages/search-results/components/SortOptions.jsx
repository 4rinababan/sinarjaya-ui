import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortOptions = ({ currentSort, onSortChange, isMobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: 'relevance', label: 'Relevansi', icon: 'Target' },
    { value: 'price-low', label: 'Harga: Rendah ke Tinggi', icon: 'ArrowUp' },
    { value: 'price-high', label: 'Harga: Tinggi ke Rendah', icon: 'ArrowDown' },
    { value: 'newest', label: 'Terbaru', icon: 'Clock' },
    { value: 'rating', label: 'Rating Tertinggi', icon: 'Star' },
    { value: 'popular', label: 'Paling Populer', icon: 'TrendingUp' },
    { value: 'name-asc', label: 'Nama: A-Z', icon: 'ArrowUp' },
    { value: 'name-desc', label: 'Nama: Z-A', icon: 'ArrowDown' }
  ];

  const currentSortOption = sortOptions.find(option => option.value === currentSort);

  const handleSortSelect = (value) => {
    onSortChange(value);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <>
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="w-full justify-between"
        >
          <div className="flex items-center space-x-2">
            <Icon name={currentSortOption?.icon || 'ArrowUpDown'} size={16} />
            <span>{currentSortOption?.label || 'Urutkan'}</span>
          </div>
          <Icon name="ChevronDown" size={16} />
        </Button>

        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
            <div className="fixed bottom-0 left-0 right-0 bg-card rounded-t-xl max-h-[60vh] overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="text-lg font-heading font-semibold text-foreground">
                  Urutkan Berdasarkan
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
              <div className="p-4 overflow-y-auto">
                <div className="space-y-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSortSelect(option.value)}
                      className={`flex items-center space-x-3 w-full p-3 rounded-lg text-left transition-micro ${
                        currentSort === option.value
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <Icon 
                        name={option.icon} 
                        size={18} 
                        className={currentSort === option.value ? 'text-primary-foreground' : 'text-muted-foreground'}
                      />
                      <span className="font-medium">{option.label}</span>
                      {currentSort === option.value && (
                        <Icon name="Check" size={16} className="ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="min-w-[200px] justify-between"
      >
        <div className="flex items-center space-x-2">
          <Icon name={currentSortOption?.icon || 'ArrowUpDown'} size={16} />
          <span>{currentSortOption?.label || 'Urutkan'}</span>
        </div>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-elevation-2 z-20 overflow-hidden">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortSelect(option.value)}
                className={`flex items-center space-x-3 w-full p-3 text-left transition-micro ${
                  currentSort === option.value
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <Icon 
                  name={option.icon} 
                  size={16} 
                  className={currentSort === option.value ? 'text-primary-foreground' : 'text-muted-foreground'}
                />
                <span className="font-medium">{option.label}</span>
                {currentSort === option.value && (
                  <Icon name="Check" size={16} className="ml-auto" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SortOptions;