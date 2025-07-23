import React, { useContext, useState } from "react";
import { AuthContext } from "../helpers/AuthContext";

function AccountForm({ account }) {
  const [user, setUser] = useState(account);
  const [errors, setErrors] = useState([]);
  const { setUser: setAuthUser } = useContext(AuthContext);

  const payload = {
    userId: user.userId,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    password: user.password,
    role: user.role,
  };

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (user.userId) updateAccInfo();
  }

  function updateAccInfo() {
    const init = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    fetch(`http://localhost:8080/api/user/${user.userId}`, init)
      .then((response) => {
        if (response.status === 204) return null;
        if (response.status === 400) return response.json();
        return Promise.reject(`Unexpected Status Code: ${response.status}`);
      })
      .then((data) => {
        if (!data) {
          setAuthUser(user);
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          setErrors(data);
        }
      })
      .catch(console.log);
  }

  return (
    <section>
      {errors.length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-semibold">Errors:</p>
          <ul className="list-disc pl-5">
            {errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <form className="max-w-2xl space-y-6" onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Update Account Info
        </h2>

        {/* First + Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={user.firstName || ""}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={user.lastName || ""}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>

        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={user.username || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={user.password || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={user.email || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md text-white hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </section>
  );
}

export default AccountForm;
