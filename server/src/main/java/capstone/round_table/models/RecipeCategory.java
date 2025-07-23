package capstone.round_table.models;

public class RecipeCategory {
    int recipeId;
    int categoryId;

    public RecipeCategory() {
    }

    public void setRecipeId(int recipeId) {
        this.recipeId = recipeId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public int getRecipeId() {
        return recipeId;
    }

    public int getCategoryId() {
        return categoryId;
    }
}
