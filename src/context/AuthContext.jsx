// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

// Buat context
export const AuthContext = createContext();

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // data user login
  const [loading, setLoading] = useState(true);

  // Cek localStorage saat pertama kali render
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Function login
  const login = async (email, password) => {
    try {
      // biasanya panggil API login disini
      // contoh dummy
      const fakeResponse = {
        id: 1,
        name: "John Doe",
        email,
        role: "User",
        token: "fake-jwt-token",
      };

      setUser(fakeResponse);
      localStorage.setItem("user", JSON.stringify(fakeResponse));
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  // Function logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
