package capstone.round_table.data.Ingredient;

import capstone.round_table.data.mappers.IngredientMapper;
import capstone.round_table.models.Ingredient;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;

import java.sql.PreparedStatement;
import java.util.List;

public class IngredientFileRepository implements IngredientRepository {
    private JdbcTemplate jdbcTemplate;

    public IngredientFileRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Ingredient addIngredient(Ingredient ingredient) {
        final String sql = "INSERT INTO ingredient " +
            "(" +
            "ingredient_id, " +
            "`name`" +
            ") " +
            "VALUES (?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
            ps.setInt(1, ingredient.getIngredientId());
            ps.setString(2, ingredient.getName());
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
    public Ingredient findById(int ingredientId) {
        final String sql = "SELECT ingredient_id, `name` AS ingredient_name FROM ingredient WHERE ingredient_id = ?;";
        Ingredient ingredient = jdbcTemplate.query(sql, new IngredientMapper())
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
    public boolean deleteIngredientById(int ingredientId) {
        Ingredient ingredient = findById(ingredientId);

        // Recipe_Ingredient has Ingredient as FK
        // Delete ingredient from Recipe_Ingredient table first
        // Then delete ingredient from Ingredient table
        if (ingredient != null) {
            return true;
        }

        return false;
    }

    private void addRecipeIngredient(Ingredient ingredient) {
        final String sql = "";
    }
}
