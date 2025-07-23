import React, { useState } from "react";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";

const DEFAULT_USER = {
  role: "USER",
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
};

function Login() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(DEFAULT_USER);

  return (
    <main>
      {page === "signup" && (
        <SignUpForm user={user} setUser={setUser} setPage={setPage} />
      )}
      {page === "login" && (
        <LoginForm user={user} setUser={setUser} setPage={setPage} />
      )}
    </main>
  );
}

export default Login;
