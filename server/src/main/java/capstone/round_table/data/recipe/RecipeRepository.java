package capstone.round_table.data.recipe;

import capstone.round_table.models.Recipe;
//import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface RecipeRepository {
    Recipe addRecipe(Recipe recipe);

    List<Recipe> findAll();

    @Transactional
    Recipe findByRecipeId(int recipeId);

    List<Recipe> findRecipesByUserId(int userId);

    boolean updateRecipe(Recipe recipe);

    @Transactional
    boolean deleteRecipeById(int recipeId);

    boolean updateRecipeImage(int recipeId, String imageUrl, String thumbnailUrl);
}
