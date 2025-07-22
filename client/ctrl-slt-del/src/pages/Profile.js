import React, { useState } from "react";
import RecipeCard from "../components/RecipeCard";

const DEFAULT_USER = {
  role: "user", // Change to 'admin' to test admin panel
  first_name: "Julian",
  last_name: "",
  username: "",
  email: "",
  password: "",
};

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

function Profile() {
  const [user, setUser] = useState(DEFAULT_USER);
  const [activeTab, setActiveTab] = useState("account");
  const [recipes, setRecipes] = useState(RECIPES_DEFAULT);

  return (
    <section className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
          <p className="text-sm text-gray-500">
            Welcome back, {user.first_name || "User"}!
          </p>
        </div>

        {/* User menu */}
        {user.role === "user" && (
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
        {user.role === "admin" && (
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
        {activeTab === "account" && (
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Account Settings
            </h1>
            <p className="mt-2 text-gray-600">
              Manage your profile information.
            </p>
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
                <RecipeCard recipe={recipe} key={recipe.id} />
              ))}
            </div>
          </section>
        )}

        {activeTab === "favorites" && (
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Favorites</h1>
            <p className="mt-2 text-gray-600">
              Your saved and liked recipes appear here.
            </p>
          </div>
        )}
      </main>
    </section>
  );
}

export default Profile;
