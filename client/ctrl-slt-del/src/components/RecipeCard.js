import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../helpers/AuthContext";

const PLACEHOLDER_IMG =
  "https://cdn-icons-png.flaticon.com/512/1830/1830839.png";
function RecipeCard({ recipe }) {
  const { user } = useContext(AuthContext);
  const favoriteUrl = "http://localhost:8080/api/favorite";
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    if (user) {
      fetch(`${favoriteUrl}/${user.userId}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data.map((r) => r.recipeId).includes(recipe.recipeId)) {
            setFavorited(true);
          }
        });
    }
  });

  const handleAddFavorite = () => {
    const body = {
      userId: user?.userId,
      recipeId: recipe.recipeId,
    };
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    fetch(favoriteUrl, init)
      .then((response) => {
        console.log(response);
        if (
          response.status === 201 ||
          response.status === 400 ||
          response.status === 204
        ) {
          return Promise.resolve("Added successfully.");
        } else {
          return Promise.reject(`Unexpected status code ${response.status}`);
        }
      })
      .then(setFavorited(true));
  };
  return (
    <div className="recipe-card flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800">
      <img
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        src={recipe.img ? recipe.img : PLACEHOLDER_IMG}
        alt={recipe.description}
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {recipe.name}
        </h5>
        <h6 className="mb-3">
          authored by <span className="font-bold">{recipe.author}</span>
        </h6>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {recipe.description}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {recipe.cookTime}m • difficulty rating{" "}
          <span className="font-bold">{recipe.difficulty}</span>
        </p>
        <p className="p-1 mr-1">favorited {recipe.favorited} times</p>

        {user && !favorited && (
          <div className="flex flex-row">
            <button
              className="mx-5 bg-yellow-200 rounded-xl p-1 hover:bg-yellow-400"
              onClick={handleAddFavorite}
            >
              Add to favorites
            </button>
          </div>
        )}
        {user && favorited && (
          <div className="flex flex-row">
            <p>Added to favorites!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeCard;
