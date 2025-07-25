import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, IconButton } from "@material-tailwind/react";

const COMMUNITY_URL = "http://localhost:8080/api/recipes";

function Home() {
  const [communityRecipes, setCommunityRecipes] = useState([]);
  const [adminRecipes, setAdminRecipes] = useState([]);
  const [moderatorRecipes, setModeratorRecipes] = useState([]);

  useEffect(() => {
    const picks = JSON.parse(localStorage.getItem("moderatorPicks")) || [];

    fetch("http://localhost:8080/api/recipes")
      .then((res) => res.json())
      .then((data) => {
        const featured = data.filter((r) => picks.includes(r.recipeId));
        setModeratorRecipes(featured);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch(COMMUNITY_URL)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data) =>
        data.sort((a, b) => b.favorited - a.favorited).slice(0, 5)
      )
      .then(setCommunityRecipes)
      .catch((err) => console.error("Community fetch error:", err));
  }, []);

  useEffect(() => {
    fetch(COMMUNITY_URL)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data) => data.filter((r) => r.featured === true).slice(0, 3))
      .then(setAdminRecipes)
      .catch((err) => console.error("Admin fetch error:", err));
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-10 text-gray-900">
            See what’s cooking in the community!
          </h1>

          <Carousel
            autoplay
            loop
            className="rounded-xl shadow-md"
            navigation={({ setActiveIndex, activeIndex, length }) => (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-50">
                {new Array(length).fill("").map((_, i) => (
                  <span
                    key={i}
                    className={`block h-1.5 rounded-full cursor-pointer transition-all ${
                      activeIndex === i ? "w-8 bg-gray-800" : "w-4 bg-gray-400"
                    }`}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>
            )}
            prevArrow={({ handlePrev }) => (
              <IconButton
                variant="filled"
                size="lg"
                onClick={handlePrev}
                className="!absolute top-1/2 left-4 -translate-y-1/2 z-50 bg-black/70 text-white hover:bg-black/90 rounded-full p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </IconButton>
            )}
            nextArrow={({ handleNext }) => (
              <IconButton
                variant="filled"
                size="lg"
                onClick={handleNext}
                className="!absolute top-1/2 right-4 -translate-y-1/2 z-50 bg-black/70 text-white hover:bg-black/90 rounded-full p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </IconButton>
            )}
          >
            {communityRecipes.map((recipe) => (
              <div
                key={recipe.recipeId || recipe.id}
                className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] xl:h-[600px] overflow-hidden rounded-xl"
              >
                <img
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  className="absolute inset-0 w-full h-full object-cover brightness-75"
                />
                {/* Title */}
                <div className="absolute top-6 left-6 z-20 text-left">
                  <h2 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-xl">
                    {recipe.name}
                  </h2>
                  <p className="text-white mt-1 drop-shadow">
                    by <span className="font-semibold">{recipe.author}</span>
                  </p>
                </div>
                {/* CTA */}
                <div className="absolute bottom-6 right-6 z-20">
                  <Link
                    to={`/recipe/${recipe.recipeId}`}
                    className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition shadow-md"
                  >
                    View Recipe
                  </Link>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Moderator Picks */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">
              Picks from Our Moderators
            </h2>
            <p className="text-gray-600 mt-2">
              Handpicked favorites by our trusted community leaders
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {moderatorRecipes.map((recipe) => (
              <Link
                to={`/recipe/${recipe.recipeId}`}
                key={recipe.recipeId}
                className="group rounded-xl overflow-hidden bg-white shadow hover:shadow-lg transition"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                    {recipe.cookTime} mins • ★ {recipe.difficulty}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-purple-700 transition">
                    {recipe.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                    {recipe.description}
                  </p>
                  <p className="text-xs text-gray-400">
                    by <span className="font-medium">{recipe.author}</span> •{" "}
                    {recipe.favorited} favorites
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
