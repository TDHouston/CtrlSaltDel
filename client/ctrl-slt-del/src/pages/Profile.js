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
  const [newCategory, setNewCategory] = useState("");
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

  useEffect(() => {
    fetch(`http://localhost:8080/api/user`)
      .then((res) => {
        if (!res.ok)
          throw new Error("Something went wrong retrieving the user list");
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  });

  useEffect(() => {
    fetch(`http://localhost:8080/api/category`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong retrieving the categories");
        }
        return response.json();
      })
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  });

  useEffect(() => {
    if (activeTab === "favorites" && user) {
      fetch(`http://localhost:8080/api/favorite/${user.userId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch favorites");
          return res.json();
        })
        .then((data) => setFavorites(data))
        .catch((err) => console.error("Favorites fetch error:", err));
    }
  });

  const handleDeleteUser = (userId) => {
    const user = users.find((u) => u.userId === userId);
    if (
      window.confirm(
        `Remove user ${user.username}? This action cannot be undone!`
      )
    ) {
      const init = {
        method: "DELETE",
      };
      fetch(`http://localhost:8080/api/user/${userId}`, init)
        .then((response) => {
          if (response.status === 204) {
            const newUsers = users.filter((u) => u.id !== userId);
            setUsers(newUsers);
          } else {
            return Promise.reject(`Unexpected status code ${response.status}`);
          }
        })
        .catch(console.log);
    }
  };

  const handlePromoteToAdmin = (userId) => {
    const user = users.find((u) => u.userId === userId);
    if (window.confirm(`Promote user ${user.username} to admin?`)) {
      const updatedUser = {
        userId: user.userId,
        username: user.username,
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        role: "ADMIN",
      };
      console.log(updatedUser);
      const init = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      };
      fetch(`http://localhost:8080/api/user/${userId}`, init)
        .then((response) => {
          if (response.status === 204) {
            setUsers(users);
          } else {
            return Promise.reject(`Unexpected status code ${response.status}`);
          }
        })
        .catch(console.log);
    }
  };

  const handleCategoryChange = (event) => {
    setNewCategory(event.target.value);
  };

  const handleDeleteCategory = (categoryId) => {
    const toDelete = categories.find((c) => c.categoryId === categoryId);
    if (
      window.confirm(
        `Delete category ${toDelete.name}? This action cannot be undone!`
      )
    ) {
      const init = {
        method: "DELETE",
      };
      fetch(`http://localhost:8080/api/category/${categoryId}`)
        .catch.then((response) => {
          if (response.status === 204) {
            const newCats = categories.filter((c) => c.id !== categoryId);
            setCategories(newCats);
          } else {
            return Promise.reject(`Unexpected Status Code: ${response.status}`);
          }
        })
        .catch(console.log);
    }
  };

  const handleAddCategory = () => {
    const cat = {
      name: newCategory,
    };
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cat),
    };
    fetch("http://localhost:8080/api/category", init)
      .then((response) => {
        if (response.status === 201 || response.status === 400) {
          return response.json();
        } else {
          return Promise.reject(`Unexpected Status Code: ${response.status}`);
        }
      })
      .then((data) => {
        setCategories([...categories, data]);
      })
      .catch(console.log);
  };

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
            <ul className="mt-6 space-y-1">
              <li>
                <button
                  className={`w-full text-left px-6 py-3 hover:bg-gray-100 ${
                    activeTab === "users" ? "bg-gray-100 font-semibold" : ""
                  }`}
                  onClick={() => setActiveTab("users")}
                >
                  View Users
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-6 py-3 hover:bg-gray-100 ${
                    activeTab === "users" ? "bg-gray-100 font-semibold" : ""
                  }`}
                  onClick={() => setActiveTab("categories")}
                >
                  View Categories
                </button>
              </li>
            </ul>
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

        {activeTab === "recipes" && <MyRecipes />}

        {activeTab === "favorites" && (
          <section>
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-gray-800">
                Favorites
              </h1>
              <p className="mt-2 text-gray-600">
                Your saved and liked recipes appear here.
              </p>
            </div>

            {favorites.length === 0 ? (
              <p className="text-gray-500 italic">
                You haven't favorited any recipes yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {favorites.map((recipe) => (
                  <RecipeCard recipe={recipe} key={recipe.recipeId} />
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === "users" && (
          <section>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Users</h1>
            </div>

            <div className="relative mx-auto w-full z-10 grid justify-center grid-cols-1 gap-20 pt-14 sm:grid-cols-2 lg:grid-cols-3">
              {users.map((user) => (
                <div>
                  <UserCard user={user} key={user.userId} />
                  <button
                    className="bg-red-800 text-white rounded-xl p-1 hover:bg-red-600"
                    onClick={() => handleDeleteUser(user.userId)}
                  >
                    Remove User
                  </button>
                  {user.role !== "ADMIN" && (
                    <button
                      className="ml-3 bg-yellow-800 text-black rounded-xl p-1 hover:bg-yellow-600"
                      onClick={() => handlePromoteToAdmin(user.userId)}
                    >
                      Promote to admin
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "categories" && (
          <section>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                Categories
              </h1>
            </div>

            <div className="relative mx-auto w-full z-10 grid justify-center grid-cols-1 gap-20 pt-14 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <div className="bg-white text-center p-4 shadow-md rounded-xl">
                  {category.name}
                  <div>
                    <button
                      className="bg-red-800 text-white p-1 rounded-md hover:bg-red-600"
                      onClick={() => handleDeleteCategory(category.categoryId)}
                    >
                      Remove Category
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <h2 className="text-2xl">Add a category</h2>
              <form>
                <fieldset>
                  <label className="mr-2" htmlFor="Name">
                    Category
                  </label>
                  <input
                    id="category"
                    name="category"
                    type="text"
                    className="form-control"
                    value={newCategory}
                    onChange={handleCategoryChange}
                    onClick={handleAddCategory}
                  />
                </fieldset>
                <button className="bg-blue-800 text-white p-1 rounded-xl hover:bg-blue-600">
                  Add
                </button>
              </form>
            </div>
          </section>
        )}
      </main>
    </section>
  );
}

export default Profile;
