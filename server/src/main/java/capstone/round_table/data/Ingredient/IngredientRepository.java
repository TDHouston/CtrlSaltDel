package capstone.round_table.data.Ingredient;

import capstone.round_table.models.Ingredient;

import java.util.List;

public interface IngredientRepository {
    Ingredient addIngredient(Ingredient ingredient);

    List<Ingredient> findAll();

    Ingredient findById(int ingredientId);

    boolean updateIngredient(Ingredient ingredient);

    boolean deleteIngredientById(int ingredientId);
}
