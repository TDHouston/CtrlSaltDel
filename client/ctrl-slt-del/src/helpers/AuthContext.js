import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("jwt_token") || "");

  useEffect(() => {
    const storedToken = localStorage.getItem("jwt_token");
    const storedUser = localStorage.getItem("user_data");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (jwtToken, userData) => {
    localStorage.setItem("jwt_token", jwtToken);
    localStorage.setItem("user_data", JSON.stringify(userData));
    setToken(jwtToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user_data");
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, setToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
