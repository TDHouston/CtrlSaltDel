import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const DEFAULT_USER = {
  role: "user",
  first_name: "Julian",
  last_name: "Houston",
  username: "JH",
  email: "trentdhouston@gmail.com",
  password: "password",
};

function Login() {
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();

  function handleLogin() {}

  function handleSignUp() {}

  function handleSubmit() {}

  function handleChange(event) {}

  return (
    <main className="flex justify-center items-center min-h-[calc(100vh-200px)] overflow-hidden px-4 py-6 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          {mode === "login" ? "Welcome Back" : "Create an Account"}
        </h2>

        <form className="space-y-5">
          {mode === "signup" && (
            <>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {mode === "login" && (
            <div className="text-right text-sm">
              <Link
                to="#"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                Forgot password?
              </Link>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
            onClick={() => navigate("/")}
          >
            {mode === "login" ? "Log In" : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setMode("signup")}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setMode("login")}
              >
                Log In
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default Login;
