import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
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
  const [commentContent, setCommentContent] = useState("");
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const recipeUrl = "http://localhost:8080/api/recipes";
  const recipeIngredientUrl = "http://localhost:8080/api/recipe_ingredient";
  const instructionURL = "http://localhost:8080/api/instruction";
  const commentUrl = "http://localhost:8080/api/comment/recipe";

  useEffect(() => {
    if (!id) return setRecipe(RECIPE_DEFAULT);
    fetch(`${recipeUrl}/${id}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then(setRecipe)
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    if (!id) return;
    fetch(`${recipeIngredientUrl}/${id}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then(setIngredients)
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    if (!id) return;
    fetch(`${instructionURL}/${id}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then(setInstructions)
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    if (!id) return;
    fetch(`${commentUrl}/${id}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then(setComments)
      .catch(console.error);
  }, [id]);

  const handleAddComment = (e) => {
    e.preventDefault();
    const comment = {
      userId: user?.userId,
      recipeId: id,
      content: commentContent,
    };

    fetch("http://localhost:8080/api/comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setComments([...comments, data]);
          setCommentContent("");
        }
      })
      .catch(console.error);
  };

  return (
    <main className="bg-gray-100 min-h-screen py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">
            {recipe.name}
          </h1>
          <p className="text-gray-600 mb-6 italic">{recipe.description}</p>

          <img
            src={recipe.imageUrl || IMG_DEFAULT}
            alt={recipe.name}
            className="w-full max-h-[400px] object-cover rounded-lg shadow mb-6"
          />

          <div className="flex flex-col md:flex-row gap-8 mt-6">
            <section className="md:w-1/2">
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                Ingredients
              </h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {ingredients.map((ing, idx) => (
                  <li key={idx}>
                    {ing.quantity} {ing.unit} {ing.ingredientName}
                  </li>
                ))}
              </ul>
            </section>

            <section className="md:w-1/2">
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                Instructions
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                {instructions.map((step, idx) => (
                  <li key={idx}>{step.description}</li>
                ))}
              </ol>
            </section>
          </div>
        </div>

        <section className="mt-12 bg-white p-6 md:p-8 rounded-xl shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments</h2>

          <form onSubmit={handleAddComment} className="mb-8">
            <textarea
              id="comment"
              rows="4"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Leave your comment..."
              className="w-full p-4 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              required
            ></textarea>
            {user ? (
              <button
                type="submit"
                className="mt-4 px-5 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
              >
                Post Comment
              </button>
            ) : (
              <p className="mt-2 text-gray-500 italic">
                Please log in to leave a comment.
              </p>
            )}
          </form>

          <div className="space-y-4">
            {comments.length ? (
              comments.map((comment, idx) => (
                <Comment key={idx} comment={comment} />
              ))
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Recipe;
