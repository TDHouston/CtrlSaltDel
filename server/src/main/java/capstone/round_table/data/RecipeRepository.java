package capstone.round_table.data;

import capstone.round_table.models.Recipe;

import java.util.List;

public interface RecipeRepository {
    // TODO: transaction annotations and getUserFavorite method

    Recipe addRecipe(Recipe recipe);
    List<Recipe> findAll();
    Recipe findByRecipeId(int recipeId);
    List<Recipe> findByUserId(int userId);
    boolean updateRecipe(Recipe recipe);
    boolean deleteRecipeById(int recipeId);
}
