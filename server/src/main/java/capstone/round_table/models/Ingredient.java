package capstone.round_table.models;

import java.util.List;
import java.util.Objects;

public class Ingredient {
    private int ingredientId;
    private String name;
    private List<RecipeIngredient> recipeIngredientList;

    public Ingredient(){}

    public Ingredient(String name){
        this.name = name;
    }

    public int getIngredientId() {
        return ingredientId;
    }

    public void setIngredientId(int ingredientId) {
        this.ingredientId = ingredientId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<RecipeIngredient> getRecipeIngredientList() {
        return recipeIngredientList;
    }

    public void setRecipeIngredientList(List<RecipeIngredient> recipeIngredientList) {
        this.recipeIngredientList = recipeIngredientList;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Ingredient that = (Ingredient) o;
        return ingredientId == that.ingredientId && Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(ingredientId, name, recipeIngredientList);
    }
}
