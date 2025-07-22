package capstone.round_table.repository.favorite;

import capstone.round_table.models.Recipe;

import java.util.List;

public interface FavoriteRepository {
    List<Recipe> getTopFavorites(int num);

    int findRecipeFavoriteCount(int recipeId);

    List<Recipe> findUserFavorites(int userId);

    boolean addFavorites(int userId, int recipeId);

    boolean deleteFavorites(int userId, int recipeId);
}
