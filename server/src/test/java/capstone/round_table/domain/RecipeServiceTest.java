package capstone.round_table.domain;

import capstone.round_table.data.recipe.RecipeJdbcRepository;
import capstone.round_table.data.recipe.RecipeRepository;
import capstone.round_table.models.Difficulty;
import capstone.round_table.models.Recipe;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class RecipeServiceTest {

    @Autowired
    RecipeService service;

    @MockBean
    RecipeRepository repo;

    @Test
    void shouldAddRecipe() {
        Recipe recipe = new Recipe(
            1,
            "Test",
            Difficulty.EASY,
            30,
            2,
            "Testing Description"
        );

        Recipe mockOut = new Recipe(
            1,
            "Test",
            Difficulty.EASY,
            30,
            2,
            "Testing Description"
        );
        mockOut.setRecipeId(1);

        when(repo.addRecipe(recipe)).thenReturn(mockOut);
        Result<Recipe> result = service.addRecipe(recipe);
        assertEquals(ResultType.SUCCESS, result.getType());
        assertEquals(mockOut, result.getPayload());
    }

    @Test
    void shouldAddNullCookTime() {
        Recipe recipe = new Recipe(
            1,
            "Test",
            Difficulty.EASY,
            30,
            2,
            "Testing Description"
        );

        Recipe mockOut = new Recipe(
            1,
            "Test",
            Difficulty.EASY,
            Integer.MIN_VALUE,
            2,
            "Testing Description"
        );
        mockOut.setRecipeId(1);

        when(repo.addRecipe(recipe)).thenReturn(mockOut);
        Result<Recipe> result = service.addRecipe(recipe);
        assertEquals(ResultType.SUCCESS, result.getType());
        assertEquals(mockOut, result.getPayload());
    }

    @Test
    void shouldAddNullServings() {
        Recipe recipe = new Recipe(
            1,
            "Test",
            Difficulty.EASY,
            30,
            2,
            "Testing Description"
        );

        Recipe mockOut = new Recipe(
            1,
            "Test",
            Difficulty.EASY,
            30,
            Integer.MIN_VALUE,
            "Testing Description"
        );
        mockOut.setRecipeId(1);

        when(repo.addRecipe(recipe)).thenReturn(mockOut);
        Result<Recipe> result = service.addRecipe(recipe);
        assertEquals(ResultType.SUCCESS, result.getType());
        assertEquals(mockOut, result.getPayload());
    }

    @Test
    void shouldNotAddUserIdEqualZero() {
        Recipe recipe = new Recipe(
            0,
            "Test",
            Difficulty.EASY,
            30,
            2,
            "Testing Description"
        );

        Result<Recipe> result = service.addRecipe(recipe);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("User ID must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotAddNegativeUserId() {
        Recipe recipe = new Recipe(
            -1,
            "Test",
            Difficulty.EASY,
            30,
            2,
            "Testing Description"
        );

        Result<Recipe> result = service.addRecipe(recipe);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("User ID must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotAddNullName() {
        Recipe recipe = new Recipe(
            1,
            null,
            Difficulty.EASY,
            30,
            2,
            "Testing Description"
        );

        Result<Recipe> result = service.addRecipe(recipe);
        assertEquals(ResultType.MISSING_INFO, result.getType());
        assertEquals("Recipe name is required.", result.getErrors().get(0));
    }

    @Test
    void shouldNotAddBlankName() {
        Recipe recipe = new Recipe(
            1,
            "",
            Difficulty.EASY,
            30,
            2,
            "Testing Description"
        );

        Result<Recipe> result = service.addRecipe(recipe);
        assertEquals(ResultType.MISSING_INFO, result.getType());
        assertEquals("Recipe name is required.", result.getErrors().get(0));
    }

    @Test
    void shouldNotAddCookTimeEqualZero() {
        Recipe recipe = new Recipe(
            1,
            "Test",
            Difficulty.EASY,
            0,
            2,
            "Testing Description"
        );

        Result<Recipe> result = service.addRecipe(recipe);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Cook Time must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotAddNegativeCookTime() {
        Recipe recipe = new Recipe(
            1,
            "Test",
            Difficulty.EASY,
            -30,
            2,
            "Testing Description"
        );

        Result<Recipe> result = service.addRecipe(recipe);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Cook Time must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotAddServingsEqualZero() {
        Recipe recipe = new Recipe(
            1,
            "Test",
            Difficulty.EASY,
            30,
            0,
            "Testing Description"
        );

        Result<Recipe> result = service.addRecipe(recipe);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Servings must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotAddNegativeServings() {
        Recipe recipe = new Recipe(
            1,
            "Test",
            Difficulty.EASY,
            30,
            -2,
            "Testing Description"
        );

        Result<Recipe> result = service.addRecipe(recipe);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Servings must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldFindAll() {
        when(repo.findAll()).thenReturn(List.of(
            new Recipe(
                1,
                "Test",
                Difficulty.EASY,
                30,
                2,
                "Testing Description"
            ),
            new Recipe(
                2,
                "Test2",
                Difficulty.EXPERT,
                60,
                1,
                "Testing Description2"
            )
        ));

        List<Recipe> result = service.findAll();
        assertEquals(2, result.size());
    }

    @Test
    void shouldFindByRecipeId() {
        Recipe recipe = new Recipe(
            1,
            "Test",
            Difficulty.EASY,
            30,
            2,
            "Testing Description"
        );
        recipe.setRecipeId(10);

        when(repo.findByRecipeId(10)).thenReturn(recipe);
        Recipe actual = service.findByRecipeId(10);
        assertEquals(recipe, actual);
    }

    @Test
    void shouldFindRecipeByUserId() {
        when(repo.findRecipesByUserId(10)).thenReturn(List.of(
            new Recipe(
                1,
                10,
                "Test",
                Difficulty.EASY,
                30,
                2,
                "Testing Description"
            ),
            new Recipe(
                2,
                10,
                "Test2",
                Difficulty.EXPERT,
                60,
                1,
                "Testing Description2"
            )
        ));

        List<Recipe> actual = service.findRecipeByUserId(10);
        assertEquals(2, actual.size());
    }

    @Test
    void shouldUpdateRecipe() {
        Recipe recipe = new Recipe(
            1,
            1,
            "Test",
            Difficulty.EASY,
            30,
            2,
            "Testing Description"
        );

        when(repo.updateRecipe(recipe)).thenReturn(true);

        Result<Recipe> result = service.updateRecipe(recipe);
        assertEquals(ResultType.SUCCESS, result.getType());
    }

    @Test
    void shouldNotUpdateMissingRecipeId() {
        Recipe recipe = new Recipe(
            1,
            "Test",
            Difficulty.EASY,
            30,
            2,
            "Testing Description"
        );

        Result<Recipe> result = service.updateRecipe(recipe);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Recipe ID must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotUpdateNonExistentRecipeId() {
        Recipe recipe = new Recipe(
            999,
            1,
            "Test",
            Difficulty.EASY,
            30,
            2,
            "Testing Description"
        );

        when(repo.updateRecipe(recipe)).thenReturn(false);

        Result<Recipe> result = service.updateRecipe(recipe);
        assertEquals(ResultType.NOT_FOUND, result.getType());
        assertEquals("Recipe ID: 999 was not found.", result.getErrors().get(0));
    }

    @Test
    void shouldUpdateNullCookTime() {
        Recipe recipe = new Recipe(
            1,
            1,
            "Test",
            Difficulty.EASY,
            Integer.MIN_VALUE,
            2,
            "Testing Description"
        );

        when(repo.updateRecipe(recipe)).thenReturn(true);

        Result<Recipe> result = service.updateRecipe(recipe);
        assertEquals(ResultType.SUCCESS, result.getType());
    }

    @Test
    void shouldUpdateNullServings() {
        Recipe recipe = new Recipe(
            1,
            1,
            "Test",
            Difficulty.EASY,
            30,
            Integer.MIN_VALUE,
            "Testing Description"
        );

        when(repo.updateRecipe(recipe)).thenReturn(true);

        Result<Recipe> result = service.updateRecipe(recipe);
        assertEquals(ResultType.SUCCESS, result.getType());
    }

    @Test
    void shouldNotUpdateUserIdEqualZero() {
        Recipe recipe = new Recipe(
            1,
            0,
            "Test",
            Difficulty.EASY,
            30,
            2,
            "Testing Description"
        );

        Result<Recipe> result = service.updateRecipe(recipe);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("User ID must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotUpdateNegativeUserId() {
        Recipe recipe = new Recipe(
            1
            -1,
            "Test",
            Difficulty.EASY,
            30,
            2,
            "Testing Description"
        );

        Result<Recipe> result = service.updateRecipe(recipe);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("User ID must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotUpdateNullName() {
        Recipe recipe = new Recipe(
            1,
            1,
            null,
            Difficulty.EASY,
            30,
            2,
            "Testing Description"
        );

        Result<Recipe> result = service.updateRecipe(recipe);
        assertEquals(ResultType.MISSING_INFO, result.getType());
        assertEquals("Recipe name is required.", result.getErrors().get(0));
    }

    @Test
    void shouldNotUpdateBlankName() {
        Recipe recipe = new Recipe(
            1,
            1,
            "",
            Difficulty.EASY,
            30,
            2,
            "Testing Description"
        );

        Result<Recipe> result = service.updateRecipe(recipe);
        assertEquals(ResultType.MISSING_INFO, result.getType());
        assertEquals("Recipe name is required.", result.getErrors().get(0));
    }

    @Test
    void shouldNotUpdateCookTimeEqualZero() {
        Recipe recipe = new Recipe(
            1,
            1,
            "Test",
            Difficulty.EASY,
            0,
            2,
            "Testing Description"
        );

        Result<Recipe> result = service.updateRecipe(recipe);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Cook Time must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotUpdateNegativeCookTime() {
        Recipe recipe = new Recipe(
            1,
            1,
            "Test",
            Difficulty.EASY,
            -30,
            2,
            "Testing Description"
        );

        Result<Recipe> result = service.updateRecipe(recipe);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Cook Time must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotUpdateServingsEqualZero() {
        Recipe recipe = new Recipe(
            1,
            1,
            "Test",
            Difficulty.EASY,
            30,
            0,
            "Testing Description"
        );

        Result<Recipe> result = service.updateRecipe(recipe);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Servings must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotUpdateNegativeServings() {
        Recipe recipe = new Recipe(
            1,
            1,
            "Test",
            Difficulty.EASY,
            30,
            -2,
            "Testing Description"
        );

        Result<Recipe> result = service.updateRecipe(recipe);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Servings must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldDeleteRecipeById() {
        when(repo.deleteRecipeById(1)).thenReturn(true);
        Result<Recipe> result = service.deleteRecipeById(1);
        assertEquals(ResultType.SUCCESS, result.getType());
    }

    @Test
    void shouldNotDeleteRecipeByNonExistentId() {
        when(repo.deleteRecipeById(999)).thenReturn(false);
        Result<Recipe> result = service.deleteRecipeById(999);
        assertEquals(ResultType.NOT_FOUND, result.getType());
        assertEquals("Recipe ID: 999 was not found.", result.getErrors().get(0));
    }

    @Test
    void shouldNotDeleteRecipeByIdEqualZero() {
        when(repo.deleteRecipeById(0)).thenReturn(false);
        Result<Recipe> result = service.deleteRecipeById(0);
        assertEquals(ResultType.NOT_FOUND, result.getType());
        assertEquals("Recipe ID: 0 was not found.", result.getErrors().get(0));
    }

    @Test
    void shouldNotDeleteRecipeByNegativeId() {
        when(repo.deleteRecipeById(-1)).thenReturn(false);
        Result<Recipe> result = service.deleteRecipeById(-1);
        assertEquals(ResultType.NOT_FOUND, result.getType());
        assertEquals("Recipe ID: -1 was not found.", result.getErrors().get(0));
    }
}