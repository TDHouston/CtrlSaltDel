package capstone.round_table.data.ingredient;

import capstone.round_table.data.mappers.IngredientMapper;
import capstone.round_table.data.mappers.RecipeMapper;
import capstone.round_table.models.Ingredient;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.util.List;

@Repository
public class IngredientJdbcRepository implements IngredientRepository {
    private JdbcTemplate jdbcTemplate;

    public IngredientJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    /**
     * Add an Ingredient.
     * @param ingredient
     * @return
     */
    @Override
    public Ingredient addIngredient(Ingredient ingredient) {
        final String sql = "INSERT INTO ingredient (`name`) VALUES (?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
            ps.setString(1, ingredient.getName());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        ingredient.setIngredientId(keyHolder.getKey().intValue());
        return ingredient;
    }

    /**
     * Returns list of all the ingredients.
     * @return
     */
    @Override
    public List<Ingredient> findAll() {
        final String sql = "SELECT ingredient_id, `name` AS ingredient_name FROM ingredient;";
        List<Ingredient> result = jdbcTemplate.query(sql, new IngredientMapper());

        // Add recipes for each ingredient
        if (!result.isEmpty()) {
            for (Ingredient i : result) {
                addRecipeIngredient(i);
            }
        }

        return result;
    }

    /**
     * Find a specific ingredient.
     * @param ingredientId
     * @return
     */
    @Override
    @Transactional(readOnly = true)
    public Ingredient findById(int ingredientId) {
        final String sql = "SELECT ingredient_id, `name` AS ingredient_name FROM ingredient WHERE ingredient_id = ?;";
        Ingredient ingredient = jdbcTemplate.query(sql, new IngredientMapper(), ingredientId)
            .stream()
            .findFirst()
            .orElse(null);

        // Ingredient + Recipe has a many-many relationship
        // Ingredient will store list of recipes
        if (ingredient != null) {
            addRecipeIngredient(ingredient);
        }

        return ingredient;
    }

    /**
     * Update and ingredient name.
     * @param ingredient
     * @return
     */
    @Override
    public boolean updateIngredient(Ingredient ingredient) {
        final String sql = "UPDATE ingredient SET " +
            "`name` = ? " +
            "WHERE ingredient_id = ?" +
            ";";

        return jdbcTemplate.update(
            sql, ingredient.getName(), ingredient.getIngredientId()
        ) > 0;
    }

    /**
     * Delete an ingredient.
     * @param ingredientId
     * @return
     */
    @Override
    @Transactional
    public boolean deleteIngredientById(int ingredientId) {
        // Recipe_Ingredient has Ingredient as FK
        // Delete ingredient from Recipe_Ingredient table first
        // Then delete ingredient from Ingredient table
        jdbcTemplate.update("DELETE FROM recipe_ingredient WHERE ingredient_id = ?;", ingredientId);
        return jdbcTemplate.update("DELETE FROM ingredient WHERE ingredient_id = ?;", ingredientId) > 0;
    }


    /**
     * Updates Ingredient w/ list of recipes that uses that ingredient.
     * @param ingredient
     */
    private void addRecipeIngredient(Ingredient ingredient) {
        final String sql = "SELECT " +
            "r.recipe_id, " +
            "user_id, " +
            "r.`name` AS recipe_name, " +
            "difficulty, " +
            "cook_time, " +
            "servings, " +
            "`description`, " +
            "featured, " +
            "image_url " +
            "FROM recipe_ingredient ri " +
            "JOIN ingredient i ON ri.ingredient_id = i.ingredient_id " +
            "JOIN recipe r ON ri.recipe_id = r.recipe_id " +
            "WHERE ri.ingredient_id = ?" +
            ";";

        var recipes = jdbcTemplate.query(sql, new RecipeMapper(), ingredient.getIngredientId());
        ingredient.setRecipesWithIngredient(recipes);
    }
}
