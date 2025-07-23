import React, { useState } from "react";

function AccountForm({ account }) {
  const [user, setUser] = useState(account);

  // Form field change handler
  function handleChange(event) {
    // Create a copy of the current state
    const newAccInfo = { ...user };

    newAccInfo[event.target.name] = event.target.value;
    // Update state with the modified copy
    setUser(newAccInfo);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // if (id) {
    //   // If ID exists, we're updating
    //   updateAccInfo();
    // }
  };

  function updateAccInfo(userId) {
    // Assign the id FROM THE url PARAM
    // user.id = id;
    // const init = {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(user),
    // };
    // fetch(`${url}/${id}`, init)
    //   .then((response) => {
    //     if (response.status === 204) {
    //       return null;
    //     } else if (response.status === 400) {
    //       return response.json();
    //     } else {
    //       return Promise.reject(`Unexpected Status Code: ${response.status}`);
    //     }
    //   })
    //   .then((data) => {
    //     if (!data) {
    //       // Success - navigate to home page
    //       navigate('/');
    //     } else {
    //       // Validation errors
    //       setErrors(data);
    //     }
    //   })
    //   .catch(console.log);
  }

  return (
    <form className="max-w-2xl space-y-6" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        Update Account Info
      </h2>

      {/* First + Last Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="first_name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            First Name
          </label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            value={user.first_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="last_name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Last Name
          </label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            value={user.last_name}
            onChange={handleChange}
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          value={user.username}
          onChange={handleChange}
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          value={user.password}
          onChange={handleChange}
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          value={user.email}
          onChange={handleChange}
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}

export default AccountForm;
