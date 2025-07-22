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

        // https://stackoverflow.com/questions/5991360/handling-the-null-value-from-a-resultset
        // Some values can be null, will set them to known values if entry was null

        String difficulty = resultSet.getString("difficulty").toUpperCase();
        recipe.setDifficulty(resultSet.wasNull() ? null : Difficulty.valueOf(difficulty));

        int cookTime = resultSet.getInt("cook_time");
        recipe.setCookTime(resultSet.wasNull() ? Integer.MIN_VALUE : cookTime);

        int servings = resultSet.getInt("servings");
        recipe.setServings(resultSet.wasNull() ? Integer.MIN_VALUE : servings);

        String description = resultSet.getString("description");
        recipe.setDescription(resultSet.wasNull() ? "" : description);

        return recipe;
    }
}
