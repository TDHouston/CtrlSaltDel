package capstone.round_table.domain;

import capstone.round_table.data.recipe_ingredient.RecipeIngredientRepository;
import capstone.round_table.models.RecipeIngredient;
import capstone.round_table.models.Unit;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class RecipeIngredientServiceTest {

    @Autowired
    RecipeIngredientService service;

    @MockBean
    RecipeIngredientRepository repo;

    @Test
    void shouldAddRecipeIngredient() {
        List<RecipeIngredient> recipeIngredientList = Arrays.asList(
            new RecipeIngredient(10, 10, Unit.MILLILITER, BigDecimal.valueOf(1.25))
        );
        when(repo.findAllIngredientsByRecipeId(10)).thenReturn(recipeIngredientList);

        RecipeIngredient ri = new RecipeIngredient(10, 8, Unit.FLUID_OUNCE, BigDecimal.ONE);
        when(repo.addRecipeIngredient(ri)).thenReturn(ri);

        Result<RecipeIngredient> result = service.addRecipeIngredient(ri);
        assertEquals(ResultType.SUCCESS, result.getType());
        assertEquals(ri, result.getPayload());
    }

    @Test
    void shouldNotAddRecipeIdEqualZero() {
        RecipeIngredient ri = new RecipeIngredient(0, 8, Unit.FLUID_OUNCE, BigDecimal.ONE);

        Result<RecipeIngredient> result = service.addRecipeIngredient(ri);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Recipe ID must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotAddIngredientIdEqualZero() {
        RecipeIngredient ri = new RecipeIngredient(10, 0, Unit.FLUID_OUNCE, BigDecimal.ONE);

        Result<RecipeIngredient> result = service.addRecipeIngredient(ri);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Ingredient ID must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotAddNegativeRecipeId() {
        RecipeIngredient ri = new RecipeIngredient(-10, 8, Unit.FLUID_OUNCE, BigDecimal.ONE);

        Result<RecipeIngredient> result = service.addRecipeIngredient(ri);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Recipe ID must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotAddNegativeIngredientId() {
        RecipeIngredient ri = new RecipeIngredient(10, -8, Unit.FLUID_OUNCE, BigDecimal.ONE);

        Result<RecipeIngredient> result = service.addRecipeIngredient(ri);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Ingredient ID must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotAddNegativeQuantity() {
        RecipeIngredient ri = new RecipeIngredient(10, 8, Unit.FLUID_OUNCE, BigDecimal.valueOf(-1));

        Result<RecipeIngredient> result = service.addRecipeIngredient(ri);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Quantity must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotAddQuantityEqualZero() {
        RecipeIngredient ri = new RecipeIngredient(10, 8, Unit.FLUID_OUNCE, BigDecimal.ZERO);

        Result<RecipeIngredient> result = service.addRecipeIngredient(ri);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Quantity must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotAddDuplicateRecipeIngredient() {
        List<RecipeIngredient> recipeIngredientList = Arrays.asList(
            new RecipeIngredient(10, 10, Unit.MILLILITER, BigDecimal.valueOf(1.25))
        );
        when(repo.findAllIngredientsByRecipeId(10)).thenReturn(recipeIngredientList);
        RecipeIngredient ri = new RecipeIngredient(10, 10, Unit.FLUID_OUNCE, BigDecimal.ONE);

        Result<RecipeIngredient> result = service.addRecipeIngredient(ri);
        assertEquals(ResultType.DUPLICATE, result.getType());
        assertEquals("(Recipe ID: 10, Ingredient ID: 10) is already in the system.", result.getErrors().get(0));
    }

    @Test
    void shouldBatchAdd() {
        RecipeIngredient ri = new RecipeIngredient(5, 2, Unit.MILLILITER, BigDecimal.valueOf(1.25));
        RecipeIngredient ri2 = new RecipeIngredient(5, 6, Unit.FLUID_OUNCE, BigDecimal.valueOf(3));
        List<RecipeIngredient> recipeIngredientList = Arrays.asList(ri, ri2);

        when(repo.findAllIngredientsByRecipeId(5)).thenReturn(new ArrayList<>());
        when(repo.addRecipeIngredient(ri)).thenReturn(ri);
        when(repo.addRecipeIngredient(ri2)).thenReturn(ri2);

        Result<RecipeIngredient> result = service.batchAdd(recipeIngredientList);
        assertEquals(ResultType.SUCCESS, result.getType());
    }

    @Test
    void shouldNotBatchAddDuplicate() {
        RecipeIngredient ri = new RecipeIngredient(5, 2, Unit.MILLILITER, BigDecimal.valueOf(1.25));
        RecipeIngredient ri2 = new RecipeIngredient(5, 6, Unit.FLUID_OUNCE, BigDecimal.valueOf(3));
        List<RecipeIngredient> recipeIngredientList = Arrays.asList(ri, ri2);

        when(repo.findAllIngredientsByRecipeId(5)).thenReturn(
            List.of(new RecipeIngredient(5, 2, Unit.MILLILITER, BigDecimal.valueOf(1.25))
        ));

        Result<RecipeIngredient> result = service.batchAdd(recipeIngredientList);
        assertEquals(ResultType.DUPLICATE, result.getType());
        assertEquals("(Recipe ID: 5, Ingredient ID: 2) is already in the system.", result.getErrors().get(0));
    }

    @Test
    void shouldNotBatchAddNegativeRecipeId() {
        RecipeIngredient ri = new RecipeIngredient(-5, 2, Unit.MILLILITER, BigDecimal.valueOf(1.25));
        RecipeIngredient ri2 = new RecipeIngredient(5, 6, Unit.FLUID_OUNCE, BigDecimal.valueOf(3));
        List<RecipeIngredient> recipeIngredientList = Arrays.asList(ri, ri2);

        Result<RecipeIngredient> result = service.batchAdd(recipeIngredientList);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Recipe ID must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotBatchAddRecipeIdEqualZero() {
        RecipeIngredient ri = new RecipeIngredient(0, 2, Unit.MILLILITER, BigDecimal.valueOf(1.25));
        RecipeIngredient ri2 = new RecipeIngredient(5, 6, Unit.FLUID_OUNCE, BigDecimal.valueOf(3));
        List<RecipeIngredient> recipeIngredientList = Arrays.asList(ri, ri2);

        Result<RecipeIngredient> result = service.batchAdd(recipeIngredientList);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Recipe ID must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotBatchAddNegativeIngredientId() {
        RecipeIngredient ri = new RecipeIngredient(5, -2, Unit.MILLILITER, BigDecimal.valueOf(1.25));
        RecipeIngredient ri2 = new RecipeIngredient(5, 6, Unit.FLUID_OUNCE, BigDecimal.valueOf(3));
        List<RecipeIngredient> recipeIngredientList = Arrays.asList(ri, ri2);

        Result<RecipeIngredient> result = service.batchAdd(recipeIngredientList);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Ingredient ID must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotBatchAddIngredientIdEqualZero() {
        RecipeIngredient ri = new RecipeIngredient(5, 0, Unit.MILLILITER, BigDecimal.valueOf(1.25));
        RecipeIngredient ri2 = new RecipeIngredient(5, 6, Unit.FLUID_OUNCE, BigDecimal.valueOf(3));
        List<RecipeIngredient> recipeIngredientList = Arrays.asList(ri, ri2);

        Result<RecipeIngredient> result = service.batchAdd(recipeIngredientList);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Ingredient ID must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotBatchAddNegativeQuantity() {
        RecipeIngredient ri = new RecipeIngredient(5, 2, Unit.MILLILITER, BigDecimal.valueOf(-1.25));
        RecipeIngredient ri2 = new RecipeIngredient(5, 6, Unit.FLUID_OUNCE, BigDecimal.valueOf(3));
        List<RecipeIngredient> recipeIngredientList = Arrays.asList(ri, ri2);

        Result<RecipeIngredient> result = service.batchAdd(recipeIngredientList);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Quantity must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotBatchAddQuantityEqualZero() {
        RecipeIngredient ri = new RecipeIngredient(5, 2, Unit.MILLILITER, BigDecimal.ZERO);
        RecipeIngredient ri2 = new RecipeIngredient(5, 6, Unit.FLUID_OUNCE, BigDecimal.valueOf(3));
        List<RecipeIngredient> recipeIngredientList = Arrays.asList(ri, ri2);

        Result<RecipeIngredient> result = service.batchAdd(recipeIngredientList);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Quantity must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void findAllIngredientsByRecipeId() {
        RecipeIngredient ri = new RecipeIngredient(5, 2, Unit.MILLILITER, BigDecimal.ZERO);
        RecipeIngredient ri2 = new RecipeIngredient(5, 6, Unit.FLUID_OUNCE, BigDecimal.valueOf(3));
        List<RecipeIngredient> recipeIngredientList = Arrays.asList(ri, ri2);

        when(repo.findAllIngredientsByRecipeId(5)).thenReturn(recipeIngredientList);
        List<RecipeIngredient> result = service.findAllIngredientsByRecipeId(5);
        assertEquals(2, result.size());
    }

    @Test
    void shouldUpdateRecipeIngredient() {
        List<RecipeIngredient> recipeIngredientList = Arrays.asList(
            new RecipeIngredient(10, 10, Unit.MILLILITER, BigDecimal.valueOf(1.25))
        );
        when(repo.findAllIngredientsByRecipeId(10)).thenReturn(recipeIngredientList);

        RecipeIngredient mockOut = new RecipeIngredient(8, 2, Unit.GALLON, BigDecimal.ONE);
        when(repo.updateRecipeIngredient(mockOut)).thenReturn(true);

        Result<RecipeIngredient> result = service.updateRecipeIngredient(mockOut);
        assertEquals(ResultType.SUCCESS, result.getType());
    }

    @Test
    void shouldNotUpdateRecipeIdEqualZero() {
        RecipeIngredient mockOut = new RecipeIngredient(0, 2, Unit.GALLON, BigDecimal.ONE);
        Result<RecipeIngredient> result = service.updateRecipeIngredient(mockOut);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Recipe ID must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotUpdateIngredientIdEqualZero() {
        RecipeIngredient mockOut = new RecipeIngredient(8, 0, Unit.GALLON, BigDecimal.ONE);
        Result<RecipeIngredient> result = service.updateRecipeIngredient(mockOut);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Ingredient ID must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotUpdateNegativeRecipeId() {
        RecipeIngredient mockOut = new RecipeIngredient(-8, 2, Unit.GALLON, BigDecimal.ONE);
        Result<RecipeIngredient> result = service.updateRecipeIngredient(mockOut);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Recipe ID must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotUpdateNegativeIngredientId() {
        RecipeIngredient mockOut = new RecipeIngredient(8, -2, Unit.GALLON, BigDecimal.ONE);
        Result<RecipeIngredient> result = service.updateRecipeIngredient(mockOut);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Ingredient ID must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotUpdateNegativeQuantity() {
        RecipeIngredient mockOut = new RecipeIngredient(8, 2, Unit.GALLON, BigDecimal.valueOf(-1));
        Result<RecipeIngredient> result = service.updateRecipeIngredient(mockOut);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Quantity must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotUpdateQuantityEqualZero() {
        RecipeIngredient mockOut = new RecipeIngredient(8, 2, Unit.GALLON, BigDecimal.ZERO);
        Result<RecipeIngredient> result = service.updateRecipeIngredient(mockOut);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Quantity must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotUpdateDuplicateRecipeIngredient() {
        List<RecipeIngredient> recipeIngredientList = Arrays.asList(
            new RecipeIngredient(10, 10, Unit.MILLILITER, BigDecimal.valueOf(1.25))
        );
        when(repo.findAllIngredientsByRecipeId(10)).thenReturn(recipeIngredientList);
        RecipeIngredient ri = new RecipeIngredient(10, 10, Unit.FLUID_OUNCE, BigDecimal.ONE);

        Result<RecipeIngredient> result = service.updateRecipeIngredient(ri);
        assertEquals(ResultType.DUPLICATE, result.getType());
        assertEquals("(Recipe ID: 10, Ingredient ID: 10) is already in the system.", result.getErrors().get(0));
    }

    @Test
    void shouldDeleteRecipeIngredient() {
        RecipeIngredient ri = new RecipeIngredient(10, 10, Unit.MILLILITER, BigDecimal.valueOf(1.25));
        when(repo.deleteRecipeIngredient(ri)).thenReturn(true);
        Result<RecipeIngredient> result = service.deleteRecipeIngredient(ri);
        assertEquals(ResultType.SUCCESS, result.getType());
    }

    @Test
    void shouldNotDeleteNonExistentRecipeIngredient() {
        RecipeIngredient ri = new RecipeIngredient(10, 10, Unit.MILLILITER, BigDecimal.valueOf(1.25));
        when(repo.deleteRecipeIngredient(ri)).thenReturn(false);
        Result<RecipeIngredient> result = service.deleteRecipeIngredient(ri);
        assertEquals(ResultType.NOT_FOUND, result.getType());
        assertEquals("RecipeIngredient (recipe id: 10 AND/OR ingredient id: 10) was not found.", result.getErrors().get(0));
    }
}