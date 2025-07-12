import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const navigationItems = [
    { label: 'Beranda', path: '/homepage', icon: 'Home' },
    { label: 'Katalog Produk', path: '/product-catalog', icon: 'Package' },
    { label: 'Tentang Kami', path: '/company-information', icon: 'Building2' },
    { label: 'Kontak', path: '/contact-inquiry', icon: 'Phone' }
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search-results?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/homepage" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <img
                    src="/assets/images/logo.png" // atau bisa juga pakai URL
                    alt="Logo"
                    className="w-6 h-6 object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-heading font-bold text-foreground">
                  Sinar Jaya Aluminum
                </h1>
                <p className="text-xs font-caption text-muted-foreground">
                  Solusi Alumunium
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-micro ${
                    isActivePath(item.path)
                      ? 'text-primary bg-muted' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon name={item.icon} size={16} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Cari produk aluminum..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4"
                  />
                  <Icon
                    name="Search"
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  />
                </div>
              </form>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="lg:hidden"
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-mobile-menu lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={toggleMobileMenu} />
          <div className="fixed top-0 right-0 h-full w-80 max-w-full bg-card shadow-elevation-3 transform transition-transform duration-300">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-heading font-semibold text-foreground">
                Menu
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                aria-label="Close menu"
              >
                <Icon name="X" size={24} />
              </Button>
            </div>

            {/* Mobile Search */}
            <div className="p-4 border-b border-border md:hidden">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Cari produk aluminum..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4"
                  />
                  <Icon
                    name="Search"
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  />
                </div>
              </form>
            </div>

            {/* Mobile Navigation */}
            <nav className="p-4">
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={toggleMobileMenu}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-micro ${
                        isActivePath(item.path)
                          ? 'text-primary bg-muted' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Icon name={item.icon} size={20} />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Contact Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-muted/30">
              <div className="text-center">
                <p className="text-sm font-caption text-muted-foreground mb-2">
                  Hubungi Kami
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => window.open('https://wa.me/6281234567890', '_blank')}
                >
                  <Icon name="MessageCircle" size={16} className="mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;