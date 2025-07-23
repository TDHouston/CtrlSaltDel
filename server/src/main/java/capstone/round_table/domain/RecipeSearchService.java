package capstone.round_table.domain;

import capstone.round_table.data.elastic.RecipeSearchRepository;
import capstone.round_table.models.Recipe;
import capstone.round_table.models.RecipeDocument;
import org.elasticsearch.index.query.BoolQueryBuilder;
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
    private RecipeSearchRepository searchRepository;

    @Autowired
    private ElasticsearchOperations elasticsearchOperations;

    // Multi-field search with boosting
    public List<RecipeDocument> searchRecipes(String searchTerm) {
        Query query = new NativeSearchQueryBuilder()
                .withQuery(multiMatchQuery(searchTerm)
                        .field("name", 3.0f)          // Boost name field
                        .field("description", 1.5f)   // Medium boost
                        .field("ingredients")         // Normal boost
                        .fuzziness("AUTO"))           // Handle typos
                .build();

        SearchHits<RecipeDocument> searchHits =
                elasticsearchOperations.search(query, RecipeDocument.class);

        return searchHits.getSearchHits().stream()
                .map(SearchHit::getContent)
                .collect(Collectors.toList());
    }

    // Advanced search with filters
    public List<RecipeDocument> searchWithFilters(String searchTerm,
                                                  String difficulty,
                                                  String category,
                                                  Integer maxCookTime) {

        BoolQueryBuilder boolQuery = boolQuery();

        // Add search term
        if (searchTerm != null && !searchTerm.trim().isEmpty()) {
            boolQuery.must(multiMatchQuery(searchTerm)
                    .field("name", 3.0f)
                    .field("description", 1.5f)
                    .field("ingredients"));
        }

        // Add filters
        if (difficulty != null && !difficulty.isEmpty()) {
            boolQuery.filter(termQuery("difficulty", difficulty));
        }

        if (category != null && !category.isEmpty()) {
            boolQuery.filter(termQuery("categories", category));
        }

        if (maxCookTime != null) {
            boolQuery.filter(rangeQuery("cookTime").lte(maxCookTime));
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

    // Autocomplete suggestions
    public List<String> getRecipeSuggestions(String prefix) {
        Query query = new NativeSearchQueryBuilder()
                .withQuery(prefixQuery("name", prefix.toLowerCase()))
                .withMaxResults(5)
                .build();

        SearchHits<RecipeDocument> searchHits =
                elasticsearchOperations.search(query, RecipeDocument.class);

        return searchHits.getSearchHits().stream()
                .map(hit -> hit.getContent().getName())
                .collect(Collectors.toList());
    }
}