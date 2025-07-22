import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const RECIPE_DEFAULT = {
  name: "Chocolate Cake",
  difficulty: 3,
  cookTime: 45,
  servings: 8,
  description: "A delicious and decadent chocolate cake",
  instructions: [
    {
      stepNumber: 1,
      instruction: "Take your dry ingredients and mix them",
    },
    {
      stepNumber: 2,
      instruction: "Add wet ingredients and mix some more",
    },
    {
      stepNumber: 3,
      instruction: "Bake for 45 min",
    },
    {
      stepNumber: 4,
      instruction: "Cool, then frost if desired",
    },
  ],
  ingredients: [
    { name: "Flour", quantity: 2, unit: "cup" },
    { name: "Sugar", quantity: 1, unit: "cup" },
    { name: "Milk", quantity: 1, unit: "cup" },
    { name: "Butter", quantity: 1, unit: "cup" },
    { name: "Cocoa powder", quantity: 0.3, unit: "cup" },
  ],
  comments: [
    {
      user: "cookingpapa",
      comment: "Tried this cake and it was soooo good",
    },
    {
      user: "gianttroll",
      comment: "this sucks",
    },
  ],
};
function RecipeForm() {
  const [recipe, setRecipe] = useState(RECIPE_DEFAULT);
  const [errors, setErrors] = useState([]);

  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);

  const { id } = useParams();

  return (
    <>
      <section>
        <form className="text-center mx-auto max-w-2xl">
          <div className="mb-5">
            <label
              for="name"
              className="block mb-2 text-xl font-semibold text-center font-medium text-gray-900 dark:text-white"
            >
              What is your dish called?
            </label>
            <input
              type="text"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Amazing Recipe"
              required
            />
          </div>
          <div className="mb-5">
            <label
              for="description"
              className="block mb-2 text-xl font-semibold text-center font-medium text-gray-900 dark:text-white"
            >
              Add an awesome description for your recipe:
            </label>
            <textarea
              id="description"
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Delicious stew with beef, carrots, onions..."
            ></textarea>
          </div>
          <div className="mb-5">
            <label
              for="ingredients"
              className="block mb-2 text-xl font-semibold text-center font-medium text-gray-900 dark:text-white"
            >
              Ingredients
            </label>
            <button className="bg-blue-700 hover:bg-blue-400 text-white p-2 rounded-xl">
              Add ingredient
            </button>
            {ingredients.map((ingredient) => (
              <input
                type="text"
                id={ingredient.name}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Amazing Recipe"
                required
              />
            ))}
          </div>
        </form>
      </section>
    </>
  );
}

export default RecipeForm;
