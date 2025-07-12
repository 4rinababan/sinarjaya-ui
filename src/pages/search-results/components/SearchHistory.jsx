import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchHistory = ({ isOpen, onClose, onHistorySelect }) => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    // Load search history from localStorage
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  const addToHistory = (query) => {
    if (!query || query.trim().length < 2) return;
    
    const newHistory = [
      query,
      ...searchHistory.filter(item => item !== query)
    ].slice(0, 10); // Keep only last 10 searches
    
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const removeFromHistory = (query) => {
    const newHistory = searchHistory.filter(item => item !== query);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const handleHistoryClick = (query) => {
    onHistorySelect(query);
    onClose();
  };

  if (!isOpen || searchHistory.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-elevation-2 z-20 overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b border-border">
        <h3 className="text-sm font-medium text-foreground">
          Riwayat Pencarian
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearHistory}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          Hapus Semua
        </Button>
      </div>
      
      <div className="max-h-64 overflow-y-auto">
        {searchHistory.map((query, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 hover:bg-muted transition-micro group"
          >
            <button
              onClick={() => handleHistoryClick(query)}
              className="flex items-center space-x-3 flex-1 text-left"
            >
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">{query}</span>
            </button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeFromHistory(query)}
              className="opacity-0 group-hover:opacity-100 transition-micro w-6 h-6"
            >
              <Icon name="X" size={14} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;