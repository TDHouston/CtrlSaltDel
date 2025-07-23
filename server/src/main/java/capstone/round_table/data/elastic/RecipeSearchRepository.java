package capstone.round_table.data.elastic;

import capstone.round_table.models.RecipeDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface RecipeSearchRepository extends ElasticsearchRepository<RecipeDocument, String> {

    List<RecipeDocument> findByNameContaining(String name);
    List<RecipeDocument> findByDifficulty(String difficulty);
    List<RecipeDocument> findByCategoriesContaining(String category);
    List<RecipeDocument> findByIngredientsContaining(String ingredient);
    List<RecipeDocument> findByCookTimeLessThanEqual(Integer maxCookTime);
}