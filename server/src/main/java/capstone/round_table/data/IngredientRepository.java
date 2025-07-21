package capstone.round_table.data;

import capstone.round_table.models.Ingredient;

import java.util.List;

public interface IngredientRepository {
    Ingredient addIngredient(Ingredient ingredient);
    List<Ingredient> findAll();
    boolean updateIngredient(Ingredient ingredient);
    boolean deleteIngredientById(int ingredientId);
}
