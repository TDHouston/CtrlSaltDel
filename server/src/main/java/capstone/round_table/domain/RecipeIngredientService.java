package capstone.round_table.domain;

import capstone.round_table.data.recipe_ingredient.RecipeIngredientRepository;
import capstone.round_table.models.RecipeIngredient;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeIngredientService {
    private final RecipeIngredientRepository riRepo;
    private final Validator validator;
    private final String NOT_FOUND = "RecipeIngredient (recipe id: %s AND/OR ingredient id: %s) was not found.";

    public RecipeIngredientService(RecipeIngredientRepository riRepo, Validator validator) {
        this.riRepo = riRepo;
        this.validator = validator;
    }

    /**
     * Add a recipe paired w/ ingredient (RecipeIngredient) if values are valid.
     * @param ri
     * @return
     */
    public Result<RecipeIngredient> addRecipeIngredient(RecipeIngredient ri) {
        Result<RecipeIngredient> result = validate(ri);
        if (!result.isSuccess()) {
            return result;
        }

        result.setPayload(riRepo.addRecipeIngredient(ri));
        return result;
    }

    /**
     * Add multiple ingredients paired w/ a recipe.
     * @param recipeIngredients
     * @return
     */
    public Result<RecipeIngredient> batchAdd(List<RecipeIngredient> recipeIngredients) {
        for (RecipeIngredient ri : recipeIngredients) {
            Result<RecipeIngredient> result = addRecipeIngredient(ri);
            if (!result.isSuccess()) {
                return result;
            }
        }
        return new Result<RecipeIngredient>();
    }

    /**
     * Returns list of all ingredients for a recipe w/ ingredient name.
     * @param recipeId
     * @return
     */
    List<RecipeIngredient> findAllIngredientsByRecipeId(int recipeId) {
        return riRepo.findAllIngredientsByRecipeId(recipeId);
    }

    /**
     * Updates an ingredient info for a recipe.
     * @param ri
     * @return
     */
    public Result<RecipeIngredient> updateRecipeIngredient(RecipeIngredient ri) {
        // Validate attributes
        Result<RecipeIngredient> result = validate(ri);
        if (!result.isSuccess()) {
            return result;
        }

        // Check if update was successful
        if (!riRepo.updateRecipeIngredient(ri)) {
            result.addError(
                String.format(NOT_FOUND, ri.getRecipeId(), ri.getIngredientId()),
                ResultType.NOT_FOUND
            );
        }
        return result;
    }

    /**
     * Delete an ingredient for a recipe if it exists.
     * @param ri
     * @return
     */
    public Result<RecipeIngredient> deleteRecipeIngredient(RecipeIngredient ri) {
        Result<RecipeIngredient> result = new Result<>();

        // Check if delete was successful
        if (!riRepo.deleteRecipeIngredient(ri)) {
            result.addError(
                String.format(NOT_FOUND, ri.getRecipeId(), ri.getIngredientId()),
                ResultType.NOT_FOUND
            );
        }
        return result;
    }

    // HELPER METHODS

    /**
     * Validate RecipeIngredient info.
     *  - recipe_id and ingredient_id cannot be null
     *  - if quantity was inputted, value must be greater than 0
     *  - (recipe_id, ingredient_id) must be a unique pair
     * @param ri
     * @return
     */
    private Result<RecipeIngredient> validate(RecipeIngredient ri) {
        Result<RecipeIngredient> result = new Result<>();

        // Validate IDs
        validator.validate(ri.getRecipeId(), "Recipe ID", result);
        validator.validate(ri.getIngredientId(), "Ingredient ID", result);

        // Validate quantity
        if (ri.getUnit() != null) {
            validator.validate(ri.getQuantity(), "Quantity", result);
        }

        if (!result.isSuccess()) {
            return result;
        }

        // Check for duplicate
        validate(ri, result);

        return result;
    }

    /**
     * Checks if ingredient is already added/included/paired with this recipe.
     * Each pair (recipe_id, ingredient_id) must be unique.
     * @param ri
     * @param result
     */
    private void validate(RecipeIngredient ri, Result<RecipeIngredient> result) {
        if (findAllIngredientsByRecipeId(ri.getRecipeId()).stream()
            .anyMatch(r -> r.getIngredientId() == ri.getIngredientId())
        ) {
            result.addError(
                String.format("(Recipe ID: %s, Ingredient ID: %s) is already in the system.",
                    ri.getRecipeId(), ri.getIngredientId()
                ), ResultType.DUPLICATE
            );
        }
    }

}
