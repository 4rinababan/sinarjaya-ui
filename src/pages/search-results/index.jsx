import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import SearchFilters from './components/SearchFilters';
import SearchSuggestions from './components/SearchSuggestions';
import ProductCard from './components/ProductCard';
import SortOptions from './components/SortOptions';
import NoResults from './components/NoResults';
import SearchHistory from './components/SearchHistory';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [currentSort, setCurrentSort] = useState('relevance');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isSearchHistoryOpen, setIsSearchHistoryOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    priceRanges: [],
    brands: [],
    customPrice: { min: '', max: '' },
    inStock: false
  });

  // Mock search results data
  const mockProducts = [
    {
      id: 1,
      name: 'Kusen Aluminum Putih Premium',
      description: 'Kusen aluminum berkualitas tinggi dengan finishing putih yang elegan. Tahan lama dan anti karat.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      price: 850000,
      originalPrice: 950000,
      category: 'Kusen',
      brand: 'Alcopan',
      rating: 4.5,
      reviews: 128,
      stock: 15,
      isNew: true,
      discount: 11
    },
    {
      id: 2,
      name: 'Pintu Sliding Aluminum Modern',
      description: 'Pintu sliding aluminum dengan desain modern dan sistem rel yang halus. Cocok untuk rumah minimalis.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
      price: 1250000,
      category: 'Pintu',
      brand: 'YKK AP',
      rating: 4.7,
      reviews: 89,
      stock: 8,
      isNew: false
    },
    {
      id: 3,
      name: 'Jendela Casement Aluminum',
      description: 'Jendela casement aluminum dengan bukaan ke luar. Ventilasi optimal dan mudah dibersihkan.',
      image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=400&fit=crop',
      price: 750000,
      category: 'Jendela',
      brand: 'Alexindo',
      rating: 4.3,
      reviews: 156,
      stock: 22,
      isNew: false
    },
    {
      id: 4,
      name: 'Partisi Kantor Aluminum Glass',
      description: 'Partisi kantor dengan frame aluminum dan panel kaca. Memberikan privasi tanpa mengurangi pencahayaan.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop',
      price: 2100000,
      category: 'Partisi',
      brand: 'Alcomex',
      rating: 4.6,
      reviews: 67,
      stock: 5,
      isNew: true
    },
    {
      id: 5,
      name: 'Railing Tangga Aluminum Minimalis',
      description: 'Railing tangga aluminum dengan desain minimalis. Kuat, aman, dan estetis untuk rumah modern.',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?w=400&h=400&fit=crop',
      price: 1800000,
      category: 'Railing',
      brand: 'Alcopan',
      rating: 4.4,
      reviews: 94,
      stock: 12,
      isNew: false
    },
    {
      id: 6,
      name: 'Canopy Aluminum Transparan',
      description: 'Canopy aluminum dengan atap polycarbonate transparan. Melindungi dari hujan sambil tetap terang.',
      image: 'https://images.pixabay.com/photo/2016/11/29/03/53/architecture-1867187_1280.jpg?w=400&h=400&fit=crop',
      price: 3200000,
      category: 'Canopy',
      brand: 'YKK AP',
      rating: 4.8,
      reviews: 45,
      stock: 3,
      isNew: true,
      discount: 15
    }
  ];

  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [totalResults, setTotalResults] = useState(mockProducts.length);

  const breadcrumbItems = [
    { label: 'Beranda', href: '/homepage' },
    { label: 'Hasil Pencarian', href: null }
  ];

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [searchParams]);

  const performSearch = (query) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      if (!query || query.trim().length === 0) {
        setFilteredProducts([]);
        setTotalResults(0);
      } else {
        // Filter products based on search query
        const filtered = mockProducts.filter(product =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()) ||
          product.brand.toLowerCase().includes(query.toLowerCase())
        );
        
        setFilteredProducts(filtered);
        setTotalResults(filtered.length);
      }
      setIsLoading(false);
    }, 500);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
      setShowSuggestions(false);
      setIsSearchHistoryOpen(false);
      
      // Add to search history
      const savedHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
      const newHistory = [
        searchQuery.trim(),
        ...savedHistory.filter(item => item !== searchQuery.trim())
      ].slice(0, 10);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSearchParams({ q: suggestion });
    setShowSuggestions(false);
  };

  const handleHistorySelect = (query) => {
    setSearchQuery(query);
    setSearchParams({ q: query });
  };

  const handleSortChange = (newSort) => {
    setCurrentSort(newSort);
    
    // Sort products based on selection
    let sorted = [...filteredProducts];
    switch (newSort) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        sorted.sort((a, b) => b.isNew - a.isNew);
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'popular':
        sorted.sort((a, b) => b.reviews - a.reviews);
        break;
      default: // relevance
        // Keep original order for relevance
        break;
    }
    setFilteredProducts(sorted);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // Apply filters logic here
    // For demo, we'll just keep the current filtered products
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} />
          
          {/* Search Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">
                  Hasil Pencarian
                </h1>
                {searchQuery && (
                  <p className="text-muted-foreground">
                    Menampilkan {totalResults} hasil untuk 
                    <span className="font-medium text-foreground"> "{searchQuery}"</span>
                  </p>
                )}
              </div>
              
              {/* Mobile Search */}
              <div className="lg:hidden relative">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Input
                      type="search"
                      placeholder="Cari produk aluminum..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowSuggestions(e.target.value.length > 1);
                      }}
                      onFocus={() => {
                        if (searchQuery.length > 1) setShowSuggestions(true);
                        else setIsSearchHistoryOpen(true);
                      }}
                      onBlur={() => {
                        setTimeout(() => {
                          setShowSuggestions(false);
                          setIsSearchHistoryOpen(false);
                        }, 200);
                      }}
                      className="w-full pl-10 pr-4"
                    />
                    <Icon
                      name="Search"
                      size={18}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    />
                  </div>
                </form>
                
                {showSuggestions && (
                  <SearchSuggestions
                    searchQuery={searchQuery}
                    onSuggestionClick={handleSuggestionClick}
                  />
                )}
                
                <SearchHistory
                  isOpen={isSearchHistoryOpen}
                  onClose={() => setIsSearchHistoryOpen(false)}
                  onHistorySelect={handleHistorySelect}
                />
              </div>
            </div>
            
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Button
                  variant="outline"
                  onClick={() => setIsFiltersOpen(true)}
                  className="lg:hidden w-full sm:w-auto"
                >
                  <Icon name="Filter" size={16} className="mr-2" />
                  Filter
                </Button>
                
                <div className="w-full sm:w-auto">
                  <SortOptions
                    currentSort={currentSort}
                    onSortChange={handleSortChange}
                    isMobile={true}
                  />
                </div>
              </div>
              
              <div className="hidden lg:block">
                <SortOptions
                  currentSort={currentSort}
                  onSortChange={handleSortChange}
                  isMobile={false}
                />
              </div>
            </div>
          </div>
          
          <div className="flex gap-8">
            {/* Desktop Filters Sidebar */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <SearchFilters
                isOpen={true}
                filters={filters}
                onFiltersChange={handleFiltersChange}
                isMobile={false}
              />
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Mencari produk...</p>
                  </div>
                </div>
              ) : totalResults === 0 ? (
                <NoResults
                  searchQuery={searchQuery}
                  onSearchSuggestion={handleSuggestionClick}
                />
              ) : (
                <>
                  {/* Results Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        searchQuery={searchQuery}
                      />
                    ))}
                  </div>
                  
                  {/* Load More */}
                  {filteredProducts.length >= 12 && (
                    <div className="text-center mt-12">
                      <Button
                        variant="outline"
                        size="lg"
                        className="min-w-[200px]"
                      >
                        <Icon name="RotateCcw" size={16} className="mr-2" />
                        Muat Lebih Banyak
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Mobile Filters */}
      <SearchFilters
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        isMobile={true}
      />
    </div>
  );
};

export default SearchResults;