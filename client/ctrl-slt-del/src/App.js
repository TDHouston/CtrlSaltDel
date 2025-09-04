import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Nav from "./components/Nav";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Recipe from "./pages/Recipe";
import Explore from "./pages/Explore";
import AboutUs from "./pages/AboutUs";
import RecipeForm from "./pages/RecipeForm";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Footer from "./components/Footer";

function App() {
    return (
        <ThemeProvider>
            <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                    <Router>
                        <Nav />
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<Home />} />
                            <Route path="/explore" element={<Explore />} />
                            <Route path="/about" element={<AboutUs />} />
                            <Route path="/recipe/:id" element={<Recipe />} />
                            
                            {/* Login Route - redirects if already authenticated */}
                            <Route 
                                path="/login" 
                                element={
                                    <ProtectedRoute requiresAuth={false}>
                                        <Login />
                                    </ProtectedRoute>
                                } 
                            />
                            
                            {/* Protected Routes - require authentication */}
                            <Route 
                                path="/profile" 
                                element={
                                    <ProtectedRoute>
                                        <Profile />
                                    </ProtectedRoute>
                                } 
                            />
                            <Route 
                                path="/recipe/add" 
                                element={
                                    <ProtectedRoute>
                                        <RecipeForm />
                                    </ProtectedRoute>
                                } 
                            />
                            <Route 
                                path="/recipe/edit/:recipeId" 
                                element={
                                    <ProtectedRoute>
                                        <RecipeForm />
                                    </ProtectedRoute>
                                } 
                            />
                            
                            {/* Fallback Route */}
                            <Route path="*" element={<Error />} />
                        </Routes>
                        <Footer />
                    </Router>
                </div>
        </ThemeProvider>
    );
}

export default App;
