import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  // Restore user from localStorage on first load
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  // Restore token from localStorage on first load
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  // Sync token with localStorage
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  // Sync user with localStorage
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // Save user+token and redirect
  const login = (t, u) => {
    setToken(t);
    setUser(u);
    navigate("/");
  };

  // Clear auth and redirect
  const logout = () => {
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  // Check admin access
  const isAdmin = () => user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}
