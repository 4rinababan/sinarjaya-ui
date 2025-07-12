import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Homepage from "pages/homepage";
import ProductDetail from "pages/product-detail";
import ProductCatalog from "pages/product-catalog";
import SearchResults from "pages/search-results";
import ContactInquiry from "pages/contact-inquiry";
import CompanyInformation from "pages/company-information";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/product-detail" element={<ProductDetail />} />
        <Route path="/product-catalog" element={<ProductCatalog />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/contact-inquiry" element={<ContactInquiry />} />
        <Route path="/company-information" element={<CompanyInformation />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;