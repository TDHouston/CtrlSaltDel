import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../helpers/AuthContext";
import { Link } from "react-router-dom";
import LazyImage from "./LazyImage";
import { API_ENDPOINTS } from "../config/api";

const PLACEHOLDER_IMG = "https://cdn-icons-png.flaticon.com/512/1830/1830839.png";

function ProfileRecipeCard({ recipe, onEdit, onDelete, showActions = true, onImageLoad }) {
    const { user, token } = useContext(AuthContext);
    const favoriteUrl = `${API_ENDPOINTS.RECIPES.BASE.replace('/recipes', '/favorite')}`;
    const recipeId = recipe.recipeId || recipe.id;
    const [favorited, setFavorited] = useState(false);
    const [favoriteCount, setFavoriteCount] = useState(recipe.favorited || 0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user && recipeId) {
            fetch(`${favoriteUrl}/${user.userId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    const isFavorited = data.some((r) => r.recipeId === recipeId);
                    setFavorited(isFavorited);
                })
                .catch((err) => console.error("Error loading favorites:", err));
        }
    }, [user, recipeId, token]);

    useEffect(() => {
        if (!recipeId) return;

        fetch(`${favoriteUrl}/count/${recipeId}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((count) => setFavoriteCount(count))
            .catch((err) => console.error("Favorite count fetch failed", err));
    }, [recipeId, token]);

    const toggleFavorite = async () => {
        if (!user || !recipeId || loading) return;

        setLoading(true);
        const body = { userId: user.userId, recipeId };

        try {
            const response = await fetch(favoriteUrl, {
                method: favorited ? "DELETE" : "POST",
                headers: { 
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) throw new Error("Failed to toggle favorite.");
            
            setFavorited(!favorited);
            setFavoriteCount((prev) => prev + (favorited ? -1 : 1));
        } catch (err) {
            console.error("Favorite toggle failed:", err);
        } finally {
            setLoading(false);
        }
    };

    const getDifficultyColor = (difficulty) => {
        const colors = {
            EASY: "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400",
            MEDIUM: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400", 
            INTERMEDIATE: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400",
            HARD: "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400",
            ADVANCED: "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400",
            EXPERT: "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400"
        };
        return colors[difficulty] || colors.MEDIUM;
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
    };

    const handleEdit = () => {
        if (onEdit) {
            onEdit(recipeId);
        }
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete(recipeId);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 overflow-hidden group">
            <div className="flex flex-col sm:flex-row">
                {/* Image Section - Compact */}
                <div className="relative w-full sm:w-32 h-32 flex-shrink-0">
                    <Link to={`/recipe/${recipeId}`} className="block w-full h-full">
                        <LazyImage
                            src={recipe.imageUrl}
                            alt={recipe.name}
                            placeholder={PLACEHOLDER_IMG}
                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                            onLoad={onImageLoad}
                        />
                        {/* Difficulty badge */}
                        <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${getDifficultyColor(recipe.difficulty)}`}>
                            {recipe.difficulty}
                        </div>
                    </Link>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-4 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 min-w-0">
                            <Link to={`/recipe/${recipeId}`}>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-1">
                                    {recipe.name}
                                </h3>
                            </Link>
                            
                            {recipe.author && (
                                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                                    <span className="w-1 h-1 bg-gray-400 rounded-full" />
                                    by <span className="font-medium">{recipe.author}</span>
                                </p>
                            )}
                        </div>

                        {/* Quick Actions */}
                        {showActions && (
                            <div className="flex items-center gap-1 ml-2">
                                <button
                                    onClick={handleEdit}
                                    className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                                    title="Edit recipe"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                                    title="Delete recipe"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2 mb-3">
                        {recipe.description}
                    </p>

                    {/* Recipe Stats & Meta */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                                <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{recipe.cookTime}min</span>
                            </div>
                            
                            <div className="flex items-center gap-1">
                                <svg className="w-3 h-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span>{recipe.servings} servings</span>
                            </div>

                            <div className="flex items-center gap-1">
                                <svg className="w-3 h-3 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                                <span>{favoriteCount}</span>
                            </div>

                            {recipe.createdAt && (
                                <div className="flex items-center gap-1">
                                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>{formatDate(recipe.createdAt)}</span>
                                </div>
                            )}
                        </div>

                        {/* Favorite Button */}
                        {user && !showActions && (
                            <button
                                onClick={toggleFavorite}
                                disabled={loading}
                                className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium transition-all duration-200 disabled:opacity-50 ${
                                    favorited
                                        ? "bg-pink-100 dark:bg-pink-900/20 text-pink-700 dark:text-pink-400 hover:bg-pink-200 dark:hover:bg-pink-900/30"
                                        : "bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 hover:bg-pink-100 dark:hover:bg-pink-900/20 hover:text-pink-600 dark:hover:text-pink-400"
                                }`}
                            >
                                <svg className="w-3 h-3" fill={favorited ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                {favorited ? "Saved" : "Save"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileRecipeCard;