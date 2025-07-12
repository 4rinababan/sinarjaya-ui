import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const SearchSuggestions = ({ searchQuery, onSuggestionClick }) => {
  const suggestions = [
    {
      type: 'correction',
      text: 'kusen aluminum',
      original: searchQuery,
      results: 45
    },
    {
      type: 'product',
      text: 'Kusen Aluminum Putih',
      category: 'Kusen',
      price: 'Rp 850.000'
    },
    {
      type: 'product',
      text: 'Kusen Aluminum Coklat',
      category: 'Kusen',
      price: 'Rp 920.000'
    },
    {
      type: 'category',
      text: 'Pintu Aluminum',
      results: 32
    },
    {
      type: 'category',
      text: 'Jendela Aluminum',
      results: 28
    }
  ];

  const popularSearches = [
    'kusen aluminum',
    'pintu sliding',
    'jendela casement',
    'partisi kantor',
    'railing tangga',
    'canopy minimalis'
  ];

  if (!searchQuery || searchQuery.length < 2) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-4">
        <h3 className="text-sm font-medium text-foreground mb-3">
          Pencarian Populer
        </h3>
        <div className="space-y-2">
          {popularSearches.map((search, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick(search)}
              className="flex items-center space-x-3 w-full text-left p-2 rounded-md hover:bg-muted transition-micro"
            >
              <Icon name="TrendingUp" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">{search}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-4">
      <div className="space-y-1">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion.text)}
            className="flex items-center justify-between w-full text-left p-2 rounded-md hover:bg-muted transition-micro"
          >
            <div className="flex items-center space-x-3">
              {suggestion.type === 'correction' && (
                <Icon name="Search" size={16} className="text-muted-foreground" />
              )}
              {suggestion.type === 'product' && (
                <Icon name="Package" size={16} className="text-muted-foreground" />
              )}
              {suggestion.type === 'category' && (
                <Icon name="Grid3X3" size={16} className="text-muted-foreground" />
              )}
              
              <div className="flex-1">
                <div className="text-sm text-foreground">
                  {suggestion.type === 'correction' ? (
                    <>
                      Maksud Anda: <span className="font-medium">{suggestion.text}</span>
                    </>
                  ) : (
                    suggestion.text
                  )}
                </div>
                {suggestion.category && (
                  <div className="text-xs text-muted-foreground">
                    dalam {suggestion.category}
                  </div>
                )}
              </div>
            </div>
            
            <div className="text-right">
              {suggestion.price && (
                <div className="text-sm font-medium text-primary">
                  {suggestion.price}
                </div>
              )}
              {suggestion.results && (
                <div className="text-xs text-muted-foreground">
                  {suggestion.results} produk
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
      
      <div className="border-t border-border mt-3 pt-3">
        <Link
          to="/product-catalog"
          className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-micro"
        >
          <Icon name="ArrowRight" size={16} />
          <span>Lihat semua produk</span>
        </Link>
      </div>
    </div>
  );
};

export default SearchSuggestions;