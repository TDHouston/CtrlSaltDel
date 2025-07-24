import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUserState] = useState(null);
    const [token, setTokenState] = useState("");
    const [headers, setHeaders] = useState(null);

    // Load user and token from localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem("jwt_token");
        const storedUser = localStorage.getItem("user_data");

        if (storedToken && storedUser) {
            setTokenState(storedToken);
            setUserState(JSON.parse(storedUser));
            setHeaders({
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "application/json",
            });
        }
    }, []);

    // Persist user state to localStorage on update
    const setUser = (userData) => {
        setUserState(userData);
        if (userData) {
            localStorage.setItem("user_data", JSON.stringify(userData));
        } else {
            localStorage.removeItem("user_data");
        }
    };

    const setToken = (jwtToken) => {
        setTokenState(jwtToken);
        if (jwtToken) {
            localStorage.setItem("jwt_token", jwtToken);
        } else {
            localStorage.removeItem("jwt_token");
        }
    };

    const login = (jwtToken, userData) => {
        setToken(jwtToken);
        setUser(userData);
    };

    const logout = () => {
        setToken("");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, setUser, token, setToken, login, logout, headers }}
        >
            {children}
        </AuthContext.Provider>
    );
}
