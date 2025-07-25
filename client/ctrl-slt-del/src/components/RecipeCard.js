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

    const xMove = (relX / bounds.width - 0.5) * 10;
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
      className="recipe-card flex flex-col md:flex-row w-full bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden transition-all duration-300"
    >
      <Link to={`/recipe/${recipeId}`} className="md:w-48 w-full">
        <img
          ref={imageRef}
          className="object-cover w-full h-64 md:h-full md:rounded-l-xl rounded-t-xl"
          src={recipe.imageUrl || PLACEHOLDER_IMG}
          alt={recipe.name}
          onLoad={onImageLoad}
        />
      </Link>

      <div className="flex flex-col justify-between p-4 flex-1">
        <div>
          <h5 className="text-2xl font-semibold text-gray-900 mb-1">
            {recipe.name}
          </h5>
          <p className="text-sm text-gray-600 mb-2">
            by <span className="font-semibold">{recipe.author}</span>
          </p>
          <p className="text-gray-700 text-sm mb-3 line-clamp-3">
            {recipe.description}
          </p>

          <div className="text-sm text-gray-600 space-y-1">
            <p>
              ⏱️ <span className="font-medium">{recipe.cookTime} min</span>
            </p>
            <p>
              🧩 Difficulty:{" "}
              <span className="font-medium">{recipe.difficulty}</span>
            </p>
            <p>
              ❤️ Favorited <span className="font-medium">{favoriteCount}</span>{" "}
              {favoriteCount === 1 ? "time" : "times"}
            </p>
          </div>
        </div>

        {user && (
          <div className="mt-4">
            <button
              onClick={toggleFavorite}
              className={`text-sm px-4 py-2 rounded-md font-medium shadow-sm transition ${
                favorited
                  ? "bg-red-100 text-red-700 hover:bg-red-200"
                  : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
              }`}
            >
              {favorited ? "★ Remove from Favorites" : "☆ Add to Favorites"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeCard;
