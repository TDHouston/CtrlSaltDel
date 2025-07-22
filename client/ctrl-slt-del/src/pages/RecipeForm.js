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
  const [ingredient, setIngredient] = useState({});

  const [instruction, setInstruction] = useState("");
  const [instructions, setInstructions] = useState([]);

  const { id } = useParams();

  const addIngredient = (ingredient) => {
    setIngredients([...ingredients, ingredient]);
  };

  const handleIngredientChange = (event) => {
    const newIngredient = { ...ingredient };
    newIngredient[event.target.name] = event.target.value;
    setIngredient(newIngredient);
  };

  const handleInstructionChange = (event) => {
    setInstruction(event.target.value);
  };

  const addInstruction = (instruction) => {
    setInstructions([...instructions, instruction]);
  };

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
            <h1 className="block mb-2 text-xl font-semibold text-center font-medium text-gray-900 dark:text-white">
              Ingredients
            </h1>
            <div>
              {ingredients.map((ingredient) => (
                <p>
                  {ingredient.ingredientQuantity}{" "}
                  {ingredient.ingredientUnit.toString().toLowerCase()}{" "}
                  {ingredient.ingredientName}
                </p>
              ))}
            </div>
            <div className="mb-5">
              <label
                for="ingredientName"
                className="block mb-2 text- font-semibold text-center font-medium text-gray-900 dark:text-white"
              >
                Ingredient Name
              </label>
              <input
                type="text"
                name="ingredientName"
                id="ingredientName"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Egg"
                value={ingredient.ingredientName}
                onChange={handleIngredientChange}
                required
              />
              <div className="mb-5">
                <label
                  for="ingredientQuantity"
                  className="block mb-2 text-l font-semibold text-center font-medium text-gray-900 dark:text-white"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  name="ingredientQuantity"
                  id="ingredientQuantity"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="3"
                  value={ingredient.ingredientQuantity}
                  onChange={handleIngredientChange}
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  for="ingredientUnit"
                  className="block mb-2 text-l font-semibold text-center font-medium text-gray-900 dark:text-white"
                >
                  Unit
                </label>
                <select
                  id="ingredientUnit"
                  name="ingredientUnit"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={ingredient.ingredientUnit}
                  onChange={handleIngredientChange}
                >
                  <option value="">n/a</option>
                  <option value="TEASPOON">tsp</option>
                  <option value="TABLESPOON">tbsp</option>
                  <option value="CUP">cup</option>
                  <option value="FLUID_OUNCE">fl oz</option>
                  <option value="PINT">pt</option>
                  <option value="QUART">qt</option>
                  <option value="GALLON">gal</option>
                  <option value="OUNCE">oz</option>
                  <option value="POUND">lb</option>
                  <option value="MILLILITER">mL</option>
                  <option value="LITER">L</option>
                  <option value="GRAM">g</option>
                  <option value="KILOGRAM">kg</option>
                  <option value="PINCH">pinch</option>
                  <option value="SLICE">slice</option>
                </select>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="bg-blue-700 mb-3 hover:bg-blue-400 text-white p-2 rounded-xl"
            onClick={() => addIngredient(ingredient)}
          >
            Add ingredient
          </button>
          <h1 className="block mb-2 text-xl font-semibold text-center font-medium text-gray-900 dark:text-white">
            Instructions
          </h1>
          <div>
            {instructions.map((instruction) => (
              <p>{instruction}</p>
            ))}
          </div>
          <label
            for="instruction"
            className="block mb-2 text- font-semibold text-center font-medium text-gray-900 dark:text-white"
          >
            Instruction Name
          </label>
          <input
            type="text"
            name="ingredientName"
            id="ingredientName"
            class=" mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Beat until stiff peaks form"
            value={instruction}
            onChange={handleInstructionChange}
            required
          />
          <button
            type="button"
            className="bg-blue-700 mb-3 hover:bg-blue-400 text-white p-2 rounded-xl"
            onClick={() => addInstruction(instruction)}
          >
            Add instruction
          </button>
        </form>
      </section>
    </>
  );
}

export default RecipeForm;
