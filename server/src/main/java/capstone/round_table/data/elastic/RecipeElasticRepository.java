package capstone.round_table.data.elastic;

import capstone.round_table.models.IngredientDocument;
import capstone.round_table.models.RecipeDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface RecipeElasticRepository extends ElasticsearchRepository<RecipeDocument, Integer> {
    List<RecipeDocument> findByNameContaining(String ingredientName);
}