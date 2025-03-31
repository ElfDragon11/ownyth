import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

import { useState, useEffect } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is authenticated (e.g., stored session token)
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch("/ownyth/server/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      // Log raw response before parsing
      const text = await response.text();
      //console.log("Raw Response:", text);

      try {
        const result = JSON.parse(text); // Convert to JSON safely
        if (result.success) {
          localStorage.setItem("authToken", result.token);
          setIsAuthenticated(true);
        }
        return result.success;
      } catch (jsonError) {
        console.error("Invalid JSON received from server:", text);
        return false;
      }
      
      /*const result = await response.json();
      if (result.success) {
        localStorage.setItem("authToken", result.token); // Store auth token
        setIsAuthenticated(true);
      }
        
      return result.success;
      */
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken"); // Clear stored auth
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
};
