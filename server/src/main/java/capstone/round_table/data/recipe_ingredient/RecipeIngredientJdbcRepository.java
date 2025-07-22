package capstone.round_table.data.recipe_ingredient;

import capstone.round_table.data.mappers.RecipeIngredientMapper;
import capstone.round_table.models.RecipeIngredient;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;


import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.List;

@Repository
public class RecipeIngredientJdbcRepository implements RecipeIngredientRepository {

    private JdbcTemplate jdbcTemplate;

    public RecipeIngredientJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    /**
     * Adds RecipeIngredient
     * ie an ingredient w/ measurement information for a recipe.
     * @param recipeIngredient
     * @return
     */
    @Override
    public RecipeIngredient addRecipeIngredient(RecipeIngredient recipeIngredient) {
        final String sql = "INSERT INTO recipe_ingredient " +
            "(" +
            "recipe_id, " +
            "ingredient_id, " +
            "unit, " +
            "quantity" +
            ") " +
            "VALUES (?, ?, ?, ?)";

        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
            ps.setInt(1, recipeIngredient.getRecipeId());
            ps.setInt(2, recipeIngredient.getIngredientId());
            ps.setString(3,
                recipeIngredient.getUnit() != null ? recipeIngredient.getUnit().getAbbreviation() : ""
            );
            ps.setBigDecimal(4, recipeIngredient.getQuantity());
            return ps;
        });

        if (rowsAffected <= 0) {
            return null;
        }

        return recipeIngredient;
    }

    /**
     * Returns a list of ingredients for a recipe w/ the name of the ingredient included.
     * @param recipeId
     * @return
     */
    @Override
    public List<RecipeIngredient> findAllIngredientsByRecipeId(int recipeId) {
        final String sql = "SELECT " +
            "recipe_id, " +
            "ri.ingredient_id, " +
            "unit, " +
            "quantity, " +
            "`name` AS ingredient_name " +
            "FROM recipe_ingredient ri JOIN ingredient i ON ri.ingredient_id = i.ingredient_id " +
            "WHERE recipe_id = ?" +
            ";";

        List<RecipeIngredient> result = new ArrayList<>(jdbcTemplate.query(sql, new RecipeIngredientMapper(), recipeId));
        return result;
    }

    /**
     * Updates ingredient information for a given recipe.
     * Recipe id is not updated.
     * @param recipeIngredient
     * @return
     */
    @Override
    public boolean updateRecipeIngredient(RecipeIngredient recipeIngredient) {
        final String sql = "UPDATE recipe_ingredient SET " +
            "ingredient_id = ?, " +
            "unit = ?, " +
            "quantity = ? " +
            "WHERE recipe_id = ?" +
            ";";

        return jdbcTemplate.update(
            sql,
            recipeIngredient.getIngredientId(),
            recipeIngredient.getUnit().getAbbreviation(),
            recipeIngredient.getQuantity(),
            recipeIngredient.getRecipeId()
        ) > 0;
    }

    /**
     * Delete a RecipeIngredient entry in database.
     * Recipe id and Ingredient id together are a unique entry.
     * @param recipeIngredient
     * @return
     */
    @Override
    public boolean deleteRecipeIngredient(RecipeIngredient recipeIngredient) {
        return jdbcTemplate.update(
            "DELETE FROM recipe_ingredient WHERE recipe_id = ? AND ingredient_id = ?;",
            recipeIngredient.getRecipeId(),
            recipeIngredient.getIngredientId()
        ) > 0;
    }
}
