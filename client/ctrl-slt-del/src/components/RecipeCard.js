const PLACEHOLDER_IMG =
  "https://cdn-icons-png.flaticon.com/512/1830/1830839.png";
function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800">
      <img
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        src={recipe.img ? recipe.img : PLACEHOLDER_IMG}
        alt={recipe.description}
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {recipe.name}
        </h5>
        <h6 className="mb-3">
          authored by <span className="font-bold">{recipe.author}</span>
        </h6>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {recipe.description}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {recipe.cookTime}m • difficulty rating{" "}
          <span className="font-bold">{recipe.difficulty}</span>
        </p>
        <div className="flex flex-row">
          <p className="p-1 mr-1">favorited {recipe.favorited} times</p>
          <button className="mx-5 bg-yellow-200 rounded-xl p-1 hover:bg-yellow-400">
            Add to favorites
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
