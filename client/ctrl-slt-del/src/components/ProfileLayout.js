import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { API_ENDPOINTS } from "../config/api";
import { useUserStats } from "../hooks/useUserStats";
import ProfileHeader from "./ProfileHeader";
import UserStats from "./UserStats";
import UserProfile from "./UserProfile";
import AdminDashboard from "./AdminDashboard";

function ProfileLayout() {
    const [user, setUser] = useState(null);
    const [activeView, setActiveView] = useState("profile");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user: currentUser, token } = useContext(AuthContext);
    const navigate = useNavigate();

    // Get user stats using custom hook
    const { stats: userStats, loading: statsLoading } = useUserStats(user, token);

    // Authentication and user data loading
    useEffect(() => {
        const loadUserData = async () => {
            if (!currentUser || !token) {
                navigate('/login');
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(API_ENDPOINTS.USER.BY_ID(currentUser.userId), {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    if (response.status === 401 || response.status === 403) {
                        navigate('/login');
                        return;
                    }
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const userData = await response.json();
                setUser(userData);
            } catch (err) {
                console.error("User fetch error:", err);
                setError(err.message);
                if (err.message.includes('401') || err.message.includes('403')) {
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        loadUserData();
    }, [currentUser, token, navigate]);

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="space-y-8">
                        {/* Profile Header Skeleton */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div className="h-32 bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
                            <div className="px-8 pb-8">
                                <div className="flex items-end space-x-6 -mt-12 relative z-10">
                                    <div className="w-24 h-24 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
                                    <div className="flex-1 mt-4">
                                        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mb-2 w-64"></div>
                                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-48"></div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="text-center">
                                            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mb-2"></div>
                                            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Content Skeleton */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
                            <div className="h-64 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
                <div className="max-w-md mx-auto text-center">
                    <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Something went wrong
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        We couldn't load your profile. Please try refreshing the page.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors duration-200"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0V9a8 8 0 1115.356 2M15 15v4h5m-5-4a8 8 0 01-15.356 2" />
                        </svg>
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-8">
                    {/* Profile Header */}
                    <ProfileHeader 
                        user={user} 
                        userStats={userStats} 
                        isLoading={statsLoading} 
                    />

                    {/* User Stats */}
                    <UserStats 
                        stats={userStats} 
                        isLoading={statsLoading} 
                    />

                    {/* View Toggle (Only show for admins) */}
                    {user?.role === "ADMIN" && (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
                            <div className="flex items-center justify-center">
                                <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-1 flex space-x-1">
                                    <button
                                        onClick={() => setActiveView("profile")}
                                        className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                            activeView === "profile"
                                                ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                                                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                        }`}
                                    >
                                        <span className="flex items-center space-x-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <span>My Profile</span>
                                        </span>
                                    </button>
                                    <button
                                        onClick={() => setActiveView("admin")}
                                        className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                            activeView === "admin"
                                                ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                                                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                        }`}
                                    >
                                        <span className="flex items-center space-x-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                            <span>Admin Panel</span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Main Content */}
                    {activeView === "profile" ? (
                        <UserProfile />
                    ) : (
                        user?.role === "ADMIN" && <AdminDashboard />
                    )}

                    {/* Quick Actions (Floating Action Button for mobile) */}
                    <div className="fixed bottom-6 right-6 md:hidden">
                        <button
                            onClick={() => window.location.href = '/recipe/add'}
                            className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl text-white flex items-center justify-center transition-all duration-300 hover:scale-105"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileLayout;