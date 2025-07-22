package capstone.round_table.data.recipe_ingredient;

import capstone.round_table.models.Ingredient;
import capstone.round_table.models.RecipeIngredient;

import java.util.List;

public interface RecipeIngredientRepository {
    RecipeIngredient addRecipeIngredient(RecipeIngredient recipeIngredient);

    List<RecipeIngredient> batchAddRecipeIngredient(List<RecipeIngredient> recipeIngredients);

    List<RecipeIngredient> findAllIngredientsByRecipeId(int recipeId);

    boolean updateRecipeIngredient(RecipeIngredient recipeIngredient);

    boolean deleteRecipeIngredient(RecipeIngredient recipeIngredient);
}
