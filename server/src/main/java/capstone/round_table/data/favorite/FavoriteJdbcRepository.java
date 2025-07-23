package capstone.round_table.data.favorite;

import capstone.round_table.data.mappers.CategoryMapper;
import capstone.round_table.data.mappers.RecipeMapper;
import capstone.round_table.models.Recipe;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FavoriteJdbcRepository implements FavoriteRepository {

    private final JdbcTemplate jdbcTemplate;

    public FavoriteJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Recipe> findTopFavorites(int num) {
        final String sql = "select f.recipe_id, r.user_id, r.name as recipe_name, r.difficulty, r.cook_time, r.servings, r.description, r.featured, COUNT(f.recipe_id) as favorite_count " +
                "from favorite f join recipe r on f.recipe_id = r.recipe_id " +
                "group by f.recipe_id " +
                "order by favorite_count desc " +
                "limit ?;";

        return jdbcTemplate.query(sql, new RecipeMapper(), num);
    }

    @Override
    public int findRecipeFavoriteCount(int recipeId) {
        final String sql = "select recipe_id, COUNT(recipe_id) as favorite_count " +
                "from favorite " +
                "where recipe_id = ? " +
                "group by recipe_id;";
        return jdbcTemplate.query(sql, (resultSet, rowNum) -> resultSet.getInt("favorite_count"),recipeId)
                .stream()
                .findFirst()
                .orElse(0);
    }

    @Override
    public List<Recipe> findUserFavorites(int userId) {
        final String sql = "select f.recipe_id, r.user_id, r.name as recipe_name, r.difficulty, r.cook_time, r.servings, r.description, r.featured, u.username " +
                "from favorite f " +
                "join recipe r on r.recipe_id = f.recipe_id " +
                "join user u on u.user_id = r.user_id " +
                "where f.user_id = ?;";
        return jdbcTemplate.query(sql, new RecipeMapper(), userId);
    }

    @Override
    public boolean addFavorites(int userId, int recipeId) {
        final String sql = "insert into favorite (user_id, recipe_id)" +
                " values (?,?);";
        return jdbcTemplate.update(sql, userId, recipeId) > 0;
    }

    @Override
    public boolean deleteFavorites(int userId, int recipeId) {
        return jdbcTemplate.update("delete from favorite where user_id = ? and recipe_id = ?;", userId, recipeId) > 0;
    }
}
