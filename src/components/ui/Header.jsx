import Icon from "../AppIcon";
import Button from "./Button";
import Input from "./Input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NotificationContext } from "../../context/NotificationContext";
import { getUserFromToken } from "../../utils/storage";
import React, { useState, useContext, useEffect } from "react";
import { infoService } from "../../api/infoService"; // import API service
import { userService } from "../../api/userService";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Header = () => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate(); // <- ini yang kamu butuhkan
  const { notifications } = useContext(NotificationContext);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const user = getUserFromToken();

  const userRole = user?.role || "guest"; // fallback kalau tidak ada token

  // Helper function untuk bikin initials
  const getInitials = (name) => {
    if (!name) return "";
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  const mockProfile = {
    user_id: "",
    name: "",
    email: "",
    phone: "",
    address: {
      location: "",
      street: "",
      city: "",
      district: "",
      subDistrict: "",
    },
    photo_url: "",
    lat: 0,
    lang: 0,
    is_active: false,
  };

  // ====================== Helper mapping API user ke Profile ======================
  const mapUserToProfile = (_user) => ({
    user_id: _user.id,
    name: _user.name,
    email: _user.email,
    phone: _user.phone,
    photo_url: _user.photo_url,
    lat: _user.lat,
    lang: _user.lang,
    is_active: _user.is_active,
    address: {
      location: _user.address || "",
      street: "",
      city: "",
      district: "",
      subDistrict: "",
    },
  });

  // ====================== Cek perbedaan profile ======================
  const isProfileDifferent = (localUser, apiUser) => {
    if (!localUser || !apiUser) return true;
    return (
      localUser.name !== apiUser.name ||
      localUser.email !== apiUser.email ||
      localUser.address !== apiUser.address ||
      String(localUser.lat) !== String(apiUser.lat) ||
      String(localUser.lang) !== String(apiUser.lang) ||
      (localUser.photo_url || "") !== (apiUser.photo_url || "")
    );
  };

  // ====================== Load user from token + sync with API ======================
  useEffect(() => {
    const initProfile = async () => {
      const localUser = getUserFromToken();

      if (!localUser?.user_id) return;

      try {
        const res = await userService.getUserByID(localUser.user_id);
        const apiUser = res.data.token;
        const _user = res.data.user;

        if (isProfileDifferent(localUser, apiUser)) {
          localStorage.removeItem("jwt");
          saveToken(apiUser);
        }

        setProfile(mapUserToProfile(_user));
      } catch (error) {
        console.error("Gagal sinkronisasi user:", error.message);
        setProfile({
          ...mockProfile,
          ...localUser,
          address: {
            location: localUser.address || "",
            street: "",
            city: "",
            district: "",
            subDistrict: "",
          },
        });
      }
    };

    initProfile();
  }, []);

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    try {
      const response = await infoService.getInfo();
      if (response?.data) {
        setInfo(response.data);
      }
    } catch (err) {
      console.error("Error fetching info:", err);
    } finally {
      setLoading(false);
    }
  };

  // Avatar component
  const Avatar = ({ user, size = 32 }) => {
    const style = `w-${size} h-${size} rounded-full flex items-center justify-center bg-blue-500 text-white font-semibold`;

    if (_user.photo_url) {
      return (
        <img
          src={`${BASE_URL}/${user.photo_url}`}
          alt={user.name || "Avatar"}
          className={`w-${size} h-${size} rounded-full object-cover`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/assets/images/avatar.png";
          }}
        />
      );
    } else {
      // Tampilkan initials
      return <div className={style}>{getInitials(user.name)}</div>;
    }

    // Default avatar untuk guest atau inactive
    return (
      <img
        src="/assets/images/avatar.png"
        alt="Default Avatar"
        className={`w-${size} h-${size} rounded-full object-cover`}
      />
    );
  };

  const navigationItems = [
    {
      label: "Beranda",
      path: "/homepage",
      icon: "Home",
      roles: ["guest", "user"],
    },
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: "Dashboard",
      roles: ["admin"],
    },
    {
      label: "Notifikasi",
      path: "/notification-page",
      icon: "Bell",
      roles: ["guest", "user"],
    },
    {
      label: "Katalog Produk",
      path: "/product-catalog",
      icon: "Package",
      roles: ["guest", "user"],
    },
    {
      label: "Riwayat Orderan",
      path: "/order-history",
      icon: "ShoppingCart",
      roles: ["guest", "user"],
    },
    {
      label: "Tentang Kami",
      path: "/company-information",
      icon: "Building2",
      roles: ["guest", "user"],
    },
    {
      label: "Setting",
      path: "/setting-page",
      icon: "Tools",
      roles: ["admin"],
    },
  ];

  const filteredNavigationItems = navigationItems.filter((item) =>
    item.roles.includes(userRole)
  );

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search-results?q=${encodeURIComponent(
        searchQuery
      )}`;
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleAvatarClick = () => {
    if (user) {
      navigate("/profile-page"); // user sudah login
    } else {
      navigate("/login"); // user belum login
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/homepage" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                {!loading && (
                  <img
                    src={
                      info?.image_path
                        ? `${BASE_URL}/${info.image_path}`
                        : "/assets/images/logo.png"
                    }
                    alt="Logo"
                    className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
                  />
                )}
              </div>
              <div>
                <h1 className="text-base sm:text-xl font-heading font-bold text-foreground">
                  {info?.name || "Meisha Aluminium"}
                </h1>
                <p className="text-xs font-caption text-muted-foreground">
                  {info?.detail || "Meisha Aluminium Kaca"}
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {filteredNavigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-micro ${
                    isActivePath(item.path)
                      ? "text-primary bg-muted"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {item.label === "Notifikasi" ? (
                    <div className="relative">
                      <Icon name={item.icon} size={16} />
                      {unreadCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                          {unreadCount}
                        </span>
                      )}
                    </div>
                  ) : (
                    <Icon name={item.icon} size={16} />
                  )}
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
              {isMobileMenuOpen ? (
                <Icon name="X" size={24} />
              ) : (
                <img
                  src="/assets/images/avatar.jpg"
                  alt="Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/images/avatar.png"; // fallback ke default
                  }}
                />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-mobile-menu lg:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={toggleMobileMenu}
          />
          <div className="fixed top-0 right-0 h-full w-80 max-w-full bg-card shadow-elevation-3 transform transition-transform duration-300">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div
                onClick={handleAvatarClick}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <Avatar user={user} size={32} />
                <span className="text-sm font-medium text-foreground">
                  Profil
                </span>
              </div>

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
                {filteredNavigationItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={toggleMobileMenu}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-micro ${
                        isActivePath(item.path)
                          ? "text-primary bg-muted"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      {item.label === "Notifikasi" ? (
                        <div className="relative">
                          <Icon name={item.icon} size={20} />
                          {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                              {unreadCount}
                            </span>
                          )}
                        </div>
                      ) : (
                        <Icon name={item.icon} size={20} />
                      )}
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
                  onClick={() =>
                    window.open("https://wa.me/6281224591336", "_blank")
                  }
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
