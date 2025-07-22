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
        recipe.setDifficulty(Difficulty.valueOf(resultSet.getString("difficulty").toUpperCase()));
        recipe.setCookTime(resultSet.getInt("cook_time"));
        recipe.setServings(resultSet.getInt("servings"));
        recipe.setDescription(resultSet.getString("description"));

        return recipe;
    }
}
