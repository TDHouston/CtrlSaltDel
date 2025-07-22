package capstone.round_table.domain;

import capstone.round_table.data.recipe.RecipeRepository;
import capstone.round_table.models.Recipe;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {
    private final RecipeRepository recipeRepo;
    private final String NOT_FOUND = "Recipe ID: %s was not found.";

    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepo = recipeRepository;
    }

    /**
     * Add recipe if values are valid.
     * @param recipe
     * @return
     */
    public Result<Recipe> addRecipe(Recipe recipe) {
        Result<Recipe> result = validate(recipe);
        if (!result.isSuccess()) {
            return result;
        }

        result.setPayload(recipeRepo.addRecipe(recipe));
        return result;
    }

    /**
     * Returns all existing recipes.
     * @return
     */
    public List<Recipe> findAll() {
        return recipeRepo.findAll();
    }

    /**
     * Finds recipe by given recipe id.
     * @param recipeId
     * @return
     */
    public Recipe findByRecipeId(int recipeId) {
        return recipeRepo.findByRecipeId(recipeId);
    }

    /**
     * Finds list of recipes given user id.
     * @param userId
     * @return
     */
    public List<Recipe> findRecipeByUserId(int userId) {
        return recipeRepo.findRecipesByUserId(userId);
    }

    /**
     * Updates recipe if update values are valid.
     * @param recipe
     * @return
     */
    public Result<Recipe> updateRecipe(Recipe recipe) {
        Result<Recipe> result = validate(recipe);

        // Check if recipe_id that is being updated is valid
        validate(recipe.getRecipeId(), "Recipe ID", result);

        if (!result.isSuccess()) {
            return result;
        }

        if (!recipeRepo.updateRecipe(recipe)) {
            result.addError(String.format(NOT_FOUND, recipe.getRecipeId()), ResultType.NOT_FOUND);
        }
        return result;
    }

    public Result<Recipe> deleteRecipeById(int recipeId) {
        Result<Recipe> result = new Result<>();
        if (!recipeRepo.deleteRecipeById(recipeId)) {
            result.addError(String.format(NOT_FOUND, recipeId), ResultType.NOT_FOUND);
        }
        return result;
    }

    // HELPER METHODS

    /**
     * Validate recipe info.
     *  - user_id and name cannot be null
     *  - if cook_time or servings are null, value will = Integer.MIN_VALUE
     *  - if cook_time and servings are present, value must be greater than 0
     *
     * @param recipe
     * @return
     */
    private Result<Recipe> validate(Recipe recipe) {
        Result<Recipe> result = new Result<>();

        if (recipe.getName() == null || recipe.getName().isBlank()) {
            result.addError("Recipe name is required.", ResultType.MISSING_INFO);
        }

        // Validate user_id
        validate(recipe.getUserId(), "User ID", result);

        // Validate cook_time
        if (recipe.getCookTime() != Integer.MIN_VALUE) {
            validate(recipe.getCookTime(), "Cook Time", result);
        }

        // Validate servings
        if (recipe.getServings() != Integer.MIN_VALUE) {
            validate(recipe.getServings(), "Servings", result);
        }

        return result;
    }

    /**
     * Checks if number value is greater than zero, which indicates valid value.
     * @param num
     * @param type
     * @param result
     */
    private void validate(int num, String type, Result<Recipe> result) {
        if (num <= 0) {
            result.addError(
                String.format("%s must be greater than zero.", type),
                ResultType.INVALID
            );
        }
    }
}
