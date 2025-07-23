package capstone.round_table.models;

import java.util.List;
import java.util.Objects;

public class Ingredient {
    private int ingredientId;
    private String name;
    private List<Recipe> recipesWithIngredient;

    public Ingredient(){}

    public Ingredient(String name){
        this.name = name;
    }

    public Ingredient(int ingredientId, String name){
        this.ingredientId = ingredientId;
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

    public List<Recipe> getRecipesWithIngredient() {
        return recipesWithIngredient;
    }

    public void setRecipesWithIngredient(List<Recipe> recipesWithIngredient) {
        this.recipesWithIngredient = recipesWithIngredient;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Ingredient that = (Ingredient) o;
        return ingredientId == that.ingredientId && Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(ingredientId, name, recipesWithIngredient);
    }
}
