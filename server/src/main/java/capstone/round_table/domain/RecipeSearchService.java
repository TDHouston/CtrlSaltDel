package capstone.round_table.domain;

import capstone.round_table.data.elastic.IngredientElasticRepository;
import capstone.round_table.data.elastic.RecipeElasticRepository;
import capstone.round_table.models.IngredientDocument;
import capstone.round_table.models.Recipe;
import capstone.round_table.models.RecipeDocument;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecipeSearchService {

    private final RecipeElasticRepository ingredientElasticRepository;

    public RecipeSearchService(RecipeElasticRepository ingredientElasticRepository) {
        this.ingredientElasticRepository = ingredientElasticRepository;
    }

    public List<RecipeDocument> findRecipesByIngredient(String ingredientName) {
        return ingredientElasticRepository.findByNameContaining(ingredientName);
    }
}