package capstone.round_table.models;

import java.util.List;
import java.util.Objects;

public class Recipe {
    private int recipeId;
    private int userId;
    private String name;
    private Difficulty difficulty;
    private int cookTime;
    private int servings;
    private String description;
    private List<Category> categories;
    private String author;
    private int favorited;

    public Recipe(){}

    public Recipe(
        int userId,
        String name,
        Difficulty difficulty,
        int cookTime,
        int servings,
        String description
    ) {
        this.userId = userId;
        this.name = name;
        this.difficulty = difficulty;
        this.cookTime = cookTime;
        this.servings = servings;
        this.description = description;
    }

    public Recipe(
        int recipeId,
        int userId,
        String name,
        Difficulty difficulty,
        int cookTime,
        int servings,
        String description
    ) {
        this.recipeId = recipeId;
        this.userId = userId;
        this.name = name;
        this.difficulty = difficulty;
        this.cookTime = cookTime;
        this.servings = servings;
        this.description = description;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Difficulty getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(Difficulty difficulty) {
        this.difficulty = difficulty;
    }

    public int getCookTime() {
        return cookTime;
    }

    public void setCookTime(int cookTime) {
        this.cookTime = cookTime;
    }

    public int getServings() {
        return servings;
    }

    public void setServings(int servings) {
        this.servings = servings;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

    public int getFavorited() {
        return favorited;
    }

    public void setFavorited(int favorited) {
        this.favorited = favorited;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Recipe recipe = (Recipe) o;
        return recipeId == recipe.recipeId && userId == recipe.userId && cookTime == recipe.cookTime && servings == recipe.servings && Objects.equals(name, recipe.name) && difficulty == recipe.difficulty && Objects.equals(description, recipe.description);
    }

    public boolean equalsAnother(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Recipe recipe = (Recipe) o;
        return cookTime == recipe.cookTime && servings == recipe.servings && Objects.equals(name.toLowerCase(), recipe.name.toLowerCase()) && difficulty == recipe.difficulty && Objects.equals(description, recipe.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(recipeId, userId, name, difficulty, cookTime, servings, description, categories);
    }
}
