import { useState } from "react";
import RecipeCard from "../components/RecipeCard";

const RECIPES_DEFAULT = [
  {
    id: 1,
    name: "Crispy Chicken",
    description: "Delicious crispy chicken with a sweet chili dipping sauce!",
    difficulty: 3,
    cookTime: 30,
    upvotes: 300,
    user: "cookingmama",
    img: "https://www.stockvault.net/data/2016/04/19/194386/preview16.jpg",
  },
  {
    id: 2,
    name: "Tofu Stir-Fry",
    description: "Garlic tofu stir-fry with green beans and onions",
    difficulty: 5,
    cookTime: 45,
    upvotes: 200,
    user: "cookingmama",
    img: "https://spicysouthernkitchen.com/wp-content/uploads/tofu-13.jpg",
  },
  {
    id: 3,
    name: "Chocolate cupcakes",
    description:
      "These cupcakes are perfectly light and fluffy with a chocolate frosting.",
    difficulty: 2,
    cookTime: 60,
    upvotes: 100,
    user: "cookingmama",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5fzbFvsLGIsMdgkMl3N-ln_GgDGqWHvLjVA&s",
  },
  {
    id: 4,
    name: "Macaroni and cheese",
    description: "3 cheeses, all goodness.",
    difficulty: 2,
    cookTime: 20,
    upvotes: 200,
    user: "cookingmama",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8Zjy4R1VAkfSBhcHGe-whY1sL04epOzCYgA&s",
  },
  {
    id: 5,
    name: "Pizza",
    description: "It's not delivery - it's homemade.",
    difficulty: 7,
    cookTime: 30,
    upvotes: 50,
    user: "cookingmama",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBhqV7gsGTQ6K62gRiPUl_hHWJv71zgFEXzQ&s",
  },
];

const sorters = [
  "Upvotes (high to low)",
  "Upvotes (low to high)",
  "Difficulty (low to high)",
  "Difficulty (high to low)",
  "Cook time (low to high)",
  "Cook time (high to low)",
];

function Explore() {
  const [recipes, setRecipes] = useState(RECIPES_DEFAULT);
  const [sortBy, setSortBy] = useState("Upvotes (high to low)");
  const sortItems = () => {
    switch (sortBy) {
      case "Upvotes (high to low)":
        return recipes.sort((a, b) => b.upvotes - a.upvotes);
      case "Upvotes (low to high)":
        return recipes.sort((a, b) => a.upvotes - b.upvotes);
      case "Difficulty (low to high)":
        return recipes.sort((a, b) => a.difficulty - b.difficulty);
      case "Difficulty (high to low)":
        return recipes.sort((a, b) => b.difficulty - a.difficulty);
      case "Cook time (low to high)":
        return recipes.sort((a, b) => a.cookTime - b.cookTime);
      case "Cook time (high to low)":
        return recipes.sort((a, b) => b.cookTime - a.cookTime);
      default:
    }
  };

  return (
    <>
      <div className="container relative mx-auto">
        <header className="text-center text-6xl font-semibold">
          <h1>What's cooking?</h1>
        </header>
        <div className="container mx-auto p-5">
          <h1
            className="text-xl font-bold
                           mb-6 text-center"
          >
            Sort by
          </h1>

          <div className="flex justify-center space-x-4 mb-6">
            {sorters.map((sort) => (
              <button
                key={sort}
                onClick={() => setSortBy(sort)}
                className={`px-4 py-2 rounded-lg flex
                                    items-center 
                                    space-x-2 border ${
                                      sortBy === sort
                                        ? "bg-green-500 text-white"
                                        : "bg-white text-black"
                                    } hover:bg-green-300 transition`}
              >
                {" "}
                <span>{sort}</span>
              </button>
            ))}
          </div>
        </div>
        <section>
          <div className="relative mx-auto w-full z-10 grid justify-center grid-cols-1 gap-20 pt-14 sm:grid-cols-2 lg:grid-cols-3">
            {" "}
            {sortItems().map((recipe) => (
              <RecipeCard recipe={recipe} key={recipe.id} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default Explore;
