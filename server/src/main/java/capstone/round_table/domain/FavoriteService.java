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
       return favoriteRepository.findTopFavorites(num);
    }

    public List<Recipe> findUserFavorites(int userId) {
        return favoriteRepository.findUserFavorites(userId);
    }

    public int findRecipeFavoriteCount(int recipeId) {
        return favoriteRepository.findRecipeFavoriteCount(recipeId);
    }

    public Result<Boolean> addFavorites(int userId, int recipeId) {
        Result<Boolean> result = new Result<>();
        if (userId == 0 || recipeId == 0) {
            result.addError("User Id and Recipe Id must be set", ResultType.INVALID);
            return result;
        }
        result.setPayload(favoriteRepository.addFavorites(userId, recipeId));
        return result;
    }

    public Result<Boolean> deleteFavorites(int userId, int recipeId) {
        Result<Boolean> result = new Result<>();
        if (userId == 0 || recipeId == 0) {
            result.addError("User Id and Recipe Id must be set", ResultType.INVALID);
            return result;
        }
        result.setPayload(favoriteRepository.deleteFavorites(userId, recipeId));
        return result;
    }

}
