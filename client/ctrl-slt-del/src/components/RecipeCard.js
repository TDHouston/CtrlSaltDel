import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../helpers/AuthContext";
import { Link } from "react-router-dom";
import gsap from "gsap";

const PLACEHOLDER_IMG =
  "https://cdn-icons-png.flaticon.com/512/1830/1830839.png";

function RecipeCard({ recipe, onImageLoad }) {
  const { user } = useContext(AuthContext);
  const favoriteUrl = "http://localhost:8080/api/favorite";
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

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.03,
      y: -6,
      boxShadow: "0px 12px 30px rgba(0,0,0,0.12)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseMove = (e) => {
    const bounds = cardRef.current.getBoundingClientRect();
    const relX = e.clientX - bounds.left;
    const relY = e.clientY - bounds.top;

    const xMove = (relX / bounds.width - 0.5) * 10; // max 5px left/right
    const yMove = (relY / bounds.height - 0.5) * 10;

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
      boxShadow: "0px 6px 12px rgba(0,0,0,0.08)",
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(imageRef.current, {
      x: 0,
      y: 0,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="recipe-card flex flex-col md:flex-row w-full bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden dark:border-gray-700 dark:bg-gray-800 transition-all"
    >
      <Link to={`/recipe/${recipeId}`} className="md:w-48 w-full">
        <img
          ref={imageRef}
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:rounded-none md:rounded-s-lg"
          src={recipe.imageUrl || PLACEHOLDER_IMG}
          alt={recipe.name}
          onLoad={onImageLoad}
        />
      </Link>

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
