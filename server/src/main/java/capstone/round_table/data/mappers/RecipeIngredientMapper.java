package capstone.round_table.data.mappers;

import capstone.round_table.models.RecipeIngredient;
import capstone.round_table.models.Unit;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RecipeIngredientMapper implements RowMapper<RecipeIngredient> {

    @Override
    public RecipeIngredient mapRow(ResultSet resultSet, int i) throws SQLException {
        RecipeIngredient ri = new RecipeIngredient();

        ri.setRecipeId(resultSet.getInt("recipe_id"));
        ri.setIngredientId(resultSet.getInt("ingredient_id"));
        ri.setUnit(Unit.getUnit(resultSet.getString("unit")));
        ri.setQuantity(resultSet.getBigDecimal("quantity"));
        ri.setIngredientName(resultSet.getString("ingredient_name"));

        return ri;
    }
}
