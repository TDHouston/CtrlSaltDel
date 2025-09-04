import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../helpers/AuthContext";
import { Link } from "react-router-dom";
import gsap from "gsap";
import LazyImage from "./LazyImage";
import { API_ENDPOINTS } from "../config/api";

const PLACEHOLDER_IMG =
  "https://cdn-icons-png.flaticon.com/512/1830/1830839.png";

function RecipeCard({ recipe, onImageLoad }) {
  const { user } = useContext(AuthContext);
  const favoriteUrl = `${API_ENDPOINTS.RECIPES.BASE.replace('/recipes', '/favorite')}`;
  const recipeId = recipe.recipeId || recipe.id;
  const [favorited, setFavorited] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(recipe.favorited || 0);

  const cardRef = useRef();
  const imageRef = useRef();

  useEffect(() => {
    if (user && recipeId) {
      fetch(`${favoriteUrl}/${user.userId}`)
        .then((res) => res.json())
        .then((data) => {
          const isFavorited = data.some((r) => r.recipeId === recipeId);
          setFavorited(isFavorited);
        });
    }
  }, [user, recipeId]);

  useEffect(() => {
    if (!recipeId) return;

    fetch(`${favoriteUrl}/count/${recipeId}`)
      .then((res) => res.json())
      .then((count) => setFavoriteCount(count))
      .catch((err) => console.error("Favorite count fetch failed", err));
  }, [recipeId]);

  const toggleFavorite = () => {
    if (!user || !recipeId) return;

    const body = { userId: user.userId, recipeId };

    fetch(favoriteUrl, {
      method: favorited ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to toggle favorite.");
        setFavorited(!favorited);
        setFavoriteCount((prev) => prev + (favorited ? -1 : 1));
      })
      .catch((err) => console.error("Favorite toggle failed:", err));
  };

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.02,
      y: -8,
      boxShadow: "0px 20px 40px rgba(0,0,0,0.15)",
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseMove = (e) => {
    const bounds = cardRef.current.getBoundingClientRect();
    const relX = e.clientX - bounds.left;
    const relY = e.clientY - bounds.top;

    const xMove = (relX / bounds.width - 0.5) * 8;
    const yMove = (relY / bounds.height - 0.5) * 8;

    gsap.to(imageRef.current, {
      x: xMove,
      y: yMove,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      y: 0,
      boxShadow: "0px 8px 24px rgba(0,0,0,0.1)",
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to(imageRef.current, {
      x: 0,
      y: 0,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      EASY: "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400",
      MEDIUM: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400", 
      HARD: "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400"
    };
    return colors[difficulty] || colors.MEDIUM;
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="recipe-card group relative w-full h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden transition-all duration-500 shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-700/50"
    >
      {/* Image Section */}
      <Link to={`/recipe/${recipeId}`} className="block relative overflow-hidden">
        <div ref={imageRef} className="relative w-full h-56 overflow-hidden">
          <LazyImage
            src={recipe.imageUrl}
            alt={recipe.name}
            placeholder={PLACEHOLDER_IMG}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            onLoad={onImageLoad}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Difficulty badge */}
          <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${getDifficultyColor(recipe.difficulty)}`}>
            {recipe.difficulty}
          </div>
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-5 space-y-3">
        <div className="space-y-2">
          <Link to={`/recipe/${recipeId}`}>
            <h5 className="text-xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
              {recipe.name}
            </h5>
          </Link>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
            <span className="w-1 h-1 bg-gray-400 rounded-full" />
            by <span className="font-medium text-gray-700 dark:text-gray-300">{recipe.author}</span>
          </p>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
            {recipe.description}
          </p>
        </div>

        {/* Recipe Stats */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">{recipe.cookTime}min</span>
            </div>
            
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span className="font-medium">{favoriteCount}</span>
            </div>
          </div>

          {user && (
            <button
              onClick={toggleFavorite}
              className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-300 ${
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
  );
}

export default RecipeCard;
