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
    imageUrl: "",
};

function RecipeForm({ onSave, onCancel }) {
    const [recipe, setRecipe] = useState(RECIPE_DEFAULT);
    const [errors, setErrors] = useState([]);

    const [ingredients, setIngredients] = useState([]);
    const [ingredient, setIngredient] = useState({});

    const [instruction, setInstruction] = useState("");
    const [instructions, setInstructions] = useState([]);

    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");

    const { user, headers } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:8080/api/recipes/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.userId !== user?.userId) return;
                    setRecipe(data);
                })
                .catch((err) => console.error("Failed to fetch recipe:", err));
        }
    }, [id, user]);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:8080/api/recipe_ingredient/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    const IngredientMap = data.map(
                        ({ ingredientName, quantity, unit }) => ({
                            ingredientName,
                            ingredientQuantity: quantity,
                            ingredientUnit: unit,
                        })
                    );
                    setIngredients(IngredientMap || []);
                })
                .catch((err) => console.error("Failed to fetch recipe:", err));
        }
    }, [id, user]);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:8080/api/instruction/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    const instructionMap = data.map((data) => data.description);
                    setInstructions(instructionMap || []);
                })
                .catch((err) => console.error("Failed to fetch recipe:", err));
        }
    }, [id, user]);

    const handleInputChange = (e) => {
        setRecipe({ ...recipe, [e.target.name]: e.target.value });
    };

    const handleIngredientChange = (e) => {
        setIngredient({ ...ingredient, [e.target.name]: e.target.value });
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

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setUploadError("");
    };

    const handleUpload = async (recipeId) => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        setUploading(true);
        try {
            const res = await fetch(
                `http://localhost:8080/api/recipes/images/${recipeId}`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!res.ok) throw new Error(await res.text());

            const data = await res.json();

            // Update imageUrl and clear preview
            setRecipe((prev) => ({
                ...prev,
                imageUrl: data.imageUrl,
                previewUrl: null,
            }));

            setFile(null); // reset file input

            return data.imageUrl;
        } catch (err) {
            setUploadError("Image upload failed: " + err.message);
            return null;
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
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

        try {
            const res = await fetch(url, {
                method,
                headers,
                body: JSON.stringify(newRecipe),
            });
            if (res.status === 201 || res.status === 204) {
                // If it's a new recipe, get the created recipe with ID
                const updated = recipe?.userId ? recipe : await res.json();
                const recipeId = res.recipeId ? res.recipeId : updated.recipeId;

                const fetchedIngredients = await fetch(
                    "http://localhost:8080/api/ingredients"
                );
                const existingIngredients = await fetchedIngredients.json();
                for (let i of ingredients) {
                    if (
                        // Case where ingredient already exists in database
                        existingIngredients
                            .map((ing) => ing.name)
                            .includes(i.ingredientName)
                    ) {
                        let ingredientId = existingIngredients.find(
                            (ing) => ing.name === i.ingredientName
                        ).ingredientId;
                        const ingredient_recipe = {
                            recipeId: recipeId,
                            ingredientId: ingredientId,
                            unit: i.ingredientUnit,
                            quantity: i.ingredientQuantity,
                        };

                        const ingRes = await fetch(
                            "http://localhost:8080/api/recipe_ingredient",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(ingredient_recipe),
                            }
                        );
                        const ingResJson = await ingRes.json();
                    } else {
                        // Ingredient needs to be added to database
                        const addedIngredient = await fetch(
                            "http://localhost:8080/api/ingredients",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    name: i.ingredientName,
                                }),
                            }
                        );
                        const added = await addedIngredient.json();

                        const ingredient_recipe = {
                            recipeId: recipeId,
                            ingredientId: added.ingredientId,
                            unit: i.ingredientUnit,
                            quantity: i.ingredientQuantity,
                        };
                        const ingRes = await fetch(
                            "http://localhost:8080/api/recipe_ingredient",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(ingredient_recipe),
                            }
                        );
                    }
                }

                // Handle adding instructions to DB

                for (let i = 0; i < instructions.length; i++) {
                    const instructionToAdd = {
                        recipeId: recipeId,
                        stepNumber: i + 1,
                        description: instructions[i],
                    };
                    const instructionRes = await fetch(
                        "http://localhost:8080/api/instruction",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(instructionToAdd),
                        }
                    );
                }

                // If an image file was uploaded
                if (file) {
                    const imageUrl = await handleUpload(
                        updated.recipeId || updated.id
                    );
                    if (imageUrl) {
                        updated.imageUrl = imageUrl;

                        // 🔁 PATCH the imageUrl back to the recipe
                        await fetch(
                            `http://localhost:8080/api/recipes/${
                                updated.recipeId || updated.id
                            }`,
                            {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(updated),
                            }
                        );
                    }
                }

                onSave?.(updated);
                navigate(`/profile/${user.userId}`);
            } else if (res.status === 400) {
                const errData = await res.json();
                throw errData;
            } else {
                throw ["Unexpected server error."];
            }
        } catch (errs) {
            console.error(errs);
            setErrors(Array.isArray(errs) ? errs : ["An error occurred."]);
        }
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
                        className="w-full border rounded-md px-3 py-2"
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="block font-medium mb-1"
                    >
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={recipe.description}
                        onChange={handleInputChange}
                        required
                        className="w-full border rounded-md px-3 py-2"
                    />
                </div>

                {/* Image Upload */}
                <div className="mb-4">
                    <label className="block font-medium mb-1">
                        Recipe Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            handleFileChange(e);
                            const previewUrl = URL.createObjectURL(
                                e.target.files[0]
                            );
                            setRecipe((prev) => ({ ...prev, previewUrl }));
                        }}
                    />
                    {uploading && (
                        <p className="text-sm text-gray-500">Uploading...</p>
                    )}
                    {uploadError && (
                        <p className="text-red-600">{uploadError}</p>
                    )}
                    {(recipe.previewUrl || recipe.imageUrl) && (
                        <img
                            src={recipe.previewUrl || recipe.imageUrl}
                            alt="Recipe Preview"
                            className="mt-2 rounded max-h-40 mx-auto"
                        />
                    )}
                </div>

                {/* Ingredients */}
                <div className="mb-4">
                    <h3 className="font-semibold mb-2">Ingredients</h3>
                    {ingredients.map((ing, idx) => (
                        <p key={idx}>
                            {ing.ingredientQuantity}{" "}
                            {ing.ingredientUnit?.toLowerCase()}{" "}
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

                {/* Submit */}
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
