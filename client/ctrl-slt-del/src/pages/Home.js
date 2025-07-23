import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import { Carousel, IconButton } from "@material-tailwind/react";

const COMMUNITY_RECIPES_DEFAULT = [
  {
    id: 1,
    name: "Crispy Chicken",
    description: "Delicious crispy chicken with a sweet chili dipping sauce!",
    difficulty: 3,
    cookTime: 30,
    favorited: 100,
    user: "cookingmama",
    img: "https://www.stockvault.net/data/2016/04/19/194386/preview16.jpg",
  },
  {
    id: 2,
    name: "Tofu Stir-Fry",
    description: "Garlic tofu stir-fry with green beans and onions",
    difficulty: 5,
    cookTime: 45,
    favorited: 200,
    user: "cookingmama",
    img: "https://spicysouthernkitchen.com/wp-content/uploads/tofu-13.jpg",
  },
  {
    id: 3,
    name: "Chocolate cupcakes",
    description:
      "These cupcakes are perfectly light and fluffy with a chocolate frosting.",
    difficulty: 3,
    cookTime: 60,
    favorited: 100,
    user: "cookingmama",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5fzbFvsLGIsMdgkMl3N-ln_GgDGqWHvLjVA&s",
  },
  {
    id: 4,
    name: "Crispy Chicken",
    description: "Delicious crispy chicken with a sweet chili dipping sauce!",
    difficulty: 3,
    cookTime: 30,
    favorited: 100,
    user: "cookingmama",
    img: "https://www.stockvault.net/data/2016/04/19/194386/preview16.jpg",
  },
  {
    id: 5,
    name: "Pizza",
    description: "It's not delivery - it's homemade.",
    difficulty: 3,
    cookTime: 30,
    favorited: 100,
    user: "cookingmama",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBhqV7gsGTQ6K62gRiPUl_hHWJv71zgFEXzQ&s",
  },
];

const MOD_RECIPES_DEFAULT = [
  {
    id: 1,
    name: "Crispy Chicken",
    description: "Delicious crispy chicken with a sweet chili dipping sauce!",
    difficulty: 3,
    cookTime: 30,
    favorited: 100,
    user: "cookingmama",
    img: "https://www.stockvault.net/data/2016/04/19/194386/preview16.jpg",
  },
  {
    id: 2,
    name: "Tofu Stir-Fry",
    description: "Garlic tofu stir-fry with green beans and onions",
    difficulty: 5,
    cookTime: 45,
    favorited: 200,
    user: "cookingmama",
    img: "https://spicysouthernkitchen.com/wp-content/uploads/tofu-13.jpg",
  },
  {
    id: 3,
    name: "Chocolate cupcakes",
    description:
      "These cupcakes are perfectly light and fluffy with a chocolate frosting.",
    difficulty: 3,
    cookTime: 60,
    favorited: 100,
    user: "cookingmama",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5fzbFvsLGIsMdgkMl3N-ln_GgDGqWHvLjVA&s",
  },
];

function Home() {
  const [communityRecipes, setCommunityRecipes] = useState(
    COMMUNITY_RECIPES_DEFAULT
  );
  const [adminRecipes, setAdminRecipes] = useState(MOD_RECIPES_DEFAULT);
  const url = "http://localhost:8080/api/recipes";

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return Promise.reject(`Unexpected status code ${response.status}`);
        }
      })
      .then((data) => {
        return data.sort((a, b) => b.favorited - a.favorited).slice(0, 5);
      })
      .then(setCommunityRecipes)
      .catch((err) => console.error("Community fetch error:", err));
  }, []);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return Promise.reject(`Unexpected status code ${response.status}`);
        }
      })
      .then((data) => data.filter((r) => r.featured === true).slice(0, 3))
      .then(setAdminRecipes)
      .catch((err) => console.error("Admin fetch error:", err));
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-purple-100 via-transparent to-transparent pt-20 pb-10">
        <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-3 text-gray-900 sm:text-6xl ">
              See what's cooking in the community!
            </h1>
            <Carousel
              className="rounded-xl"
              navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-2 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                  {new Array(length).fill("").map((_, i) => (
                    <span
                      key={i}
                      className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                        activeIndex === i
                          ? "w-8 bg-gray-800"
                          : "w-4 bg-gray-400"
                      }`}
                      onClick={() => setActiveIndex(i)}
                    />
                  ))}
                </div>
              )}
              prevArrow={({ handlePrev }) => (
                <IconButton
                  variant="text"
                  color="black"
                  size="lg"
                  onClick={handlePrev}
                  className="!absolute top-2/4 left-4 -translate-y-2/4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                </IconButton>
              )}
              nextArrow={({ handleNext }) => (
                <IconButton
                  variant="text"
                  color="black"
                  size="lg"
                  onClick={handleNext}
                  className="!absolute top-2/4 !right-4 -translate-y-2/4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </IconButton>
              )}
            >
              {communityRecipes.map((recipe) => (
                <div
                  key={recipe.recipeId || recipe.id}
                  className="flex justify-center"
                >
                  <RecipeCard recipe={recipe} />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto mx-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-3 text-gray-900 sm:text-6xl ">
            Picks from our moderators
          </h1>
          <div className="relative mx-auto w-full z-10 grid grid-cols-1 gap-20 pt-14 sm:grid-cols-2 lg:grid-cols-3">
            {adminRecipes.map((recipe) => (
              <div key={recipe.recipeId || recipe.id}>
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
