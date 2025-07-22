package capstone.round_table.models;

public class Favorite {

    private int recipeId;
    private int userId;

    public Favorite(int recipeId, int userId) {
        this.recipeId = recipeId;
        this.userId = userId;
    }

    public int getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(int recipeId) {
        this.recipeId = recipeId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
