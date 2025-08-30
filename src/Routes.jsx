import React from "react";
import {
  BrowserRouter,
  Routes as RouterRoutes,
  Route,
  Navigate,
} from "react-router-dom";
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
import OrderTimeline from "pages/order-history"; // import komponen baru
import ProfilePage from "pages/profile-page";
import NotificationPage from "pages/notification-page";
import SettingPage from "pages/setting-page";
import LoginPage from "pages/login-page";
import DashboardPage from "pages/dashboard";
import { getUserFromToken } from "./utils/storage";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = getUserFromToken();

  // if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role))
    return <Navigate to="/NotFound" replace />;

  return children;
};

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your routes here */}
          <Route path="/" element={<Homepage />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="/product-catalog" element={<ProductCatalog />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/contact-inquiry" element={<ContactInquiry />} />
          <Route path="/company-information" element={<CompanyInformation />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/order-history" element={<OrderTimeline />} />
          <Route path="/profile-page" element={<ProfilePage />} />
          <Route path="/notification-page" element={<NotificationPage />} />
          <Route
            path="/setting-page"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <SettingPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
