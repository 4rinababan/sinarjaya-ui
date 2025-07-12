import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const CategorySection = () => {
  const categories = [
    {
      id: 1,
      name: "Profil Aluminum",
      description: "Berbagai jenis profil untuk konstruksi",
      image: "https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=800",
      productCount: 45,
      icon: "Building2"
    },
    {
      id: 2,
      name: "Kusen & Jendela",
      description: "Kusen dan jendela aluminum berkualitas",
      image: "https://images.pixabay.com/photo/2017/03/22/17/39/kitchen-2165756_1280.jpg",
      productCount: 32,
      icon: "Home"
    },
    {
      id: 3,
      name: "Pintu Aluminum",
      description: "Pintu aluminum untuk rumah dan kantor",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      productCount: 28,
      icon: "DoorOpen"
    },
    {
      id: 4,
      name: "Partisi & Dinding",
      description: "Sistem partisi aluminum modern",
      image: "https://images.pexels.com/photos/6782567/pexels-photo-6782567.jpeg?auto=compress&cs=tinysrgb&w=800",
      productCount: 19,
      icon: "Grid3X3"
    },
    {
      id: 5,
      name: "Atap & Kanopi",
      description: "Solusi atap aluminum tahan cuaca",
      image: "https://images.pixabay.com/photo/2016/11/18/17/20/roof-1836758_1280.jpg",
      productCount: 23,
      icon: "Umbrella"
    },
    {
      id: 6,
      name: "Aksesoris",
      description: "Aksesoris pelengkap aluminum",
      image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      productCount: 67,
      icon: "Settings"
    }
  ];

  const handleCategoryClick = (categoryId) => {
    window.location.href = `/product-catalog?category=${categoryId}`;
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Kategori Produk
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Temukan berbagai kategori produk aluminum berkualitas tinggi untuk kebutuhan konstruksi dan renovasi Anda
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="group bg-card rounded-xl shadow-elevation-1 hover:shadow-elevation-2 transition-smooth cursor-pointer overflow-hidden border border-border"
            >
              {/* Category Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-smooth" />
                
                {/* Icon Overlay */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 rounded-lg flex items-center justify-center">
                  <Icon name={category.icon} size={24} className="text-primary" />
                </div>
              </div>

              {/* Category Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-heading font-semibold text-foreground group-hover:text-primary transition-micro">
                    {category.name}
                  </h3>
                  <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
                    {category.productCount} produk
                  </span>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {category.description}
                </p>

                {/* View Category Button */}
                <div className="flex items-center text-primary font-medium group-hover:text-primary/80 transition-micro">
                  <span className="mr-2">Lihat Produk</span>
                  <Icon 
                    name="ArrowRight" 
                    size={16} 
                    className="group-hover:translate-x-1 transition-smooth" 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Categories Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => window.location.href = '/product-catalog'}
            className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-smooth"
          >
            <span className="mr-2">Lihat Semua Kategori</span>
            <Icon name="ArrowRight" size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;