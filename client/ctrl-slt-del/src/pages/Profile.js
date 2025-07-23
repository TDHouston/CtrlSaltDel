import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import AccountForm from "../components/AccountForm";
import { useParams } from "react-router-dom";

const RECIPES_DEFAULT = [
  {
    id: 1,
    name: "Crispy Chicken",
    description: "Delicious crispy chicken with a sweet chili dipping sauce!",
    difficulty: 3,
    cookTime: 30,
    upvotes: 300,
    user: "cookingmama",
    img: "https://www.stockvault.net/data/2016/04/19/194386/preview16.jpg",
  },
  {
    id: 2,
    name: "Tofu Stir-Fry",
    description: "Garlic tofu stir-fry with green beans and onions",
    difficulty: 5,
    cookTime: 45,
    upvotes: 200,
    user: "cookingmama",
    img: "https://spicysouthernkitchen.com/wp-content/uploads/tofu-13.jpg",
  },
  {
    id: 3,
    name: "Chocolate cupcakes",
    description:
      "These cupcakes are perfectly light and fluffy with a chocolate frosting.",
    difficulty: 2,
    cookTime: 60,
    upvotes: 100,
    user: "cookingmama",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5fzbFvsLGIsMdgkMl3N-ln_GgDGqWHvLjVA&s",
  },
  {
    id: 4,
    name: "Macaroni and cheese",
    description: "3 cheeses, all goodness.",
    difficulty: 2,
    cookTime: 20,
    upvotes: 200,
    user: "cookingmama",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8Zjy4R1VAkfSBhcHGe-whY1sL04epOzCYgA&s",
  },
  {
    id: 5,
    name: "Pizza",
    description: "It's not delivery - it's homemade.",
    difficulty: 7,
    cookTime: 30,
    upvotes: 50,
    user: "cookingmama",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBhqV7gsGTQ6K62gRiPUl_hHWJv71zgFEXzQ&s",
  },
];

const FAVORITES_DEFAULT = [
  {
    id: 1,
    name: "Crispy Chicken",
    description: "Delicious crispy chicken with a sweet chili dipping sauce!",
    difficulty: 3,
    cookTime: 30,
    upvotes: 300,
    user: "cookingmama",
    img: "https://www.stockvault.net/data/2016/04/19/194386/preview16.jpg",
  },
  {
    id: 2,
    name: "Tofu Stir-Fry",
    description: "Garlic tofu stir-fry with green beans and onions",
    difficulty: 5,
    cookTime: 45,
    upvotes: 200,
    user: "cookingmama",
    img: "https://spicysouthernkitchen.com/wp-content/uploads/tofu-13.jpg",
  },
  {
    id: 3,
    name: "Chocolate cupcakes",
    description:
      "These cupcakes are perfectly light and fluffy with a chocolate frosting.",
    difficulty: 2,
    cookTime: 60,
    upvotes: 100,
    user: "cookingmama",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5fzbFvsLGIsMdgkMl3N-ln_GgDGqWHvLjVA&s",
  },
];

function Profile() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("account");
  const [recipes, setRecipes] = useState(RECIPES_DEFAULT);
  const [favorites, setFavorites] = useState(FAVORITES_DEFAULT);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/api/user/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("User fetch failed");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => console.error("User fetch error:", err));
  }, [id]);

  console.log("USER", user);

  return (
    <section className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
          <p className="text-sm text-gray-500">
            Welcome back, {user?.firstName || "User"}!
          </p>
        </div>

        {/* User menu */}
        {user?.role === "USER" && (
          <ul className="mt-6 space-y-1">
            <li>
              <button
                className={`w-full text-left px-6 py-3 hover:bg-gray-100 ${
                  activeTab === "account" ? "bg-gray-100 font-semibold" : ""
                }`}
                onClick={() => setActiveTab("account")}
              >
                Account
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-6 py-3 hover:bg-gray-100 ${
                  activeTab === "recipes" ? "bg-gray-100 font-semibold" : ""
                }`}
                onClick={() => setActiveTab("recipes")}
              >
                My Recipes
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-6 py-3 hover:bg-gray-100 ${
                  activeTab === "favorites" ? "bg-gray-100 font-semibold" : ""
                }`}
                onClick={() => setActiveTab("favorites")}
              >
                View Favorites
              </button>
            </li>
          </ul>
        )}

        {/* Admin panel */}
        {user?.role === "ADMIN" && (
          <div className="mt-6 px-6">
            <h2 className="text-md font-medium text-gray-800">Admin Panel</h2>
            <p className="text-sm text-gray-500 mt-1">
              You have admin privileges.
            </p>
          </div>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10">
        {activeTab === "account" && user && (
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800 text-center">
              Account Settings
            </h1>
            <p className="mt-2 text-gray-600 text-center">
              Manage your profile information.
            </p>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
              <AccountForm account={user} />
            </div>
          </div>
        )}

        {activeTab === "recipes" && (
          <section>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                My Recipes
              </h1>
              <p className="mt-2 text-gray-600">
                See and edit recipes you’ve submitted.
              </p>
            </div>

            <div className="relative mx-auto w-full z-10 grid justify-center grid-cols-1 gap-20 pt-14 sm:grid-cols-2 lg:grid-cols-3">
              {recipes.map((recipe) => (
                <div>
                  <RecipeCard recipe={recipe} key={recipe.id} />
                  <div
                    className="inline-flex rounded-md shadow-xs"
                    role="group"
                  >
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "favorites" && (
          <section>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                Favorites
              </h1>
              <p className="mt-2 text-gray-600">
                Your saved and liked recipes appear here.
              </p>
            </div>

            <div className="relative mx-auto w-full z-10 grid justify-center grid-cols-1 gap-20 pt-14 sm:grid-cols-2 lg:grid-cols-3">
              {favorites.map((recipe) => (
                <div>
                  <RecipeCard recipe={recipe} key={recipe.id} />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </section>
  );
}

export default Profile;
