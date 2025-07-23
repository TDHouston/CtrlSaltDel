import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

const RECIPE_DEFAULT = {
  name: "",
  difficulty: 3,
  cookTime: 30,
  servings: 1,
  description: "",
  instructions: [],
  ingredients: [],
  comments: [],
};

function RecipeForm({ onSave, onCancel }) {
  const [recipe, setRecipe] = useState(RECIPE_DEFAULT);
  const [errors, setErrors] = useState([]);

  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState({});

  const [instruction, setInstruction] = useState("");
  const [instructions, setInstructions] = useState([]);

  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/api/recipes/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.userId !== user?.userId) {
            // Not this user's recipe — don't load it
            console.warn("This recipe does not belong to the current user.");
            return;
          }
          setRecipe(data);
          setIngredients(data.ingredients || []);
          setInstructions(data.instructions?.map((i) => i.instruction) || []);
        })
        .catch((err) => {
          console.error("Failed to fetch recipe for editing:", err);
        });
    }
  }, [id, user]);

  const handleInputChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleIngredientChange = (e) => {
    const newIngredient = { ...ingredient };
    newIngredient[e.target.name] = e.target.value;
    setIngredient(newIngredient);
  };

  const addIngredient = () => {
    if (
      ingredient.ingredientName &&
      ingredient.ingredientQuantity &&
      ingredient.ingredientUnit
    ) {
      setIngredients([...ingredients, ingredient]);
      setIngredient({});
    }
  };

  const handleInstructionChange = (e) => {
    setInstruction(e.target.value);
  };

  const addInstruction = () => {
    if (instruction.trim()) {
      setInstructions([...instructions, instruction]);
      setInstruction("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecipe = {
      ...recipe,
      ingredients,
      instructions: instructions.map((inst, index) => ({
        stepNumber: index + 1,
        instruction: inst,
      })),
      userId: user?.userId || 1,
    };

    const method = recipe?.userId ? "PUT" : "POST";
    const url = recipe?.userId
      ? `http://localhost:8080/api/recipes/${id}`
      : "http://localhost:8080/api/recipes";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    })
      .then((res) => {
        if (res.status === 201) return res.json();
        if (res.status === 204) return null; // just a success
        if (res.status === 400)
          return res.json().then((data) => Promise.reject(data));
        return Promise.reject(["Unexpected server error."]);
      })
      .then((data) => {
        onSave?.(data);
        navigate("/profile/" + user.userId);
      })
      .catch((errs) => {
        console.error(errs);
        setErrors(Array.isArray(errs) ? errs : ["An error occurred."]);
      });
  };

  return (
    <section>
      <form
        onSubmit={handleSubmit}
        className="text-center mx-auto max-w-2xl bg-white shadow-md p-8 rounded-md"
      >
        <h2 className="text-2xl font-bold mb-6">
          {recipe?.userId ? "Edit Recipe" : "Add a New Recipe"}
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-1">
            Recipe Name
          </label>
          <input
            name="name"
            value={recipe.name}
            onChange={handleInputChange}
            required
            placeholder="Amazing Recipe"
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={recipe.description}
            onChange={handleInputChange}
            required
            placeholder="What makes this dish special?"
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        {/* Ingredients */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Ingredients</h3>
          {ingredients.map((ing, idx) => (
            <p key={idx}>
              {ing.ingredientQuantity} {ing.ingredientUnit.toLowerCase()}{" "}
              {ing.ingredientName}
            </p>
          ))}

          <div className="grid grid-cols-3 gap-2 mt-2">
            <input
              type="text"
              name="ingredientName"
              placeholder="Name"
              value={ingredient.ingredientName || ""}
              onChange={handleIngredientChange}
              className="border rounded-md px-2 py-1"
            />
            <input
              type="number"
              name="ingredientQuantity"
              placeholder="Qty"
              value={ingredient.ingredientQuantity || ""}
              onChange={handleIngredientChange}
              className="border rounded-md px-2 py-1"
            />
            <select
              name="ingredientUnit"
              value={ingredient.ingredientUnit || ""}
              onChange={handleIngredientChange}
              className="border rounded-md px-2 py-1"
            >
              <option value="">unit</option>
              <option value="TEASPOON">tsp</option>
              <option value="TABLESPOON">tbsp</option>
              <option value="CUP">cup</option>
              <option value="OUNCE">oz</option>
              <option value="GRAM">g</option>
              <option value="KILOGRAM">kg</option>
              <option value="LITER">L</option>
              <option value="MILLILITER">mL</option>
              <option value="PINCH">pinch</option>
              <option value="SLICE">slice</option>
            </select>
          </div>

          <button
            type="button"
            onClick={addIngredient}
            className="mt-2 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-500"
          >
            Add Ingredient
          </button>
        </div>

        {/* Instructions */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Instructions</h3>
          {instructions.map((inst, i) => (
            <p key={i}>
              {i + 1}. {inst}
            </p>
          ))}
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={instruction}
              onChange={handleInstructionChange}
              placeholder="e.g., Preheat oven to 350°F"
              className="w-full border rounded-md px-2 py-1"
            />
            <button
              type="button"
              onClick={addInstruction}
              className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-500"
            >
              Add Step
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-md"
          >
            Save Recipe
          </button>
          <button
            type="button"
            onClick={() => {
              if (onCancel) {
                onCancel();
              } else {
                navigate(`/profile/${user?.userId}`);
              }
            }}
            className="bg-gray-400 hover:bg-gray-300 text-white px-6 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>

        {/* Errors */}
        {errors.length > 0 && (
          <div className="mt-4 text-red-600">
            {errors.map((err, idx) => (
              <p key={idx}>{err}</p>
            ))}
          </div>
        )}
      </form>
    </section>
  );
}

export default RecipeForm;
