package capstone.round_table.data;

import capstone.round_table.models.CategoryDocument;
import capstone.round_table.models.RecipeDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface CategoryElasticRepository extends ElasticsearchRepository<CategoryDocument, Integer> {
    List<CategoryDocument> findByNameContaining(String name);
}
