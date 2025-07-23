package capstone.round_table.domain;

import capstone.round_table.data.ingredient.IngredientRepository;
import capstone.round_table.models.Ingredient;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class IngredientServiceTest {

    @Autowired
    IngredientService service;

    @MockBean
    IngredientRepository repo;

    @Test
    void shouldAddIngredient() {
        List<Ingredient> ingredients = Arrays.asList(new Ingredient(3, "Pear"));
        when(repo.findAll()).thenReturn(ingredients);

        Ingredient ingredient = new Ingredient("Test");
        Ingredient mockOut = new Ingredient(1, "Test");

        when(repo.addIngredient(ingredient)).thenReturn(mockOut);
        Result<Ingredient> result = service.addIngredient(ingredient);
        assertEquals(ResultType.SUCCESS, result.getType());
        assertEquals(mockOut, result.getPayload());
    }

    @Test
    void shouldNotAddDuplicateIngredient() {
        Ingredient ingredient = new Ingredient("Test");
        Ingredient mockOut = new Ingredient(1, "Test");
        List<Ingredient> ingredients = Arrays.asList(mockOut);

        when(repo.findAll()).thenReturn(ingredients);
        Result<Ingredient> result = service.addIngredient(ingredient);
        assertEquals(ResultType.DUPLICATE, result.getType());
        assertEquals("Ingredient: Test is already in the system.", result.getErrors().get(0));
    }

    @Test
    void shouldFindAll() {
        Ingredient ingredient = new Ingredient(1, "Apple");
        Ingredient mockOut = new Ingredient(2, "Orange");
        List<Ingredient> ingredients = Arrays.asList(ingredient, mockOut);

        when(repo.findAll()).thenReturn(ingredients);

        List<Ingredient> result = service.findAll();
        assertEquals(2, result.size());
    }

    @Test
    void shouldFindById() {
        Ingredient mockOut = new Ingredient(2, "Orange");
        when(repo.findById(2)).thenReturn(mockOut);

        Ingredient actual = service.findById(2);
        assertEquals(mockOut, actual);
    }

    @Test
    void shouldUpdateIngredient() {
        List<Ingredient> ingredients = Arrays.asList(
            new Ingredient(3, "Pear"),
            new Ingredient(1, "Apple")
        );
        when(repo.findAll()).thenReturn(ingredients);
        Ingredient mockOut = new Ingredient(3, "Test");

        when(repo.updateIngredient(mockOut)).thenReturn(true);
        Result<Ingredient> result = service.updateIngredient(mockOut);
        assertEquals(ResultType.SUCCESS, result.getType());
    }

    @Test
    void shouldNotUpdateIngredientIdEqualZero() {
        List<Ingredient> ingredients = Arrays.asList(
            new Ingredient(3, "Pear"),
            new Ingredient(1, "Apple")
        );
        when(repo.findAll()).thenReturn(ingredients);
        Ingredient mockOut = new Ingredient(0, "Test");

        Result<Ingredient> result = service.updateIngredient(mockOut);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Ingredient ID must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotUpdateNegativeIngredientId() {
        List<Ingredient> ingredients = Arrays.asList(
            new Ingredient(3, "Pear"),
            new Ingredient(1, "Apple")
        );
        when(repo.findAll()).thenReturn(ingredients);
        Ingredient mockOut = new Ingredient(-1, "Test");

        Result<Ingredient> result = service.updateIngredient(mockOut);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Ingredient ID must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotUpdateNonExistentIngredientId() {
        List<Ingredient> ingredients = Arrays.asList(
            new Ingredient(3, "Pear"),
            new Ingredient(1, "Apple")
        );
        when(repo.findAll()).thenReturn(ingredients);
        Ingredient mockOut = new Ingredient(5, "Test");

        when(repo.updateIngredient(mockOut)).thenReturn(false);
        Result<Ingredient> result = service.updateIngredient(mockOut);
        assertEquals(ResultType.NOT_FOUND, result.getType());
        assertEquals("Ingredient ID: 5 was not found.", result.getErrors().get(0));
    }

    @Test
    void shouldDeleteIngredientById() {
        when(repo.deleteIngredientById(1)).thenReturn(true);
        Result<Ingredient> result = service.deleteIngredientById(1);
        assertEquals(ResultType.SUCCESS, result.getType());
    }

    @Test
    void shouldNotDeleteIngredientByNonExistentId() {
        when(repo.deleteIngredientById(999)).thenReturn(false);
        Result<Ingredient> result = service.deleteIngredientById(999);
        assertEquals(ResultType.NOT_FOUND, result.getType());
        assertEquals("Ingredient ID: 999 was not found.", result.getErrors().get(0));
    }

    @Test
    void shouldNotDeleteIngredientByIdEqualZero() {
        when(repo.deleteIngredientById(0)).thenReturn(false);
        Result<Ingredient> result = service.deleteIngredientById(0);
        assertEquals(ResultType.NOT_FOUND, result.getType());
        assertEquals("Ingredient ID: 0 was not found.", result.getErrors().get(0));
    }

    @Test
    void shouldNotDeleteIngredientByNegativeId() {
        when(repo.deleteIngredientById(-1)).thenReturn(false);
        Result<Ingredient> result = service.deleteIngredientById(-1);
        assertEquals(ResultType.NOT_FOUND, result.getType());
        assertEquals("Ingredient ID: -1 was not found.", result.getErrors().get(0));
    }
}