import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./helpers/AuthContext";
import { RecipeProvider } from "./helpers/RecipeContext";
import ErrorBoundary from "./components/ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <ErrorBoundary>
                <RecipeProvider>
                    <App />
                </RecipeProvider>
            </ErrorBoundary>
        </AuthProvider>
    </React.StrictMode>
);
