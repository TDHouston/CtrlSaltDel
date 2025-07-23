import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "../components/Comment";

const RECIPE_DEFAULT = {
  name: "Chocolate Cake",
  difficulty: 3,
  cookTime: 45,
  servings: 8,
  description: "A delicious and decadent chocolate cake",
};

const IMG_DEFAULT = "https://cdn-icons-png.flaticon.com/512/1830/1830839.png";

function Recipe() {
  const [recipe, setRecipe] = useState(RECIPE_DEFAULT);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  const recipeUrl = "http://localhost:8080/api/recipes";
  const recipeIngredientUrl = "http://localhost:8080/api/recipe_ingredient";
  const instructionURL = "http://localhost:8080/api/instruction";
  const commentUrl = "http://localhost:8080/api/comment/recipe";

  useEffect(() => {
    if (id) {
      fetch(`${recipeUrl}/${id}`)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            return Promise.reject(`Unexpected Status Code: ${response.status}`);
          }
        })
        .then((data) => {
          setRecipe(data);
        })
        .catch(console.log);
    } else {
      setRecipe(RECIPE_DEFAULT);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetch(`${recipeIngredientUrl}/${id}`)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            return Promise.reject(`Unexpected Status Code: ${response.status}`);
          }
        })
        .then((data) => {
          setIngredients(data);
        })
        .catch(console.log);
    } else {
      setIngredients([]);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetch(`${instructionURL}/${id}`)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            return Promise.reject(`Unexpected Status Code: ${response.status}`);
          }
        })
        .then((data) => {
          setInstructions(data);
        })
        .catch(console.log);
    } else {
      setInstructions([]);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetch(`${commentUrl}/${id}`)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            return Promise.reject(`Unexpected Status Code: ${response.status}`);
          }
        })
        .then((data) => {
          setComments(data);
        })
        .catch(console.log);
    } else {
      setComments([]);
    }
  }, [id]);

  return (
    <>
      <body className="bg-gray-100">
        <div className="container mx-auto p-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4 ">{recipe.name}</h1>
            <h2 className="text-xl text-gray-800 mb-3">{recipe.description}</h2>
            <img
              className="mx-auto my-4 rounded-lg shadow"
              src={recipe.img ? recipe.img : IMG_DEFAULT}
              alt={recipe.description}
            ></img>

            <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
            <ul className="list-disc list-inside mb-4">
              {ingredients.map((ingredient) => (
                <li className="mb-2">
                  {ingredient.quantity} {ingredient.unit}{" "}
                  {ingredient.ingredientName}
                </li>
              ))}
            </ul>

            <h2 className="text-xl font-semibold mb-2">Instructions</h2>
            <ol className="list-decimal list-inside mb-6">
              {instructions.map((instruction) => (
                <li className="mb-2">{instruction.description}</li>
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
          {comments.map((comment) => (
            <Comment comment={comment} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Recipe;
