import React, { useContext, useEffect, useRef, useState } from "react";
import ProfileRecipeCard from "./ProfileRecipeCard";
import RecipeForm from "../pages/RecipeForm";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { API_ENDPOINTS } from "../config/api";

function MyRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    const { user, headers } = useContext(AuthContext);
    const navigate = useNavigate();

    const cardsRef = useRef([]);
    const loadedImages = useRef(0);

    // Fetch recipes for this user
    useEffect(() => {
        if (user?.userId && headers?.Authorization) {
            fetch(API_ENDPOINTS.RECIPES.BY_USER(user.userId), {
                method: "GET",
                headers,
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
                .then((data) => {
                    setRecipes(data);
                    loadedImages.current = 0;
                    setImagesLoaded(false); // Reset loading state
                })
                .catch((err) =>
                    console.error("Error fetching user recipes:", err)
                );
        }
    }, [user, headers]);

    // Animate cards once all images are loaded
    useEffect(() => {
        if (!imagesLoaded || cardsRef.current.length === 0) return;

        gsap.fromTo(
            cardsRef.current,
            { opacity: 0, y: 40, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "power3.out",
                stagger: 0.15,
                clearProps: "all",
            }
        );
    }, [imagesLoaded]);

    const handleImageLoad = () => {
        loadedImages.current += 1;
        if (loadedImages.current === recipes.length) {
            setImagesLoaded(true);
        }
    };

    const handleDelete = (recipeId) => {
        if (!window.confirm("Are you sure you want to delete this recipe?"))
            return;

        fetch(API_ENDPOINTS.RECIPES.BY_ID(recipeId), {
            method: "DELETE",
            headers,
        })
            .then((res) => {
                if (res.ok) {
                    setRecipes((prev) =>
                        prev.filter((r) => r.recipeId !== recipeId)
                    );
                } else {
                    throw new Error("Failed to delete recipe.");
                }
            })
            .catch((err) => console.error("Delete error:", err));
    };

    const handleEdit = (recipeId) => {
        navigate(`/recipe/edit/${recipeId}`);
    };

    return (
        <section className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        My Recipes
                    </h1>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                        View and manage your recipe collection
                    </p>
                </div>

                <button
                    onClick={() => setShowForm(true)}
                    className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Recipe
                </button>
            </div>

            {showForm && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
                    <RecipeForm
                        onSave={(newRecipe) => {
                            setRecipes((prev) => [...prev, newRecipe]);
                            setShowForm(false);
                        }}
                        onCancel={() => setShowForm(false)}
                    />
                </div>
            )}

            {!showForm && recipes.length > 0 ? (
                <div className="space-y-4">
                    {recipes.map((recipe, index) => (
                        <div
                            key={recipe.recipeId}
                            ref={(el) => (cardsRef.current[index] = el)}
                            className="transition-all duration-300 will-change-transform"
                        >
                            <ProfileRecipeCard
                                recipe={recipe}
                                onImageLoad={handleImageLoad}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                showActions={true}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                !showForm && (
                    <div className="text-center py-16 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                        <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-blue-400 dark:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            No recipes yet
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                            Start building your recipe collection by adding your first recipe. Share your culinary creations with the world!
                        </p>
                        <button
                            onClick={() => setShowForm(true)}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Create Your First Recipe
                        </button>
                    </div>
                )
            )}
        </section>
    );
}

export default MyRecipes;
