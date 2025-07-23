package capstone.round_table.models;

import java.math.BigDecimal;
import java.util.Objects;

public class RecipeIngredient {
    private int recipeId;
    private int ingredientId;
    private Unit unit;
    private BigDecimal quantity;
    private String ingredientName;

    public RecipeIngredient(){}

    public RecipeIngredient(int recipeId, int ingredientId, Unit unit, BigDecimal quantity) {
        this.recipeId = recipeId;
        this.ingredientId = ingredientId;
        this.unit = unit;
        this.quantity = quantity;
    }

    public int getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(int recipeId) {
        this.recipeId = recipeId;
    }

    public int getIngredientId() {
        return ingredientId;
    }

    public void setIngredientId(int ingredientId) {
        this.ingredientId = ingredientId;
    }

    public Unit getUnit() {
        return unit;
    }

    public void setUnit(Unit unit) {
        this.unit = unit;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public String getIngredientName() {
        return ingredientName;
    }

    public void setIngredientName(String ingredientName) {
        this.ingredientName = ingredientName;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        RecipeIngredient that = (RecipeIngredient) o;
        return recipeId == that.recipeId && ingredientId == that.ingredientId && unit == that.unit && Objects.equals(quantity, that.quantity);
    }

    @Override
    public int hashCode() {
        return Objects.hash(recipeId, ingredientId, unit, quantity);
    }
}
