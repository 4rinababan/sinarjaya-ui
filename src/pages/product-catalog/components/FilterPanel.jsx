import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import { Checkbox } from "../../../components/ui/Checkbox";
import { categoryService } from "../../../api/categoryService";

const FilterPanel = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  isMobile,
}) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [categories, setCategories] = useState([]);

  // Fetch categories dari API
  useEffect(() => {
    categoryService
      .getAll(1, 50)
      .then((res) => {
        const apiCategories = res.data?.data || [];
        const mapped = apiCategories.map((cat) => ({
          id: cat.name, // id untuk filter = category.name
          label: cat.detail, // label untuk tampil = category.detail
          count: 0, // sementara, nanti bisa hitung dari API product
        }));
        setCategories(mapped);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setCategories([]);
      });
  }, []);

  const handleCategoryChange = (categoryId, checked) => {
    const newCategories = checked
      ? [...localFilters.categories, categoryId]
      : localFilters.categories.filter((id) => id !== categoryId);

    setLocalFilters((prev) => ({
      ...prev,
      categories: newCategories,
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
      priceRange: { min: "", max: "" },
      inStock: false,
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
          <h3 className="font-heading font-semibold text-foreground">
            {title}
          </h3>
          <Icon
            name={isExpanded ? "ChevronUp" : "ChevronDown"}
            size={20}
            className="text-muted-foreground"
          />
        </button>
        {isExpanded && <div className="pb-4">{children}</div>}
      </div>
    );
  };

  const content = (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-heading font-semibold text-foreground">
          Filter Produk
        </h2>
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
              {categories.map((category) => (
                <Checkbox
                  key={category.id}
                  label={
                    <div className="flex items-center justify-between w-full">
                      <span>{category.label}</span>
                      {category.count > 0 && (
                        <span className="text-xs font-caption text-muted-foreground">
                          ({category.count})
                        </span>
                      )}
                    </div>
                  }
                  checked={localFilters.categories.includes(category.id)}
                  onChange={(e) =>
                    handleCategoryChange(category.id, e.target.checked)
                  }
                />
              ))}
            </div>
          </FilterSection>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex space-x-3">
          <Button variant="outline" className="flex-1" onClick={clearFilters}>
            Reset
          </Button>
          <Button variant="default" className="flex-1" onClick={applyFilters}>
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

  return <div className="w-80 bg-card border-r border-border">{content}</div>;
};

export default FilterPanel;
