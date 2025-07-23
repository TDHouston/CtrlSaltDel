package capstone.round_table.domain;

import capstone.round_table.data.ingredient.IngredientRepository;
import capstone.round_table.models.RecipeIngredient;
import capstone.round_table.models.Unit;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class RecipeIngredientServiceTest {

    @Autowired
    IngredientService service;

    @MockBean
    IngredientRepository repo;

    @Test
    void shouldAddRecipeIngredient() {
        List<RecipeIngredient> recipeIngredientList = Arrays.asList(
            new RecipeIngredient(10, 10, Unit.MILLILITER, BigDecimal.valueOf(1.25)),
            new RecipeIngredient(5, 6, Unit.KILOGRAM, BigDecimal.valueOf(3))
        );
    }

    @Test
    void batchAdd() {
    }

    @Test
    void findAllIngredientsByRecipeId() {
    }

    @Test
    void updateRecipeIngredient() {
    }

    @Test
    void deleteRecipeIngredient() {
    }
}