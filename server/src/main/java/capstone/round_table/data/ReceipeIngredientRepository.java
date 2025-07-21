package capstone.round_table.data;

import capstone.round_table.models.Ingredient;
import capstone.round_table.models.RecipeIngredient;

import java.util.List;

public interface ReceipeIngredientRepository {
    List<Ingredient> findAllIngredientsByRecipeId(int recipeId);
    RecipeIngredient addRecipeIngredient(RecipeIngredient recipeIngredient);
    boolean updateRecipeIngredient(RecipeIngredient recipeIngredient);
    boolean deleteRecipeIngredient(RecipeIngredient recipeIngredient);
}
