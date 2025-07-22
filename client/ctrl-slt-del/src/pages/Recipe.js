import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "../components/Comment";

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

function Recipe() {
  const [recipe, setRecipe] = useState(RECIPE_DEFAULT);

  return (
    <>
      <body className="bg-gray-100">
        <div className="container mx-auto p-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4 ">{recipe.name}</h1>
            <h2 className="text-xl text-gray-800 mb-3">{recipe.description}</h2>
            <img
              className="mx-auto my-4 rounded-lg shadow"
              src="https://images.unsplash.com/photo-1616031037011-087000171abe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxM3x8Q2hvY29sYXRlJTIwQ2FrZXxlbnwwfDB8fHwxNjk0MTc2ODk0fDA&ixlib=rb-4.0.3&q=80&w=1080"
              alt="Chocolate Cake"
            ></img>

            <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
            <ul className="list-disc list-inside mb-4">
              {recipe.ingredients.map((ingredient) => (
                <li className="mb-2">
                  {ingredient.quantity} {ingredient.unit} {ingredient.name}
                </li>
              ))}
            </ul>

            <h2 className="text-xl font-semibold mb-2">Instructions</h2>
            <ol className="list-decimal list-inside mb-6">
              {recipe.instructions.map((instruction) => (
                <li className="mb-2">{instruction.instruction}</li>
              ))}
            </ol>
          </div>
        </div>
      </body>
      <section class="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
        <div class="max-w-2xl mx-auto px-4">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Comments
            </h2>
          </div>
          <form class="mb-6">
            <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label for="comment" class="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows="6"
                class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              Post comment
            </button>
          </form>
          {recipe.comments.map((comment) => (
            <Comment comment={comment} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Recipe;
