import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { API_ENDPOINTS } from "../config/api";

const RECIPE_DEFAULT = {
    name: "",
    difficulty: "EASY",
    cookTime: 0,
    servings: 0,
    description: "",
    instructions: [],
    ingredients: [],
    comments: [],
    imageUrl: "",
};

function RecipeForm({ onSave, onCancel }) {
    const [recipe, setRecipe] = useState(RECIPE_DEFAULT);
    const [errors, setErrors] = useState([]);

    const [ingredientKeys, setIngredientKeys] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [ingredient, setIngredient] = useState({});
    const [ingridentStageToDelete, setIngredientStageToDelete] = useState([]);

    const [instructionKeys, setInstructionKeys] = useState([]);
    const [instruction, setInstruction] = useState("");
    const [instructions, setInstructions] = useState([]);
    const [instructionStageToDelete, setInstructionStageToDelete] = useState(
        []
    );

    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");

    const { user, token } = useContext(AuthContext);
    const { recipeId } = useParams();
    const { recipeId: idToCheck } = useParams();
    const navigate = useNavigate();

    // Authentication check - redirect to login if not authenticated
    useEffect(() => {
        if (!user || !token) {
            navigate('/login');
            return;
        }
    }, [user, token, navigate]);

    useEffect(() => {
        if (recipeId && user && token) {
            fetch(API_ENDPOINTS.RECIPES.BY_ID(recipeId), {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
                .then((res) => {
                    if (!res.ok) {
                        if (res.status === 401 || res.status === 403) {
                            navigate('/login');
                            return;
                        }
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
                .then((data) => {
                    // Only allow editing if user owns the recipe or user is admin
                    if (data.userId !== user.userId && user.role !== "ADMIN") {
                        alert("You can only edit your own recipes.");
                        navigate('/');
                        return;
                    }
                    setRecipe(data);
                })
                .catch((err) => {
                    console.error("Failed to fetch recipe:", err);
                    if (err.message.includes('401') || err.message.includes('403')) {
                        navigate('/login');
                    }
                });
        }
    }, [recipeId, user, token, navigate]);

    useEffect(() => {
        if (recipeId && user && token) {
            fetch(`${API_ENDPOINTS.RECIPES.BASE.replace('/recipes', '/recipe_ingredient')}/${recipeId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
                .then((res) => {
                    if (!res.ok) {
                        if (res.status === 401 || res.status === 403) {
                            navigate('/login');
                            return;
                        }
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
                .then((data) => {
                    const ingredientKey = data.map((data) => data.ingredientId);
                    const IngredientMap = data.map(
                        ({ ingredientName, quantity, unit }) => ({
                            ingredientName,
                            ingredientQuantity: quantity,
                            ingredientUnit: unit,
                        })
                    );
                    setIngredients(IngredientMap || []);
                    setIngredientKeys(ingredientKey);
                })
                .catch((err) => {
                    console.error("Failed to fetch ingredients:", err);
                    if (err.message.includes('401') || err.message.includes('403')) {
                        navigate('/login');
                    }
                });
        }
    }, [recipeId, user, token, navigate]);

    useEffect(() => {
        if (recipeId && user && token) {
            fetch(`${API_ENDPOINTS.RECIPES.BASE.replace('/recipes', '/instruction')}/${recipeId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
                .then((res) => {
                    if (!res.ok) {
                        if (res.status === 401 || res.status === 403) {
                            navigate('/login');
                            return;
                        }
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
                .then((data) => {
                    const instructionMap = data.map((data) => data.description);
                    const InstrunctionKey = data.map(
                        (data) => data.instructionId
                    );
                    setInstructions(instructionMap || []);
                    setInstructionKeys(InstrunctionKey);
                })
                .catch((err) => {
                    console.error("Failed to fetch instructions:", err);
                    if (err.message.includes('401') || err.message.includes('403')) {
                        navigate('/login');
                    }
                });
        }
    }, [recipeId, user, token, navigate]);

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

    const handleDeleteInstruction = (id) => {
        let key = instructionKeys.splice(id, 1);
        instructions.splice(id, 1);
        setInstructionKeys([...instructionKeys]);
        setInstructions([...instructions]);
        let stage = [...instructionStageToDelete];
        stage.push(key);
        setInstructionStageToDelete(stage);
        console.log(stage);
    };

    const handleDeleteIngredient = (id) => {
        let key = ingredientKeys.splice(id, 1);
        ingredients.splice(id, 1);
        setIngredientKeys([...ingredientKeys]);
        setIngredients([...ingredients]);
        let stage = [...ingridentStageToDelete];
        stage.push(key);
        setIngredientStageToDelete(stage);
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

    const handleUpload = async (RecipeId) => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        setUploading(true);
        try {
            const res = await fetch(
                API_ENDPOINTS.RECIPES.IMAGES(RecipeId),
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    body: formData,
                }
            );

            if (!res.ok) {
                if (res.status === 401 || res.status === 403) {
                    navigate('/login');
                    return null;
                }
                throw new Error(await res.text());
            }

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
            ? API_ENDPOINTS.RECIPES.BY_ID(recipeId)
            : API_ENDPOINTS.RECIPES.BASE;

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newRecipe),
            });
            if (res.status === 201 || res.status === 204) {
                if (idToCheck) {
                    const url = `${API_ENDPOINTS.RECIPES.BASE.replace('/recipes', '/ingredients')}`;
                    try {
                        for (
                            let i = 0;
                            i < ingridentStageToDelete.length;
                            i++
                        ) {
                            fetch(`${url}/${ingridentStageToDelete[i]}`, {
                                method: "DELETE",
                                headers: {
                                    "Authorization": `Bearer ${token}`,
                                    "Content-Type": "application/json"
                                }
                            });
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }

                // If it's a new recipe, get the created recipe with ID
                const updated = recipe?.userId ? recipe : await res.json();
                const recipeId = res.recipeId ? res.recipeId : updated.recipeId;

                const fetchedIngredients = await fetch(
                    `${API_ENDPOINTS.RECIPES.BASE.replace('/recipes', '/ingredients')}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
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

                        await fetch(
                            `${API_ENDPOINTS.RECIPES.BASE.replace('/recipes', '/recipe_ingredient')}`,
                            {
                                method: "POST",
                                headers: {
                                    "Authorization": `Bearer ${token}`,
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(ingredient_recipe),
                            }
                        );
                    } else {
                        // Ingredient needs to be added to database
                        const addedIngredient = await fetch(
                            `${API_ENDPOINTS.RECIPES.BASE.replace('/recipes', '/ingredients')}`,
                            {
                                method: "POST",
                                headers: {
                                    "Authorization": `Bearer ${token}`,
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
                        await fetch(
                            `${API_ENDPOINTS.RECIPES.BASE.replace('/recipes', '/recipe_ingredient')}`,
                            {
                                method: "POST",
                                headers: {
                                    "Authorization": `Bearer ${token}`,
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(ingredient_recipe),
                            }
                        );
                    }
                }

                // Handle adding instructions to DB

                if (recipeId) {
                    const url = `${API_ENDPOINTS.RECIPES.BASE.replace('/recipes', '/instruction')}`;
                    try {
                        for (
                            let i = 0;
                            i < instructionStageToDelete.length;
                            i++
                        ) {
                            fetch(`${url}/${instructionStageToDelete[i]}`, {
                                method: "DELETE",
                                headers: {
                                    "Authorization": `Bearer ${token}`,
                                    "Content-Type": "application/json"
                                }
                            });
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }

                for (let i = 0; i < instructions.length; i++) {
                    const instructionToAdd = {
                        recipeId: recipeId,
                        stepNumber: i + 1,
                        description: instructions[i],
                    };
                    await fetch(
                        `${API_ENDPOINTS.RECIPES.BASE.replace('/recipes', '/instruction')}`,
                        {
                            method: "POST",
                            headers: {
                                "Authorization": `Bearer ${token}`,
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
                            API_ENDPOINTS.RECIPES.BY_ID(updated.recipeId || updated.id),
                            {
                                method: "PUT",
                                headers: { 
                                    "Authorization": `Bearer ${token}`,
                                    "Content-Type": "application/json" 
                                },
                                body: JSON.stringify(updated),
                            }
                        );
                    }
                }

                onSave?.(updated);
                navigate('/profile');
            } else if (res.status === 401 || res.status === 403) {
                alert("Your session has expired. Please log in again.");
                navigate('/login');
                return;
            } else if (res.status === 400) {
                const errData = await res.json();
                throw errData;
            } else {
                throw new Error("Unexpected server error.");
            }
        } catch (errs) {
            console.error(errs);
            if (errs.message && (errs.message.includes('401') || errs.message.includes('403'))) {
                alert("Your session has expired. Please log in again.");
                navigate('/login');
                return;
            }
            setErrors(Array.isArray(errs) ? errs : ["An error occurred."]);
        }
    };

    return (
        <section className="max-w-4xl mx-auto">
            <form
                onSubmit={handleSubmit}
                className="space-y-8"
            >
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {recipe?.userId ? "Edit Recipe" : "Create New Recipe"}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        {recipe?.userId ? "Update your recipe details" : "Share your culinary masterpiece with the community"}
                    </p>
                </div>

                {/* Basic Information Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Basic Information</h3>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Recipe Name *
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={recipe.name}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter a delicious recipe name..."
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Description *
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={recipe.description}
                                onChange={handleInputChange}
                                required
                                rows={4}
                                placeholder="Describe your recipe - what makes it special?"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="cookTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Cook Time (minutes)
                                </label>
                                <input
                                    id="cookTime"
                                    type="number"
                                    name="cookTime"
                                    min="1"
                                    value={recipe.cookTime || ""}
                                    onChange={handleInputChange}
                                    placeholder="30"
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="servings" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Servings
                                </label>
                                <input
                                    id="servings"
                                    type="number"
                                    name="servings"
                                    min="1"
                                    value={recipe.servings || ""}
                                    onChange={handleInputChange}
                                    placeholder="4"
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Difficulty Level
                                </label>
                                <select
                                    id="difficulty"
                                    name="difficulty"
                                    value={recipe.difficulty}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                >
                                    <option value="EASY">Easy</option>
                                    <option value="INTERMEDIATE">Intermediate</option>
                                    <option value="ADVANCED">Advanced</option>
                                    <option value="EXPERT">Expert</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Image Upload Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                            <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Recipe Image</h3>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Upload an appetizing photo of your recipe
                            </label>
                            <div className="relative">
                                <input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        if (e.target.files[0]) {
                                            handleFileChange(e);
                                            const previewUrl = URL.createObjectURL(e.target.files[0]);
                                            setRecipe((prev) => ({ ...prev, previewUrl }));
                                        }
                                    }}
                                    className="w-full px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 dark:file:bg-purple-900/20 dark:file:text-purple-400 dark:hover:file:bg-purple-900/30"
                                />
                                {uploading && (
                                    <div className="absolute inset-0 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 rounded-xl flex items-center justify-center">
                                        <div className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400">
                                            <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0V9a8 8 0 1115.356 2M15 15v4h5m-5-4a8 8 0 01-15.356 2" />
                                            </svg>
                                            Uploading...
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {uploadError && (
                            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                <p className="text-sm text-red-700 dark:text-red-400">{uploadError}</p>
                            </div>
                        )}
                        
                        {(recipe.previewUrl || recipe.imageUrl) && (
                            <div className="relative max-w-md mx-auto">
                                <img
                                    src={recipe.previewUrl || recipe.imageUrl}
                                    alt="Recipe Preview"
                                    className="w-full h-48 object-cover rounded-xl shadow-md"
                                />
                                <div className="absolute top-2 right-2">
                                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-lg">
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Image Ready
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Ingredients Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                            <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Ingredients</h3>
                    </div>

                    {/* Ingredient List */}
                    {ingredients.length > 0 && (
                        <div className="mb-6 space-y-3">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Added Ingredients:</h4>
                            {ingredients.map((ing, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <span className="text-sm text-gray-900 dark:text-gray-100">
                                        <span className="font-medium">{ing.ingredientQuantity}</span>
                                        <span className="text-gray-500 dark:text-gray-400 mx-1">
                                            {ing.ingredientUnit?.toLowerCase()}
                                        </span>
                                        <span className="font-medium">{ing.ingredientName}</span>
                                    </span>
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/20 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors duration-200"
                                        onClick={() => handleDeleteIngredient(idx)}
                                    >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Add New Ingredient */}
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-4">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Add New Ingredient:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <input
                                type="text"
                                name="ingredientName"
                                placeholder="Ingredient name (e.g., flour)"
                                value={ingredient.ingredientName || ""}
                                onChange={handleIngredientChange}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                            />
                            <input
                                type="number"
                                name="ingredientQuantity"
                                placeholder="Amount (e.g., 2)"
                                min="0"
                                step="0.01"
                                value={ingredient.ingredientQuantity || ""}
                                onChange={handleIngredientChange}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                            />
                            <select
                                name="ingredientUnit"
                                value={ingredient.ingredientUnit || ""}
                                onChange={handleIngredientChange}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                            >
                                <option value="">Select unit</option>
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
                                <option value="PIECE">piece</option>
                                <option value="CLOVE">clove</option>
                                <option value="BUNCH">bunch</option>
                            </select>
                        </div>
                        <button
                            type="button"
                            onClick={addIngredient}
                            disabled={!ingredient.ingredientName || !ingredient.ingredientQuantity || !ingredient.ingredientUnit}
                            className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-all duration-200"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Ingredient
                        </button>
                    </div>
                </div>

                {/* Instructions Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
                            <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Cooking Instructions</h3>
                    </div>

                    {/* Instructions List */}
                    {instructions.length > 0 && (
                        <div className="mb-6 space-y-3">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Step by Step Instructions:</h4>
                            {instructions.map((inst, i) => (
                                <div key={i} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <div className="flex-shrink-0 w-8 h-8 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                                        <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">{i + 1}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-900 dark:text-gray-100 leading-relaxed">
                                            {inst}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/20 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors duration-200"
                                        onClick={() => handleDeleteInstruction(i)}
                                    >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Add New Instruction */}
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-4">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Add Step {instructions.length + 1}:
                        </h4>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={instruction}
                                onChange={handleInstructionChange}
                                placeholder="e.g., Preheat oven to 350°F and grease a 9x13 inch baking pan..."
                                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                            />
                            <button
                                type="button"
                                onClick={addInstruction}
                                disabled={!instruction.trim()}
                                className="inline-flex items-center gap-2 px-4 py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-all duration-200"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add Step
                            </button>
                        </div>
                    </div>
                </div>

                {/* Submit Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            type="submit"
                            disabled={!recipe.name || !recipe.description || ingredients.length === 0 || instructions.length === 0}
                            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                            </svg>
                            {recipe?.userId ? "Update Recipe" : "Save Recipe"}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                if (onCancel) {
                                    onCancel();
                                } else {
                                    navigate('/profile');
                                }
                            }}
                            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-xl border border-gray-300 dark:border-gray-600 transition-all duration-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Cancel
                        </button>
                    </div>
                    
                    {/* Form validation hints */}
                    {(!recipe.name || !recipe.description || ingredients.length === 0 || instructions.length === 0) && (
                        <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                            <div className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <h4 className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-1">Complete all required fields:</h4>
                                    <ul className="text-xs text-amber-700 dark:text-amber-300 space-y-1">
                                        {!recipe.name && <li>• Recipe name is required</li>}
                                        {!recipe.description && <li>• Recipe description is required</li>}
                                        {ingredients.length === 0 && <li>• At least one ingredient is required</li>}
                                        {instructions.length === 0 && <li>• At least one instruction step is required</li>}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {errors.length > 0 && (
                    <div className="mt-4 text-red-600 dark:text-red-400">
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
