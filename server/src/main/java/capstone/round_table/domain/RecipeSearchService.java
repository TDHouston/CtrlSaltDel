package capstone.round_table.domain;

import capstone.round_table.data.RecipeElasticRepository;
import capstone.round_table.models.Recipe;
import capstone.round_table.models.RecipeDocument;
import org.apache.lucene.search.join.ScoreMode;
import org.elasticsearch.common.unit.Fuzziness;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static org.elasticsearch.index.query.QueryBuilders.*;

@Service
public class RecipeSearchService {

    @Autowired
    private ElasticsearchOperations elasticsearchOperations;

    private final RecipeElasticRepository recipeElasticRepository;

    public RecipeSearchService(RecipeElasticRepository recipeElasticRepository) {
        this.recipeElasticRepository = recipeElasticRepository;
    }

    public RecipeDocument add(Recipe recipe) {
        RecipeDocument document = convertToDocument(recipe);
        return recipeElasticRepository.save(document);
    }

    public List<RecipeDocument> findByName(String name) {
        return recipeElasticRepository.findByNameContaining(name);
    }

    public RecipeDocument update(Recipe recipe) {
        RecipeDocument document = convertToDocument(recipe);
        return recipeElasticRepository.save(document);
    }

    public RecipeDocument update(RecipeDocument recipe) {
        return recipeElasticRepository.save(recipe);
    }

    public RecipeDocument findById(int recipeId) {
        return recipeElasticRepository.findById(recipeId).orElse(null);
    }

    public void deleteById(int recipeId) {
        recipeElasticRepository.deleteById(recipeId);
    }

    public List<RecipeDocument> filterByCategory(String searchTerm, String category) {
        BoolQueryBuilder boolQuery = boolQuery();
        boolQuery.must(multiMatchQuery(searchTerm)
                .field("name", 3.0f)
                .field("description", 1.5f));

        if (category != null && !category.isEmpty()) {
            boolQuery.filter(termQuery("categories", category));
        }

        Query query = new NativeSearchQueryBuilder()
                .withQuery(boolQuery)
                .build();

        SearchHits<RecipeDocument> searchHits =
                elasticsearchOperations.search(query, RecipeDocument.class);

        return searchHits.getSearchHits().stream()
                .map(SearchHit::getContent)
                .collect(Collectors.toList());

    }

    private RecipeDocument convertToDocument(Recipe recipe) {
        RecipeDocument document = new RecipeDocument();
        document.setRecipeId(recipe.getRecipeId());
        document.setUserId(recipe.getUserId());
        document.setName(recipe.getName());
        document.setDescription(recipe.getDescription());
        document.setCookTime(recipe.getCookTime());
        document.setDifficulty(recipe.getDifficulty());
        return document;
    }

}
