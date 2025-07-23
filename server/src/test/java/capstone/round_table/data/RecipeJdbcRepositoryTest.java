package capstone.round_table.data;

import capstone.round_table.data.recipe.RecipeJdbcRepository;
import capstone.round_table.models.Difficulty;
import capstone.round_table.models.Recipe;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class RecipeJdbcRepositoryTest {

    @Autowired
    RecipeJdbcRepository repo;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() { knownGoodState.set(); }

    @Test
    void shouldAddRecipe() {
        Recipe recipe = new Recipe(
            1,
            "Test Recipe",
            Difficulty.ADVANCED,
            60,
            3,
            "Test Description"
        );

        Recipe actual = repo.addRecipe(recipe);
        assertTrue(actual.getRecipeId() >= 10);
    }

    @Test
    void shouldFindAllRecipes() {
        List<Recipe> recipes = repo.findAll();
        assertTrue(recipes.size() >= 9);
    }

    @Test
    void shouldFindByRecipeId() {
        // (recipe_id, user_id, `name`, difficulty, cook_time, servings, `description`)
        // (1, 1, "fish soup", "intermediate", 30, 5, "fish in soup"),
        Recipe recipe = repo.findByRecipeId(1);
        assertEquals(1, recipe.getUserId());
        assertEquals("fish soup", recipe.getName());
        assertEquals(Difficulty.EASY, recipe.getDifficulty());
        assertEquals(30, recipe.getCookTime());
        assertEquals(5, recipe.getServings());
        assertEquals("fish in soup", recipe.getDescription());
    }

    @Test
    void shouldFindByUserId() {
        // (recipe_id, user_id, `name`, difficulty, cook_time, servings, `description`)
        // (1, 1, "fish soup", "intermediate", 30, 5, "fish in soup")
        // (2, 1, "scramble eggs", "expert", 10, 2, "Very difficult egg")
        List<Recipe> recipes = repo.findRecipesByUserId(1);
        assertTrue(recipes.size() >= 3);
    }

    @Test
    void shouldUpdateRecipe() {
        Recipe recipe = repo.findByRecipeId(3);
        recipe.setDifficulty(Difficulty.EXPERT);
        recipe.setCookTime(999);
        recipe.setServings(999);
        recipe.setDescription("Test Description");

        assertTrue(repo.updateRecipe(recipe));
        Recipe actual = repo.findByRecipeId(3);
        assertEquals(recipe, actual);
    }

    @Test
    void shouldDeleteRecipeById() {
        assertTrue(repo.deleteRecipeById(5));
    }
}