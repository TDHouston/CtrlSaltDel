import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../helpers/AuthContext";
import { Link } from "react-router-dom";

const PLACEHOLDER_IMG =
  "https://cdn-icons-png.flaticon.com/512/1830/1830839.png";

function RecipeCard({ recipe }) {
  const { user } = useContext(AuthContext);
  const favoriteUrl = "http://localhost:8080/api/favorite";
  const recipeId = recipe.recipeId || recipe.id;
  const [favorited, setFavorited] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(recipe.favorited || 0);

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

    const body = {
      userId: user.userId,
      recipeId: recipeId,
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
    <div className="recipe-card flex flex-col md:flex-row w-full bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden dark:border-gray-700 dark:bg-gray-800">
      {/* Image */}
      {console.log("Recipe Image URL:", recipe.imageUrl)}

      <Link to={`/recipe/${recipeId}`} className="md:w-48 w-full">
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:rounded-none md:rounded-s-lg"
          src={recipe?.imageUrl || PLACEHOLDER_IMG}
          alt={recipe.name}
        />
      </Link>

      {/* Content */}
      <div className="flex flex-col justify-between p-4 flex-1">
        <div>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {recipe.name}
          </h5>
          <h6 className="mb-2 text-sm text-gray-700 dark:text-gray-300">
            authored by <span className="font-bold">{recipe.author}</span>
          </h6>
          <p className="text-gray-700 dark:text-gray-400 mb-2">
            {recipe.description}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            {recipe.cookTime}m • difficulty rating{" "}
            <span className="font-bold">{recipe.difficulty}</span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Favorited {favoriteCount} {favoriteCount === 1 ? "time" : "times"}
          </p>
        </div>

        {user && (
          <div className="flex flex-row mt-4">
            <button
              className={`px-4 py-2 rounded-md ${
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
