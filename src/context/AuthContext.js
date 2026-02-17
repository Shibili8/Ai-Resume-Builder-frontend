import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("authToken") || "");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Save token in localStorage
  const login = (jwtToken, userData = null) => {
    setToken(jwtToken);
    localStorage.setItem("authToken", jwtToken);
    setUser(userData);
  };

  // Clear token
  const logout = () => {
    setToken("");
    localStorage.removeItem("authToken");
    setUser(null);
  };

  // Keep user logged in on refresh (optional)
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) setToken(storedToken);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        login,
        logout,
        user,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;