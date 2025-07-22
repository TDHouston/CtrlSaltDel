import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Recipe from "./pages/Recipe";
import Explore from "./pages/Explore";
import AboutUs from "./pages/AboutUs";
import RecipeForm from "./pages/RecipeForm";
import Error from "./pages/Error";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/form:id" element={<RecipeForm />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
