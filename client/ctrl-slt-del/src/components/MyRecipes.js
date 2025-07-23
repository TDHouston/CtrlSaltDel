import React, { useContext, useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import RecipeForm from "../pages/RecipeForm";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";

function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.userId) {
      fetch(`http://localhost:8080/api/recipes/user?id=${user.userId}`)
        .then((res) => res.json())
        .then((data) => setRecipes(data))
        .catch((err) => console.error("Error fetching user recipes:", err));
    }
  }, [user]);

  const handleDelete = (recipeId) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;

    fetch(`http://localhost:8080/api/recipes/${recipeId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setRecipes((prev) => prev.filter((r) => r.recipeId !== recipeId));
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
    <section className="px-6 py-10 max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Recipes
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-300">
            View and manage the recipes you’ve submitted.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="mt-4 sm:mt-0 px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white text-sm font-medium rounded-lg shadow-md transition"
        >
          + Add Recipe
        </button>
      </div>

      {showForm && (
        <div className="mb-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
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
        <div className="grid gap-10 pt-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <div key={recipe.recipeId} className="flex flex-col items-center">
              <RecipeCard recipe={recipe} />
              <div
                className="mt-4 inline-flex rounded-md shadow-sm"
                role="group"
              >
                <button
                  type="button"
                  onClick={() => handleEdit(recipe.recipeId)}
                  className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(recipe.recipeId)}
                  className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-red-600 focus:z-10 focus:ring-2 focus:ring-red-500 focus:text-red-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-red-400"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !showForm && (
          <p className="text-center text-gray-600 dark:text-gray-300">
            You haven’t added any recipes yet.
          </p>
        )
      )}
    </section>
  );
}

export default MyRecipes;
