import React from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import CategorySection from './components/CategorySection';
import CompanyOverview from './components/CompanyOverview';
import FeaturedProducts from './components/FeaturedProducts';
import TestimonialSection from './components/TestimonialSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main Content */}
      <main className="pt-16">
        <HeroSection />
        <CategorySection />
        <CompanyOverview />
        <FeaturedProducts />
        <TestimonialSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;