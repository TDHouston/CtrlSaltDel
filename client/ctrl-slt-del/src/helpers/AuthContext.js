import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    console.log("AuthContext token changed:", token);
    if (token) {
      const decoded = jwtDecode(token);
      console.log("Decoded user from token:", decoded);
      setUser(decoded);
    } else {
      console.log("No token, setting user to null");
      setUser(null);
    }
  }, [token]);

  const login = (token, user) => {
    localStorage.setItem("jwt_token", token);
    setAuth({
      token,
      user,
      roles: user?.roles || [], // or decode from token if needed
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken("");
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, setToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
