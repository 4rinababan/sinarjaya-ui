import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortDropdown = ({ currentSort, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'relevance', label: 'Relevansi', icon: 'Target' },
    { value: 'price-low', label: 'Harga: Rendah ke Tinggi', icon: 'TrendingUp' },
    { value: 'price-high', label: 'Harga: Tinggi ke Rendah', icon: 'TrendingDown' },
    { value: 'popularity', label: 'Popularitas', icon: 'Star' },
    { value: 'newest', label: 'Terbaru', icon: 'Clock' },
    { value: 'name-asc', label: 'Nama: A-Z', icon: 'ArrowUp' },
    { value: 'name-desc', label: 'Nama: Z-A', icon: 'ArrowDown' }
  ];

  const currentOption = sortOptions.find(option => option.value === currentSort) || sortOptions[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortSelect = (sortValue) => {
    onSortChange(sortValue);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="justify-between min-w-[200px]"
        iconName="ChevronDown"
        iconPosition="right"
        iconSize={16}
      >
        <div className="flex items-center space-x-2">
          <Icon name={currentOption.icon} size={16} />
          <span className="hidden sm:inline">{currentOption.label}</span>
          <span className="sm:hidden">Urutkan</span>
        </div>
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-elevation-2 z-dropdown overflow-hidden">
          <div className="py-1">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortSelect(option.value)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-muted transition-micro ${
                  currentSort === option.value
                    ? 'bg-primary/10 text-primary' :'text-foreground'
                }`}
              >
                <Icon
                  name={option.icon}
                  size={16}
                  className={currentSort === option.value ? 'text-primary' : 'text-muted-foreground'}
                />
                <span className="font-medium">{option.label}</span>
                {currentSort === option.value && (
                  <Icon name="Check" size={16} className="text-primary ml-auto" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;