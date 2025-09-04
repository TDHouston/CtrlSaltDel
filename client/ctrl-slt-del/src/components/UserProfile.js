import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import { API_ENDPOINTS } from "../config/api";
import AccountForm from "./AccountForm";
import MyRecipes from "./MyRecipes";
import ProfileRecipeCard from "./ProfileRecipeCard";

function UserProfile() {
    const [activeTab, setActiveTab] = useState("account");
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user, token } = useContext(AuthContext);

    // Load favorites when favorites tab is active
    useEffect(() => {
        if (activeTab === "favorites" && user?.userId) {
            loadFavorites();
        }
    }, [activeTab, user]);

    const loadFavorites = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `${API_ENDPOINTS.USER.BASE.replace('/user', '/favorite')}/${user.userId}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            const data = response.ok ? await response.json() : [];
            setFavorites(data);
        } catch (error) {
            console.error("Error loading favorites:", error);
        } finally {
            setLoading(false);
        }
    };

    const userTabs = [
        {
            key: "account",
            label: "Account Settings",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
            description: "Update your personal information and preferences"
        },
        {
            key: "recipes",
            label: "My Recipes",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            ),
            description: "View and manage your recipe collection"
        },
        {
            key: "favorites",
            label: "Favorites",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            ),
            description: "Your saved favorite recipes"
        }
    ];

    return (
        <div className="space-y-8">
            {/* Tab Navigation */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
                <div className="grid grid-cols-1 md:grid-cols-3">
                    {userTabs.map((tab, index) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`p-6 text-left transition-all duration-200 ${
                                activeTab === tab.key
                                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-l-4 border-blue-500'
                                    : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                            } ${index < userTabs.length - 1 ? 'border-r border-gray-200 dark:border-gray-700' : ''}`}
                        >
                            <div className="flex items-start space-x-4">
                                <div className={`p-3 rounded-xl transition-colors duration-200 ${
                                    activeTab === tab.key
                                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                                }`}>
                                    {tab.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className={`font-semibold transition-colors duration-200 ${
                                        activeTab === tab.key
                                            ? 'text-blue-900 dark:text-blue-100'
                                            : 'text-gray-900 dark:text-white'
                                    }`}>
                                        {tab.label}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                        {tab.description}
                                    </p>
                                </div>
                                {activeTab === tab.key && (
                                    <div className="flex-shrink-0">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                {/* Account Settings Tab */}
                {activeTab === "account" && (
                    <div className="p-8">
                        <div className="max-w-3xl mx-auto">
                            <div className="flex items-center space-x-4 mb-8">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Account Settings
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Manage your profile information and account preferences
                                    </p>
                                </div>
                            </div>
                            
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6">
                                <AccountForm account={user} />
                            </div>
                        </div>
                    </div>
                )}

                {/* My Recipes Tab */}
                {activeTab === "recipes" && (
                    <div className="p-8">
                        <div className="flex items-center space-x-4 mb-8">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    My Recipe Collection
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Create, edit, and manage your personal recipes
                                </p>
                            </div>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6">
                            <MyRecipes />
                        </div>
                    </div>
                )}

                {/* Favorites Tab */}
                {activeTab === "favorites" && (
                    <div className="p-8">
                        <div className="flex items-center space-x-4 mb-8">
                            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Favorite Recipes
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Your collection of saved favorite recipes
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                                    {favorites.length}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {favorites.length === 1 ? 'Favorite' : 'Favorites'}
                                </div>
                            </div>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, index) => (
                                    <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 animate-pulse">
                                        <div className="h-48 bg-gray-300 dark:bg-gray-600 rounded-lg mb-4"></div>
                                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                                    </div>
                                ))}
                            </div>
                        ) : favorites.length === 0 ? (
                            <div className="text-center py-16 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                                <div className="w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-12 h-12 text-red-400 dark:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    No favorites yet
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                                    Start exploring recipes and save your favorites by clicking the heart icon on any recipe you love!
                                </p>
                                <button
                                    onClick={() => window.location.href = '/explore'}
                                    className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors duration-200"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    Explore Recipes
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {favorites.map((recipe) => (
                                    <ProfileRecipeCard
                                        key={recipe.recipeId}
                                        recipe={recipe}
                                        showActions={false}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserProfile;