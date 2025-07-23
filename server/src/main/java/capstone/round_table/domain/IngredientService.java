package capstone.round_table.domain;

import capstone.round_table.data.ingredient.IngredientRepository;
import capstone.round_table.models.Ingredient;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IngredientService {
    private final IngredientRepository ingredientRepo;
    private final Validator validator;
    private final String NOT_FOUND = "Ingredient ID: %s was not found.";

    public IngredientService(IngredientRepository repo, Validator validator) {
        this.ingredientRepo = repo;
        this.validator = validator;
    }

    /**
     * Adds ingredient if it doesn't already exist.
     * @param ingredient
     * @return
     */
    public Result<Ingredient> addIngredient(Ingredient ingredient) {
        Result<Ingredient> result = validate(ingredient);
        if (!result.isSuccess()) {
            return result;
        }

        result.setPayload(ingredientRepo.addIngredient(ingredient));
        return result;
    }

    /**
     * Returns list of all the ingredients.
     * @return
     */
    public List<Ingredient> findAll() {
        return ingredientRepo.findAll();
    }

    /**
     * Finds ingredient by given ingredient id.
     * @param ingredientId
     * @return
     */
    public Ingredient findById(int ingredientId) {
        return ingredientRepo.findById(ingredientId);
    }

    /**
     * Updates ingredient if name is not updated to a duplicate and id is valid.
     * @param ingredient
     * @return
     */
    public Result<Ingredient> updateIngredient(Ingredient ingredient) {
        // Check if name is a duplicate
        Result<Ingredient> result = validate(ingredient);
        if (!result.isSuccess()) {
            return result;
        }

        // Check if ID is valid
        validator.validate(ingredient.getIngredientId(), "Ingredient ID", result);
        if (!result.isSuccess()) {
            return result;
        }

        // Check if update was successful
        if (!ingredientRepo.updateIngredient(ingredient)) {
            result.addError(
                String.format(NOT_FOUND, ingredient.getIngredientId()), ResultType.NOT_FOUND
            );
        }

        return result;
    }

    /**
     * Delete ingredient if it exists.
     * @param ingredientId
     * @return
     */
    public Result<Ingredient> deleteIngredientById(int ingredientId) {
        Result<Ingredient> result = new Result<>();
        if (!ingredientRepo.deleteIngredientById(ingredientId)) {
            result.addError(
                String.format(NOT_FOUND, ingredientId), ResultType.NOT_FOUND
            );
        }
        return result;
    }

    // HELPER METHODS

    /**
     * Checks if ingredient name is a duplicate.
     * @param ingredient
     * @return
     */
    private Result<Ingredient> validate(Ingredient ingredient) {
        Result<Ingredient> result = new Result<>();

        if (findAll().stream()
            .anyMatch(i -> i.getName().equalsIgnoreCase(ingredient.getName()))
        ) {
            result.addError(
                String.format("Ingredient: %s is already in the system.", ingredient.getName()),
                ResultType.DUPLICATE
            );
        }

        return result;
    }
}
