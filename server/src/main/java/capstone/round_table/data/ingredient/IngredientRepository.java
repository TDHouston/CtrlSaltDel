package capstone.round_table.data.ingredient;

import capstone.round_table.models.Ingredient;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IngredientRepository {
    Ingredient addIngredient(Ingredient ingredient);

    List<Ingredient> findAll();

    @Transactional
    Ingredient findById(int ingredientId);

    boolean updateIngredient(Ingredient ingredient);

    @Transactional
    boolean deleteIngredientById(int ingredientId);
}
