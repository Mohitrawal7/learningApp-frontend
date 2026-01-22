import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for token on initial load
    const token = localStorage.getItem("jwtToken");
    if (token) {
      api
        .get("/api/auth/me")
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          // Token is invalid or expired
          localStorage.removeItem("jwtToken");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false); // No token, stop loading
    }
  }, []);

  const login = async (credentials) => {
    const response = await api.post("/api/auth/login", credentials);
    const { jwtToken } = response.data;
    localStorage.setItem("jwtToken", jwtToken);

    // Fetch user data after setting token
    const userResponse = await api.get("/api/auth/me");
    setUser(userResponse.data);
console.log("User logged in:", userResponse.data);
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setUser(null);
    navigate("/home");
  };

  return (
    <AuthContext.Provider
      value={{ user,setUser, login, logout, isAuthenticated: !!user }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
