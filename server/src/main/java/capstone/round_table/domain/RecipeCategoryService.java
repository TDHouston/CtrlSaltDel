package capstone.round_table.domain;

import capstone.round_table.data.recipe_category.RecipeCategoryRepository;
import capstone.round_table.models.Category;
import capstone.round_table.models.Recipe;
import capstone.round_table.models.RecipeCategory;

import java.util.List;

//    List<Category> findAllCategoryByRecipeId(int recipeId);
//
//    List<Recipe> findAllRecipeByCategoryId(int categoryId);
//
//    boolean batchAddRecipeCategory(List<RecipeCategory> recipeCategories);
//
//    boolean addRecipeCategory(int recipeId, int categoryId);
//
//    boolean deleteRecipeCategory(int recipeId, int categoryId);

public class RecipeCategoryService {
    public RecipeCategoryService(RecipeCategoryRepository recipeCategoryRepository) {
        this.recipeCategoryRepository = recipeCategoryRepository;
    }

    private final RecipeCategoryRepository recipeCategoryRepository;


    public List<Category> findAllCategoryByRecipeId(int recipeId) {
        return recipeCategoryRepository.findAllCategoryByRecipeId(recipeId);
    }

    public List<Recipe> findAllRecipeByCategoryId(int categoryId) {
        return recipeCategoryRepository.findAllRecipeByCategoryId(categoryId);
    }

    public boolean batchAddRecipeCategory(List<RecipeCategory> recipeCategories) {
        return recipeCategoryRepository.batchAddRecipeCategory(recipeCategories);
    }

    public boolean addRecipeCategory(int recipeId, int categoryId) {
        return recipeCategoryRepository.addRecipeCategory(recipeId, categoryId);
    }

    public boolean deleteRecipeCategory(int recipeId, int categoryId) {
        return recipeCategoryRepository.deleteRecipeCategory(recipeId, categoryId);
    }
}
