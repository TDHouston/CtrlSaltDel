import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../helpers/AuthContext";
import { Link } from "react-router-dom";

const PLACEHOLDER_IMG =
  "https://cdn-icons-png.flaticon.com/512/1830/1830839.png";

function RecipeCard({ recipe }) {
  const { user } = useContext(AuthContext);
  const favoriteUrl = "http://localhost:8080/api/favorite";
  const [favorited, setFavorited] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(recipe.favorited || 0);

  // Check if this recipe is in the user's favorites
  useEffect(() => {
    if (user) {
      fetch(`${favoriteUrl}/${user.userId}`)
        .then((res) => res.json())
        .then((data) => {
          const isFavorited = data.some((r) => r.recipeId === recipe.recipeId);
          setFavorited(isFavorited);
        });
    }
  }, [user, recipe.recipeId]);

  // Fetch live favorite count
  useEffect(() => {
    fetch(`${favoriteUrl}/count/${recipe.recipeId}`)
      .then((res) => res.json())
      .then((count) => setFavoriteCount(count))
      .catch((err) => console.error("Favorite count fetch failed", err));
  }, [recipe.recipeId]);

  // Toggle favorite
  const toggleFavorite = () => {
    const body = {
      userId: user?.userId,
      recipeId: recipe.recipeId,
    };

    const init = {
      method: favorited ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    fetch(favoriteUrl, init)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to toggle favorite.");
        setFavorited(!favorited);
        setFavoriteCount((prev) => prev + (favorited ? -1 : 1));
      })
      .catch((err) => console.error("Favorite toggle failed:", err));
  };

  return (
    <div className="recipe-card flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800">
      <Link to={`/recipe/${recipe.recipeId}`} className="w-full md:w-48">
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:rounded-none md:rounded-s-lg"
          src={recipe.img || PLACEHOLDER_IMG}
          alt={recipe.description}
        />
      </Link>

      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {recipe.name}
        </h5>
        <h6 className="mb-3">
          authored by <span className="font-bold">{recipe.author}</span>
        </h6>
        <p className="mb-3 text-gray-700 dark:text-gray-400">
          {recipe.description}
        </p>
        <p className="mb-3 text-gray-700 dark:text-gray-400">
          {recipe.cookTime}m • difficulty rating{" "}
          <span className="font-bold">{recipe.difficulty}</span>
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          Favorited {favoriteCount} {favoriteCount === 1 ? "time" : "times"}
        </p>

        {user && (
          <div className="flex flex-row mt-2">
            <button
              className={`mx-5 px-3 py-1 rounded-xl ${
                favorited
                  ? "bg-red-300 hover:bg-red-400"
                  : "bg-yellow-200 hover:bg-yellow-400"
              }`}
              onClick={toggleFavorite}
            >
              {favorited ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeCard;
