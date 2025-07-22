package capstone.round_table.repository.favorite;

import capstone.round_table.models.Recipe;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class FavoriteJdbcRepository implements FavoriteRepository {

    private final JdbcTemplate jdbcTemplate;

    public FavoriteJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Recipe> getTopFavorites(int num) {
        return List.of();
    }

    @Override
    public int findRecipeFavoriteCount(int recipeId) {
        return 0;
    }

    @Override
    public List<Recipe> findUserFavorites(int userId) {
        return List.of();
    }

    @Override
    public boolean addFavorites(int userId, int recipeId) {
        return false;
    }

    @Override
    public boolean deleteFavorites(int userId, int recipeId) {
        return false;
    }
}
