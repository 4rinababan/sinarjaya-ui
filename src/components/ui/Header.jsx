import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Icon from "../AppIcon";
import { getUserFromToken } from "../../utils/storage";
import { infoService } from "../../api/infoService";
import { userService } from "../../api/userService";
import { notificationService } from "../../api/notificationService";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Header = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [info, setInfo] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const mobileMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const user = getUserFromToken();
  const userRole = user?.role || "guest";
  // console.log(user);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const fetchUnreadNotifications = async () => {
    try {
      if (!user?.user_id) return;
      const response = await notificationService.getNotification(user.user_id);
      if (response?.status === 200 && Array.isArray(response.data)) {
        const count = response.data.filter((n) => !n.read).length;
        setUnreadCount(count);
      }
    } catch (err) {
      console.error("Error fetching unread notifications:", err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "";
    const words = name.trim().split(" ");
    return words.length === 1
      ? words[0][0].toUpperCase()
      : (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  useEffect(() => {
    fetchUnreadNotifications();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const infoResponse = await infoService.getInfo();
        if (infoResponse?.data) setInfo(infoResponse.data);

        if (user && user.user_id) {
          const userResponse = await userService.getUserByID(user.user_id);
          // console.log(userResponse);
          if (userResponse?.data) setUserData(userResponse.data.user);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target) &&
        !e.target.closest("#hamburger-btn")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

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

  const isActivePath = (path) => location.pathname === path;

  const Avatar = ({ size = 60 }) => {
    const baseClass = `rounded-full object-cover`;
    const style = { width: size, height: size };
    // console.log(userData);
    if (userData?.photo_url) {
      return (
        <img
          src={`${BASE_URL}/${userData.photo_url}`}
          alt={userData.name || "Avatar"}
          className={baseClass}
          style={style}
          onError={(e) => (e.target.src = "/assets/images/avatar.png")}
        />
      );
    }

    if (userData?.name) {
      return (
        <div
          className="rounded-full flex items-center justify-center bg-blue-500 text-white font-semibold"
          style={style}
        >
          {getInitials(userData.name)}
        </div>
      );
    }

    return (
      <img
        src="/assets/images/avatar.png"
        alt="Avatar"
        className={baseClass}
        style={style}
      />
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/homepage" className="flex items-center space-x-3">
            {!loading && (
              <img
                src={
                  info?.image_path
                    ? `${BASE_URL}/${info.image_path}`
                    : "/assets/images/logo.png"
                }
                alt="Logo"
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-md"
              />
            )}
            <div>
              <h1 className="text-lg font-bold text-foreground">
                {info?.name || "Meisha Aluminium"}
              </h1>
              <p className="text-xs text-muted-foreground">
                {info?.detail || "Meisha Aluminium Kaca"}
              </p>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            <button
              onClick={() => navigate("/notification-page")}
              className="relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700 hover:text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C8.67 6.165 8 7.388 8 9v5.159c0 .538-.214 1.055-.595 1.436L6 17h5m4 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Hamburger Button */}
            <button
              id="hamburger-btn"
              className="text-gray-700 hover:text-black"
              onClick={toggleMobileMenu}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed top-0 right-0 w-72 h-full bg-white shadow-lg z-50 p-4 flex flex-col space-y-6"
        >
          {/* Close Button */}
          <button
            className="self-end text-gray-600 hover:text-black"
            onClick={toggleMobileMenu}
          >
            ✕
          </button>

          {/* Avatar + Nama User */}
          <div className="flex flex-col items-center space-y-2">
            <div
              className="cursor-pointer"
              onClick={() => {
                if (userData) {
                  navigate("/profile-page");
                }
              }}
            >
              <Avatar size={70} />
            </div>
            <p className="text-lg font-semibold">{userData?.name || "Guest"}</p>
            <p className="text-sm text-gray-500">
              {userData?.email || "Belum login"}
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-3">
            {filteredNavigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-2 rounded-md text-base ${
                  isActivePath(item.path)
                    ? "text-primary bg-muted"
                    : "text-gray-700 hover:text-black hover:bg-gray-100"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          {user ? (
            // Jika user sudah login
            <button
              onClick={handleLogout}
              className="mt-auto bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            // Jika user belum login
            <button
              onClick={handleLogin}
              className="mt-auto bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
            >
              Login
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
