package capstone.round_table.data.Ingredient;

import capstone.round_table.data.KnownGoodState;
import capstone.round_table.models.Ingredient;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class IngredientJdbcRepositoryTest {

    @Autowired
    IngredientJdbcRepository repo;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() { knownGoodState.set(); }

    @Test
    void shouldAddIngredient() {
        Ingredient ingredient = new Ingredient("potato");
        Ingredient actual = repo.addIngredient(ingredient);
        assertEquals(9, actual.getIngredientId());
    }

    @Test
    void shouldFindAllIngredients() {
        List<Ingredient> ingredients = repo.findAll();
        assertTrue(ingredients.size() >= 7);
    }

    @Test
    void shouldFindById() {
        Ingredient ingredient = repo.findById(8);
        assertEquals("butter", ingredient.getName());
        assertEquals(2, ingredient.getRecipeIngredientList().size());
    }

    @Test
    void shouldUpdateIngredient() {
        Ingredient ingredient = repo.findById(7);
        ingredient.setName("tuna");
        assertTrue(repo.updateIngredient(ingredient));
    }

    @Test
    void shouldDeleteIngredientById() {
        assertTrue(repo.deleteIngredientById(2));
    }
}