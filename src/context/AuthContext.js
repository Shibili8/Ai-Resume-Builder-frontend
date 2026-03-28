import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(
    localStorage.getItem("authToken") || null
  );

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);

  // Login function
  const login = (jwtToken, userData = null) => {
    setToken(jwtToken);
    localStorage.setItem("authToken", jwtToken);

    if (userData) {
      setUser(userData);
    }
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setUser(null);

    localStorage.removeItem("authToken");
  };

  // Keep user logged in after refresh
  useEffect(() => {

    const storedToken =
      localStorage.getItem("authToken");

    if (storedToken) {
      setToken(storedToken);
    }

    setLoading(false);

  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        user,
        loading,
        setLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;