import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import { API_ENDPOINTS } from "../config/api";
import UserCard from "./UserCard";

function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("overview");
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [allRecipes, setAllRecipes] = useState([]);
    const [moderatorPicks, setModeratorPicks] = useState(() => {
        const saved = localStorage.getItem("moderatorPicks");
        return saved ? JSON.parse(saved) : [];
    });
    const [loading, setLoading] = useState(false);
    const [adminStats, setAdminStats] = useState({
        totalUsers: 0,
        totalRecipes: 0,
        totalCategories: 0,
        activeUsers: 0
    });

    const { user: currentUser, token } = useContext(AuthContext);

    // Load admin overview stats
    useEffect(() => {
        if (activeTab === "overview") {
            loadAdminStats();
        }
    }, [activeTab]);

    // Load users when users tab is active
    useEffect(() => {
        if (activeTab === "users") {
            loadUsers();
        }
    }, [activeTab]);

    // Load categories when categories tab is active
    useEffect(() => {
        if (activeTab === "categories") {
            loadCategories();
        }
    }, [activeTab]);

    // Load recipes when moderator tab is active
    useEffect(() => {
        if (activeTab === "moderator") {
            loadAllRecipes();
        }
    }, [activeTab]);

    const loadAdminStats = async () => {
        setLoading(true);
        try {
            const [usersRes, recipesRes, categoriesRes] = await Promise.all([
                fetch(API_ENDPOINTS.USER.BASE, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }),
                fetch(API_ENDPOINTS.RECIPES.BASE, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }),
                fetch(`${API_ENDPOINTS.USER.BASE.replace('/user', '/category')}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })
            ]);

            const usersData = usersRes.ok ? await usersRes.json() : [];
            const recipesData = recipesRes.ok ? await recipesRes.json() : [];
            const categoriesData = categoriesRes.ok ? await categoriesRes.json() : [];

            setAdminStats({
                totalUsers: usersData.length,
                totalRecipes: recipesData.length,
                totalCategories: categoriesData.length,
                activeUsers: usersData.filter(u => u.role === "USER").length
            });
        } catch (error) {
            console.error("Error loading admin stats:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_ENDPOINTS.USER.BASE, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            const data = response.ok ? await response.json() : [];
            setUsers(data);
        } catch (error) {
            console.error("Error loading users:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadCategories = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_ENDPOINTS.USER.BASE.replace('/user', '/category')}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            const data = response.ok ? await response.json() : [];
            setCategories(data);
        } catch (error) {
            console.error("Error loading categories:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadAllRecipes = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_ENDPOINTS.RECIPES.BASE, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            const data = response.ok ? await response.json() : [];
            setAllRecipes(data);
        } catch (error) {
            console.error("Error loading recipes:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId) => {
        const userToDelete = users.find(u => u.userId === userId);
        if (!window.confirm(`Remove user ${userToDelete.username}? This action cannot be undone!`)) {
            return;
        }

        try {
            const response = await fetch(API_ENDPOINTS.USER.BY_ID(userId), {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 204) {
                setUsers(prev => prev.filter(u => u.userId !== userId));
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user. Please try again.");
        }
    };

    const handlePromoteToAdmin = async (userId) => {
        const selected = users.find(u => u.userId === userId);
        if (!window.confirm(`Promote ${selected.username} to admin?`)) {
            return;
        }

        const toUpdate = {
            userId: selected.userId,
            firstName: selected.firstName,
            lastName: selected.lastName,
            username: selected.username,
            email: selected.email,
            password: selected.password,
            role: "ADMIN",
        };

        try {
            const response = await fetch(API_ENDPOINTS.USER.UPDATE(userId), {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(toUpdate)
            });

            if (response.status === 204) {
                setUsers(prev => prev.map(u => 
                    u.userId === userId ? { ...u, role: "ADMIN" } : u
                ));
            }
        } catch (error) {
            console.error("Error promoting user:", error);
            alert("Failed to promote user. Please try again.");
        }
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (!newCategory.trim()) return;

        try {
            const response = await fetch(`${API_ENDPOINTS.USER.BASE.replace('/user', '/category')}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: newCategory })
            });

            const newCat = await response.json();
            setCategories(prev => [...prev, newCat]);
            setNewCategory("");
        } catch (error) {
            console.error("Error adding category:", error);
            alert("Failed to add category. Please try again.");
        }
    };

    const handleDeleteCategory = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) {
            return;
        }

        try {
            const response = await fetch(`${API_ENDPOINTS.USER.BASE.replace('/user', '/category')}/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                setCategories(prev => prev.filter(c => c.categoryId !== id));
            }
        } catch (error) {
            console.error("Error deleting category:", error);
            alert("Failed to delete category. Please try again.");
        }
    };

    const toggleModeratorPick = (recipeId) => {
        let updated;
        if (moderatorPicks.includes(recipeId)) {
            updated = moderatorPicks.filter(id => id !== recipeId);
        } else {
            if (moderatorPicks.length >= 3) {
                alert("You can only select up to 3 moderator picks.");
                return;
            }
            updated = [...moderatorPicks, recipeId];
        }
        setModeratorPicks(updated);
        localStorage.setItem("moderatorPicks", JSON.stringify(updated));
    };

    const adminTabs = [
        { key: "overview", label: "Overview", icon: "📊" },
        { key: "users", label: "User Management", icon: "👥" },
        { key: "categories", label: "Categories", icon: "🏷️" },
        { key: "moderator", label: "Moderator Picks", icon: "⭐" }
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
            {/* Admin Header */}
            <div className="border-b border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Admin Dashboard
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Manage users, content, and platform settings
                        </p>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex space-x-8 px-6" aria-label="Admin tabs">
                    {adminTabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors duration-200 ${
                                activeTab === tab.key
                                    ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                            }`}
                        >
                            <span>{tab.icon}</span>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
                {loading && (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                    </div>
                )}

                {/* Overview Tab */}
                {activeTab === "overview" && !loading && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-blue-100">Total Users</p>
                                        <p className="text-3xl font-bold">{adminStats.totalUsers}</p>
                                    </div>
                                    <div className="text-blue-200">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-green-100">Total Recipes</p>
                                        <p className="text-3xl font-bold">{adminStats.totalRecipes}</p>
                                    </div>
                                    <div className="text-green-200">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-purple-100">Categories</p>
                                        <p className="text-3xl font-bold">{adminStats.totalCategories}</p>
                                    </div>
                                    <div className="text-purple-200">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-orange-100">Active Users</p>
                                        <p className="text-3xl font-bold">{adminStats.activeUsers}</p>
                                    </div>
                                    <div className="text-orange-200">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Users Tab */}
                {activeTab === "users" && !loading && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Management</h3>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{users.length} total users</span>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {users.map((u) => (
                                <div key={u.userId} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                                    <UserCard user={u} />
                                    <div className="mt-4 flex gap-2">
                                        <button
                                            onClick={() => handleDeleteUser(u.userId)}
                                            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                                        >
                                            Remove
                                        </button>
                                        {u.role !== "ADMIN" && (
                                            <button
                                                onClick={() => handlePromoteToAdmin(u.userId)}
                                                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                                            >
                                                Promote
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Categories Tab */}
                {activeTab === "categories" && !loading && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Category Management</h3>
                        </div>
                        
                        <form onSubmit={handleAddCategory} className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    placeholder="New category name"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors duration-200"
                                >
                                    Add Category
                                </button>
                            </div>
                        </form>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {categories.map((cat) => (
                                <div
                                    key={cat.categoryId}
                                    className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-between"
                                >
                                    <span className="font-medium text-gray-900 dark:text-white">{cat.name}</span>
                                    <button
                                        onClick={() => handleDeleteCategory(cat.categoryId)}
                                        className="ml-3 p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Moderator Picks Tab */}
                {activeTab === "moderator" && !loading && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Moderator Picks</h3>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{moderatorPicks.length}/3 selected</span>
                        </div>
                        
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {allRecipes.map((recipe) => (
                                <div
                                    key={recipe.recipeId}
                                    className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
                                >
                                    <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                                        {recipe.name}
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                                        {recipe.description}
                                    </p>
                                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                                        <span>Cook time: {recipe.cookTime} mins</span>
                                        <span>Difficulty: {recipe.difficulty}</span>
                                    </div>
                                    <button
                                        onClick={() => toggleModeratorPick(recipe.recipeId)}
                                        className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                            moderatorPicks.includes(recipe.recipeId)
                                                ? "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/40"
                                                : "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/40"
                                        }`}
                                    >
                                        {moderatorPicks.includes(recipe.recipeId) ? "Remove from Picks" : "Add to Picks"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;