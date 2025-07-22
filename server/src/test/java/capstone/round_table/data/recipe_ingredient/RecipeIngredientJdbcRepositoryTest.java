package capstone.round_table.data.recipe_ingredient;

import capstone.round_table.data.KnownGoodState;
import capstone.round_table.models.RecipeIngredient;
import capstone.round_table.models.Unit;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class RecipeIngredientJdbcRepositoryTest {

    @Autowired
    RecipeIngredientJdbcRepository repo;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() { knownGoodState.set(); }

    @Test
    void shouldAddRecipeIngredient() {
        RecipeIngredient ri = new RecipeIngredient(1, 1, null, BigDecimal.valueOf(2));
        RecipeIngredient actual = repo.addRecipeIngredient(ri);
        assertEquals(ri, actual);
    }

    @Test
    void shouldFindAllIngredientsByRecipeId() {
        List<RecipeIngredient> result = repo.findAllIngredientsByRecipeId(2);
        assertEquals(2, result.size());
    }

    @Test
    void shouldUpdateRecipeIngredient() {
        // (4, 4, "slice", 2)
        RecipeIngredient ri = new RecipeIngredient(
            4, 1, Unit.CUP, BigDecimal.valueOf(5)
        );

        assertTrue(repo.updateRecipeIngredient(ri));
    }

    @Test
    void shouldDeleteRecipeIngredient() {
        RecipeIngredient ri = new RecipeIngredient();
        ri.setRecipeId(5);
        ri.setIngredientId(5);
        assertTrue(repo.deleteRecipeIngredient(ri));
    }
}
