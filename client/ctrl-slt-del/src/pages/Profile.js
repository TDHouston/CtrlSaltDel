import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import AccountForm from "../components/AccountForm";
import { useParams } from "react-router-dom";
import MyRecipes from "../components/MyRecipes";
import UserCard from "../components/UserCard";

function Profile() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("account");
  const [favorites, setFavorites] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
<<<<<<< Updated upstream
  const [newCategory, setNewCategory] = useState("");
=======
>>>>>>> Stashed changes
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/api/user/${id}`)
      .then((res) => res.json())
      .then(setUser)
      .catch((err) => console.error("User fetch error:", err));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/user`)
      .then((res) => res.json())
      .then(setUsers)
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/api/category`)
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (activeTab === "favorites" && user) {
      fetch(`http://localhost:8080/api/favorite/${user.userId}`)
        .then((res) => res.json())
        .then(setFavorites)
        .catch(console.error);
    }
  }, [activeTab, user]);

  const handleCategoryChange = (e) => setNewCategory(e.target.value);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    fetch("http://localhost:8080/api/category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCategory }),
    })
      .then((res) => res.json())
      .then((cat) => {
        setCategories([...categories, cat]);
        setNewCategory("");
      })
      .catch(console.error);
  };

  const handleDeleteCategory = (id) => {
    fetch(`http://localhost:8080/api/category/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setCategories(categories.filter((c) => c.categoryId !== id));
        }
      })
      .catch(console.error);
  };

  const handleDeleteUser = (userId) => {
    const userToDelete = users.find((u) => u.userId === userId);
    if (
      window.confirm(
        `Remove user ${userToDelete.username}? This action cannot be undone!`
      )
    ) {
      fetch(`http://localhost:8080/api/user/${userId}`, { method: "DELETE" })
        .then((res) => {
          if (res.status === 204) {
            setUsers((prev) => prev.filter((u) => u.userId !== userId));
          }
        })
        .catch(console.error);
    }
  };

  const handlePromoteToAdmin = (userId) => {
    const selected = users.find((u) => u.userId === userId);
    if (window.confirm(`Promote ${selected.username} to admin?`)) {
      fetch(`http://localhost:8080/api/user/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...selected, role: "ADMIN" }),
      })
        .then((res) => {
          if (res.status === 204) {
            setUsers((prev) =>
              prev.map((u) =>
                u.userId === userId ? { ...u, role: "ADMIN" } : u
              )
            );
          }
        })
        .catch(console.error);
    }
  };

  const baseTabs = [
    { key: "account", label: "Account" },
    { key: "recipes", label: "My Recipes" },
    { key: "favorites", label: "View Favorites" },
  ];

  const adminTabs = [
    { key: "users", label: "View Users" },
    { key: "categories", label: "View Categories" },
  ];

<<<<<<< Updated upstream
=======
  const allTabs = [...baseTabs, ...(user?.role === "ADMIN" ? adminTabs : [])];

>>>>>>> Stashed changes
  return (
    <section className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white border-r border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
          <p className="text-sm text-gray-500">
            Welcome back, {user?.firstName || "User"}!
          </p>
        </div>

<<<<<<< Updated upstream
        {/* User Tabs */}
        <ul className="mt-6 space-y-1">
          {baseTabs.map(({ key, label }) => (
=======
        <ul className="mt-6 space-y-1">
          {allTabs.map(({ key, label }) => (
>>>>>>> Stashed changes
            <li key={key}>
              <button
                className={`w-full text-left px-6 py-3 hover:bg-gray-100 ${
                  activeTab === key ? "bg-gray-100 font-semibold" : ""
                }`}
                onClick={() => setActiveTab(key)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
<<<<<<< Updated upstream

        {/* Admin Panel Tabs */}
        {user?.role === "ADMIN" && (
          <div className="mt-6 px-6">
            <h2 className="text-md font-medium text-gray-800">Admin Panel</h2>
            <ul className="mt-4 space-y-1">
              {adminTabs.map(({ key, label }) => (
                <li key={key}>
                  <button
                    className={`w-full text-left px-6 py-3 hover:bg-gray-100 ${
                      activeTab === key ? "bg-gray-100 font-semibold" : ""
                    }`}
                    onClick={() => setActiveTab(key)}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
=======
>>>>>>> Stashed changes
      </aside>

      <main className="flex-1 p-10">
        {activeTab === "account" && user && (
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-semibold text-center text-gray-800">
              Account Settings
            </h1>
            <p className="mt-2 text-center text-gray-600">
              Manage your profile information.
            </p>
            <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
              <AccountForm account={user} />
            </div>
          </div>
        )}

        {activeTab === "recipes" && <MyRecipes />}
        {activeTab === "favorites" && (
          <section>
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              Favorites
            </h1>
            {favorites.length === 0 ? (
              <p className="text-gray-500 italic">
                You haven’t favorited any recipes yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {favorites.map((recipe) => (
                  <RecipeCard key={recipe.recipeId} recipe={recipe} />
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === "users" && (
          <section>
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Users</h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {users.map((u) => (
                <div key={u.userId}>
                  <UserCard user={u} />
                  <div className="mt-2 flex gap-2">
                    <button
                      className="bg-red-700 text-white px-2 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDeleteUser(u.userId)}
                    >
                      Remove
                    </button>
                    {u.role !== "ADMIN" && (
                      <button
                        className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-300"
                        onClick={() => handlePromoteToAdmin(u.userId)}
                      >
                        Promote to Admin
                      </button>
                    )}
                  </div>
<<<<<<< Updated upstream
=======
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "categories" && (
          <section>
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              Categories
            </h1>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((cat) => (
                <div
                  key={cat.categoryId}
                  className="bg-white text-center p-4 rounded shadow-sm"
                >
                  {cat.name}
>>>>>>> Stashed changes
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "categories" && (
          <section>
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              Categories
            </h1>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((cat) => (
                <div
                  key={cat.categoryId}
                  className="bg-white text-center p-4 shadow-md rounded"
                >
                  {cat.name}
                  <div>
                    <button
                      className="mt-2 bg-red-700 text-white px-2 py-1 rounded hover:bg-red-500"
                      onClick={() => handleDeleteCategory(cat.categoryId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <form className="mt-6 flex gap-4" onSubmit={handleAddCategory}>
              <input
                type="text"
                placeholder="New category"
                value={newCategory}
                onChange={handleCategoryChange}
                className="border px-3 py-2 rounded w-64"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
              >
                Add Category
              </button>
            </form>
          </section>
        )}
      </main>
    </section>
  );
}

export default Profile;
