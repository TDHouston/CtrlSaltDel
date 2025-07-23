package capstone.round_table.data.elastic;

import capstone.round_table.models.IngredientDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface IngredientElasticRepository extends ElasticsearchRepository<IngredientDocument, Integer> {

}
