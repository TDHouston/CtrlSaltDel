package capstone.round_table.data.recipe_category;

import capstone.round_table.models.Category;
import capstone.round_table.models.Recipe;
import capstone.round_table.models.RecipeCategory;

import java.util.List;

public interface RecipeCategoryRepository {

    List<Category> findAllCategoryByRecipeId(int recipeId);

    List<Recipe> findAllRecipeByCategoryId(int categoryId);

    boolean batchAddRecipeCategory(List<RecipeCategory> recipeCategories);

    boolean addRecipeCategory(int recipeId, int categoryId);

    boolean deleteRecipeCategory(int recipeId, int categoryId);


}
