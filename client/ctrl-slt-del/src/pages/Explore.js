import { useState, useContext } from "react";
import RecipeCard from "../components/RecipeCard";
import { RecipeContext } from "../helpers/RecipeContext";

const sorters = [
    "Favorites (high to low)",
    "Favorites (low to high)",
    "Cook time (low to high)",
    "Cook time (high to low)",
];

function Explore() {
    const [sortBy, setSortBy] = useState("Favorites (high to low)");
    const { recipes } = useContext(RecipeContext);

    const sortItems = () => {
        if (!recipes || !Array.isArray(recipes)) return [];
        switch (sortBy) {
            case "Favorited (high to low)":
                return recipes.sort((a, b) => b.favorited - a.favorited);
            case "Favorited (low to high)":
                return recipes.sort((a, b) => a.favorited - b.favorited);
            case "Cook time (low to high)":
                return recipes.sort((a, b) => a.cookTime - b.cookTime);
            case "Cook time (high to low)":
                return recipes.sort((a, b) => b.cookTime - a.cookTime);
            default:
                return recipes.sort((a, b) => b.favorited - a.favorited);
        }
    };

    return (
        <>
            <div className="container relative mx-auto">
                <header className="text-center text-6xl font-semibold">
                    <h1>What's cooking?</h1>
                </header>
                <div className="container mx-auto p-5">
                    <h1 className="text-xl font-bold mb-6 text-center">
                        Sort by
                    </h1>

                    <div className="flex justify-center space-x-4 mb-6">
                        {sorters.map((sort) => (
                            <button
                                key={sort}
                                onClick={() => setSortBy(sort)}
                                className={`px-4 py-2 rounded-lg flex items-center space-x-2 border ${
                                    sortBy === sort
                                        ? "bg-green-500 text-white"
                                        : "bg-white text-black"
                                } hover:bg-green-300 transition`}
                            >
                                <span>{sort}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <section>
                    <div className="relative mx-auto w-full z-10 grid justify-center grid-cols-1 gap-20 pt-14 sm:grid-cols-2 lg:grid-cols-3">
                        {sortItems().map((recipe) => (
                            <RecipeCard recipe={recipe} key={recipe.recipeId} />
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}

export default Explore;
