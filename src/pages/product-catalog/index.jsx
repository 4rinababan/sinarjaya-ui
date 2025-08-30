import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/ui/Header";
import Breadcrumb from "../../components/ui/Breadcrumb";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import FilterPanel from "./components/FilterPanel";
import FilterChips from "./components/FilterChips";
import SortDropdown from "./components/SortDropdown";
import ProductGrid from "./components/ProductGrid";
import QuickInquiryModal from "./components/QuickInquiryModal";
import { productService } from "./../../api/productService"; // ✅ pakai service

const ProductCatalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState("relevance");
  const [viewMode, setViewMode] = useState("grid");
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [filters, setFilters] = useState({
    categories: [], // bisa nama / id (dari query param)
    materials: [],
    finishes: [],
    priceRange: { min: "", max: "" },
    inStock: false,
  });

  const [allProducts, setAllProducts] = useState([]); // semua produk dari API
  const [products, setProducts] = useState([]); // produk yg ditampilkan (paging)

  const breadcrumbItems = [
    { label: "Beranda", href: "/homepage" },
    { label: "Katalog Produk" },
  ];

  // helper: ambil nama kategori
  const getCategoryName = (product) =>
    typeof product.category === "string"
      ? product.category
      : product.category?.name || "";

  // 🔹 Fetch produk pakai productService
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await productService.getAll(); // bebas, bisa pagination di sini juga
        setAllProducts(res.data || []);
      } catch (err) {
        // console.error("Gagal fetch produk:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 🔹 Filtering
  const filterProducts = useCallback(
    (productList) => {
      let filtered = [...productList];

      // search query (nama produk / kategori)
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            (p.name || "").toLowerCase().includes(q) ||
            getCategoryName(p).toLowerCase().includes(q)
        );
      }

      // kategori filter (id atau nama)
      if (filters.categories.length > 0) {
        filtered = filtered.filter((p) =>
          filters.categories.some(
            (cat) =>
              String(cat) === String(p.category_id) ||
              cat.toLowerCase() === getCategoryName(p).toLowerCase()
          )
        );
      }

      // material
      if (filters.materials.length > 0) {
        filtered = filtered.filter((p) =>
          filters.materials.includes(p.material)
        );
      }

      // finish
      if (filters.finishes.length > 0) {
        filtered = filtered.filter((p) => filters.finishes.includes(p.finish));
      }

      // price range
      if (filters.priceRange.min || filters.priceRange.max) {
        filtered = filtered.filter((p) => {
          const min = filters.priceRange.min
            ? parseInt(filters.priceRange.min, 10)
            : 0;
          const max = filters.priceRange.max
            ? parseInt(filters.priceRange.max, 10)
            : Infinity;
          const price = Number(p.price || 0);
          return price >= min && price <= max;
        });
      }

      // stock
      if (filters.inStock) {
        filtered = filtered.filter((p) => (p.stock || 0) > 0);
      }

      return filtered;
    },
    [searchQuery, filters]
  );

  // 🔹 Sorting
  const sortProducts = useCallback(
    (list) => {
      const sorted = [...list];
      switch (currentSort) {
        case "price-low":
          return sorted.sort(
            (a, b) => Number(a.price || 0) - Number(b.price || 0)
          );
        case "price-high":
          return sorted.sort(
            (a, b) => Number(b.price || 0) - Number(a.price || 0)
          );
        case "popularity":
          return sorted.sort(
            (a, b) => Number(b.rating || 0) - Number(a.rating || 0)
          );
        case "newest":
          return sorted.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
        case "name-asc":
          return sorted.sort((a, b) =>
            (a.name || "").localeCompare(b.name || "")
          );
        case "name-desc":
          return sorted.sort((a, b) =>
            (b.name || "").localeCompare(a.name || "")
          );
        default:
          return sorted;
      }
    },
    [currentSort]
  );

  // 🔹 Pagination logic
  const loadProducts = useCallback(
    (page = 1, reset = false) => {
      const filtered = filterProducts(allProducts);
      const sorted = sortProducts(filtered);

      const itemsPerPage = 12;
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const pageProducts = sorted.slice(startIndex, endIndex);

      if (reset) {
        setProducts(pageProducts);
      } else {
        setProducts((prev) => [...prev, ...pageProducts]);
      }

      setHasMore(endIndex < sorted.length);
    },
    [allProducts, filterProducts, sortProducts]
  );

  // reload saat filter / sort berubah
  useEffect(() => {
    setCurrentPage(1);
    loadProducts(1, true);
  }, [allProducts, filters, searchQuery, currentSort, loadProducts]);

  // 🔹 sync search param `q`
  useEffect(() => {
    const query = searchParams.get("q");
    if (query) setSearchQuery(query);
  }, [searchParams]);

  // 🔹 sync search param `category`
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setFilters((prev) => ({ ...prev, categories: [categoryParam] }));
    }
  }, [searchParams]);

  // 🔹 handler
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) setSearchParams({ q: searchQuery });
    else setSearchParams({});
  };

  const handleFiltersChange = (newFilters) => setFilters(newFilters);

  const handleRemoveFilter = (type, value) => {
    const newFilters = { ...filters };
    switch (type) {
      case "category":
        newFilters.categories = newFilters.categories.filter(
          (c) => c !== value
        );
        break;
      case "material":
        newFilters.materials = newFilters.materials.filter((m) => m !== value);
        break;
      case "finish":
        newFilters.finishes = newFilters.finishes.filter((f) => f !== value);
        break;
      case "priceRange":
        newFilters.priceRange = { min: "", max: "" };
        break;
      case "inStock":
        newFilters.inStock = false;
        break;
      default:
        break;
    }
    setFilters(newFilters);
  };

  const handleClearAllFilters = () => {
    setFilters({
      categories: [],
      materials: [],
      finishes: [],
      priceRange: { min: "", max: "" },
      inStock: false,
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

  const totalProducts = filterProducts(allProducts).length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} />
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
              Katalog Produk Aluminium
            </h1>
            <p className="text-muted-foreground">
              Temukan berbagai produk Aluminium berkualitas tinggi untuk
              kebutuhan konstruksi dan industri Anda.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <form onSubmit={handleSearch} className="max-w-2xl">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Cari produk Aluminium ..."
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
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-none border-0"
                    >
                      <Icon name="Grid3X3" size={16} />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
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
                    {loading ? "Memuat..." : "Muat Lebih Banyak"}
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
