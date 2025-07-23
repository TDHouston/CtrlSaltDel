import React, { useContext, useState } from "react";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";
import { AuthContext } from "../helpers/AuthContext";

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
  const [formUser, setFormUser] = useState(DEFAULT_USER);
  const { user } = useContext(AuthContext);

  return (
    <main>
      {page === "signup" && (
        <SignUpForm user={formUser} setUser={setFormUser} setPage={setPage} />
      )}
      {page === "login" && (
        <LoginForm user={formUser} setUser={setFormUser} setPage={setPage} />
      )}
    </main>
  );
}

export default Login;
