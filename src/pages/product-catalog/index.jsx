import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import FilterPanel from './components/FilterPanel';
import FilterChips from './components/FilterChips';
import SortDropdown from './components/SortDropdown';
import ProductGrid from './components/ProductGrid';
import QuickInquiryModal from './components/QuickInquiryModal';

const ProductCatalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [filters, setFilters] = useState({
    categories: [],
    materials: [],
    finishes: [],
    priceRange: { min: '', max: '' },
    inStock: false
  });

  const [products, setProducts] = useState([]);

  // Mock product data
  const mockProducts = [
    {
      id: 1,
      name: "Profil Aluminum L 40x40x3mm",
      category: "Profil Aluminum",
      price: 85000,
      originalPrice: 95000,
      unit: "batang",
      stock: 150,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      isNew: true,
      material: "6061",
      finish: "natural"
    },
    {
      id: 2,
      name: "Plat Aluminum 1mm x 1200 x 2400",
      category: "Plat Aluminum",
      price: 450000,
      unit: "lembar",
      stock: 45,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400",
      isNew: false,
      material: "5052",
      finish: "mill-finish"
    },
    {
      id: 3,
      name: "Pipa Aluminum Round 25mm x 2mm",
      category: "Pipa Aluminum",
      price: 125000,
      unit: "batang",
      stock: 8,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400",
      isNew: false,
      material: "6063",
      finish: "anodized"
    },
    {
      id: 4,
      name: "Sudut Aluminum 50x50x5mm",
      category: "Sudut Aluminum",
      price: 95000,
      originalPrice: 110000,
      unit: "batang",
      stock: 0,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400",
      isNew: false,
      material: "6061",
      finish: "powder-coated"
    },
    {
      id: 5,
      name: "Strip Aluminum 20x3mm",
      category: "Strip Aluminum",
      price: 35000,
      unit: "batang",
      stock: 200,
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400",
      isNew: true,
      material: "1100",
      finish: "natural"
    },
    {
      id: 6,
      name: "Kawat Aluminum 2.5mm",
      category: "Kawat Aluminum",
      price: 65000,
      unit: "kg",
      stock: 75,
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
      isNew: false,
      material: "1100",
      finish: "natural"
    },
    {
      id: 7,
      name: "Profil Aluminum U 30x30x3mm",
      category: "Profil Aluminum",
      price: 75000,
      unit: "batang",
      stock: 120,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400",
      isNew: false,
      material: "6063",
      finish: "anodized"
    },
    {
      id: 8,
      name: "Plat Aluminum 2mm x 1000 x 2000",
      category: "Plat Aluminum",
      price: 650000,
      unit: "lembar",
      stock: 25,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400",
      isNew: true,
      material: "6061",
      finish: "mill-finish"
    }
  ];

  const breadcrumbItems = [
    { label: 'Beranda', href: '/homepage' },
    { label: 'Katalog Produk' }
  ];

  const filterProducts = useCallback((productList) => {
    let filtered = [...productList];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => {
        const categoryMap = {
          'profil': 'Profil Aluminum',
          'plat': 'Plat Aluminum',
          'pipa': 'Pipa Aluminum',
          'sudut': 'Sudut Aluminum',
          'strip': 'Strip Aluminum',
          'kawat': 'Kawat Aluminum'
        };
        return filters.categories.some(cat => categoryMap[cat] === product.category);
      });
    }

    // Material filter
    if (filters.materials.length > 0) {
      filtered = filtered.filter(product =>
        filters.materials.includes(product.material)
      );
    }

    // Finish filter
    if (filters.finishes.length > 0) {
      filtered = filtered.filter(product =>
        filters.finishes.includes(product.finish)
      );
    }

    // Price range filter
    if (filters.priceRange.min || filters.priceRange.max) {
      filtered = filtered.filter(product => {
        const min = filters.priceRange.min ? parseInt(filters.priceRange.min) : 0;
        const max = filters.priceRange.max ? parseInt(filters.priceRange.max) : Infinity;
        return product.price >= min && product.price <= max;
      });
    }

    // Stock filter
    if (filters.inStock) {
      filtered = filtered.filter(product => product.stock > 0);
    }

    return filtered;
  }, [searchQuery, filters]);

  const sortProducts = useCallback((productList) => {
    const sorted = [...productList];

    switch (currentSort) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'popularity':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sorted;
    }
  }, [currentSort]);

  const loadProducts = useCallback(async (page = 1, reset = false) => {
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    const filtered = filterProducts(mockProducts);
    const sorted = sortProducts(filtered);
    
    const itemsPerPage = 12;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageProducts = sorted.slice(startIndex, endIndex);

    if (reset) {
      setProducts(pageProducts);
    } else {
      setProducts(prev => [...prev, ...pageProducts]);
    }

    setHasMore(endIndex < sorted.length);
    setLoading(false);
  }, [filterProducts, sortProducts]);

  useEffect(() => {
    setCurrentPage(1);
    loadProducts(1, true);
  }, [loadProducts]);

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
    } else {
      setSearchParams({});
    }
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleRemoveFilter = (type, value) => {
    const newFilters = { ...filters };

    switch (type) {
      case 'category':
        newFilters.categories = newFilters.categories.filter(id => id !== value);
        break;
      case 'material':
        newFilters.materials = newFilters.materials.filter(id => id !== value);
        break;
      case 'finish':
        newFilters.finishes = newFilters.finishes.filter(id => id !== value);
        break;
      case 'priceRange':
        newFilters.priceRange = { min: '', max: '' };
        break;
      case 'inStock':
        newFilters.inStock = false;
        break;
    }

    setFilters(newFilters);
  };

  const handleClearAllFilters = () => {
    setFilters({
      categories: [],
      materials: [],
      finishes: [],
      priceRange: { min: '', max: '' },
      inStock: false
    });
  };

  const handleQuickInquiry = (product) => {
    setSelectedProduct(product);
    setIsInquiryModalOpen(true);
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    loadProducts(nextPage, false);
  };

  const filteredProducts = filterProducts(mockProducts);
  const totalProducts = filteredProducts.length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} />

          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
              Katalog Produk Aluminum
            </h1>
            <p className="text-muted-foreground">
              Temukan berbagai produk aluminum berkualitas tinggi untuk kebutuhan konstruksi dan industri Anda.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <form onSubmit={handleSearch} className="max-w-2xl">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Cari produk aluminum..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4"
                />
                <Icon
                  name="Search"
                  size={20}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                />
              </div>
            </form>
          </div>

          <div className="flex lg:space-x-8">
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block">
              <FilterPanel
                isOpen={true}
                onClose={() => {}}
                filters={filters}
                onFiltersChange={handleFiltersChange}
                isMobile={false}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsFilterOpen(true)}
                    className="lg:hidden"
                    iconName="Filter"
                    iconPosition="left"
                  >
                    Filter
                  </Button>
                  
                  <div className="text-sm font-caption text-muted-foreground">
                    {totalProducts} produk ditemukan
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <SortDropdown
                    currentSort={currentSort}
                    onSortChange={setCurrentSort}
                  />
                  
                  <div className="flex items-center border border-border rounded-lg overflow-hidden">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="rounded-none border-0"
                    >
                      <Icon name="Grid3X3" size={16} />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="rounded-none border-0"
                    >
                      <Icon name="List" size={16} />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              <FilterChips
                activeFilters={filters}
                onRemoveFilter={handleRemoveFilter}
                onClearAll={handleClearAllFilters}
              />

              {/* Product Grid */}
              <ProductGrid
                products={products}
                loading={loading}
                onQuickInquiry={handleQuickInquiry}
              />

              {/* Load More */}
              {hasMore && products.length > 0 && (
                <div className="flex justify-center mt-8">
                  <Button
                    variant="outline"
                    onClick={handleLoadMore}
                    loading={loading}
                    iconName="ChevronDown"
                    iconPosition="right"
                  >
                    {loading ? 'Memuat...' : 'Muat Lebih Banyak'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filter Panel */}
      <FilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        isMobile={true}
      />

      {/* Quick Inquiry Modal */}
      <QuickInquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
};

export default ProductCatalog;