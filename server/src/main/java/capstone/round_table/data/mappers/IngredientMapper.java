package capstone.round_table.data.mappers;

import capstone.round_table.models.Ingredient;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class IngredientMapper implements RowMapper<Ingredient> {

    @Override
    public Ingredient mapRow(ResultSet resultSet, int i) throws SQLException {
        Ingredient ingredient = new Ingredient();

        ingredient.setIngredientId(resultSet.getInt("ingredient_id"));
        ingredient.setName(resultSet.getString("ingredient_name"));

        return ingredient;
    }
}
