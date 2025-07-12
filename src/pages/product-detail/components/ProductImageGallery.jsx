import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductImageGallery = ({ images = [], productName = '' }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  if (!images.length) return null;

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative bg-muted rounded-lg overflow-hidden aspect-square">
        <Image
          src={images[currentImageIndex]?.url}
          alt={`${productName} - Gambar ${currentImageIndex + 1}`}
          className={`w-full h-full object-cover transition-transform duration-300 cursor-zoom-in ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
          onClick={toggleZoom}
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 w-10 h-10"
            >
              <Icon name="ChevronLeft" size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 w-10 h-10"
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
          {currentImageIndex + 1} / {images.length}
        </div>

        {/* Zoom Indicator */}
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleZoom}
            className="bg-white/80 hover:bg-white/90 w-10 h-10"
          >
            <Icon name={isZoomed ? "ZoomOut" : "ZoomIn"} size={18} />
          </Button>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentImageIndex
                  ? 'border-primary shadow-md'
                  : 'border-border hover:border-muted-foreground'
              }`}
            >
              <Image
                src={image.url}
                alt={`${productName} - Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;