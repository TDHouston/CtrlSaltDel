package capstone.round_table.data.mappers;

import capstone.round_table.models.Difficulty;
import capstone.round_table.models.Recipe;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RecipeMapper implements RowMapper<Recipe> {

    @Override
    public Recipe mapRow(ResultSet resultSet, int i) throws SQLException {
        Recipe recipe = new Recipe();

        recipe.setRecipeId(resultSet.getInt("recipe_id"));
        recipe.setUserId(resultSet.getInt("user_id"));
        recipe.setName(resultSet.getString("recipe_name"));

        // Some values can be null in the database, will account for that to prevent errors
        // Also, to differentiate between invalid values and nulls

        String difficulty = resultSet.getString("difficulty");
        recipe.setDifficulty(resultSet.wasNull() ? null : Difficulty.valueOf(difficulty.toUpperCase()));

        int cookTime = resultSet.getInt("cook_time");
        recipe.setCookTime(resultSet.wasNull() ? Integer.MIN_VALUE : cookTime);

        int servings = resultSet.getInt("servings");
        recipe.setServings(resultSet.wasNull() ? Integer.MIN_VALUE : servings);

        recipe.setDescription(resultSet.getString("description"));

        recipe.setAuthor(resultSet.getString("username"));

        recipe.setFeatured(resultSet.getBoolean("featured"));

        return recipe;
    }
}
