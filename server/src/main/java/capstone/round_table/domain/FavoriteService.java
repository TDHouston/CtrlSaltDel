package capstone.round_table.domain;

import capstone.round_table.data.favorite.FavoriteRepository;
import capstone.round_table.models.Recipe;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteService {
    private final FavoriteRepository favoriteRepository;

    public FavoriteService(FavoriteRepository favoriteRepository) {
        this.favoriteRepository = favoriteRepository;
    }

    public List<Recipe> findTopFavorites(int num) {
       return List.of();
    }

    public List<Recipe> findUserFavorites(int userId) {
        return List.of();
    }

    public Result<Integer> findRecipeFavoriteCount(int recipeId) {
        return null;
    }

    public Result<Boolean> addFavorites(int userId, int recipeId) {
        return null;
    }

    public Result<Boolean> deleteFavorites(int userId, int recipeId) {
        return null;
    }
}
