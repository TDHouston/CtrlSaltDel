package capstone.round_table.data.Ingredient;

import capstone.round_table.data.mappers.IngredientMapper;
import capstone.round_table.data.mappers.RecipeIngredientMapper;
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

    @Override
    public List<Ingredient> findAll() {
        final String sql = "SELECT ingredient_id, `name` AS ingredient_name FROM ingredient;";
        List<Ingredient> result = jdbcTemplate.query(sql, new IngredientMapper());

        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public Ingredient findById(int ingredientId) {
        final String sql = "SELECT ingredient_id, `name` AS ingredient_name FROM ingredient WHERE ingredient_id = ?;";
        Ingredient ingredient = jdbcTemplate.query(sql, new IngredientMapper(), ingredientId)
            .stream()
            .findFirst()
            .orElse(null);

        if (ingredient != null) {
            addRecipeIngredient(ingredient);
        }

        return ingredient;
    }

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

    @Override
    @Transactional
    public boolean deleteIngredientById(int ingredientId) {
        // Recipe_Ingredient has Ingredient as FK
        // Delete ingredient from Recipe_Ingredient table first
        // Then delete ingredient from Ingredient table
        jdbcTemplate.update("DELETE FROM recipe_ingredient WHERE ingredient_id = ?;", ingredientId);
        return jdbcTemplate.update("DELETE FROM ingredient WHERE ingredient_id = ?;", ingredientId) > 0;
    }

    private void addRecipeIngredient(Ingredient ingredient) {
        final String sql = "SELECT " +
            "recipe_id, " +
            "ri.ingredient_id, " +
            "unit, " +
            "quantity, " +
            "`name` AS ingredient_name " +
            "FROM recipe_ingredient ri JOIN ingredient i ON ri.ingredient_id = i.ingredient_id " +
            "WHERE ri.ingredient_id = ?" +
            ";";

        var recipeIngredients = jdbcTemplate.query(sql, new RecipeIngredientMapper(), ingredient.getIngredientId());
        ingredient.setRecipesWithIngredient(recipeIngredients);
    }
}
