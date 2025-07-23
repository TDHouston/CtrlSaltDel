package capstone.round_table.domain;

import capstone.round_table.data.RecipeElasticRepository;
import capstone.round_table.models.Recipe;
import capstone.round_table.models.RecipeDocument;
import org.springframework.stereotype.Service;

@Service
public class RecipeSearchService {

    private final RecipeElasticRepository recipeElasticRepository;

    public RecipeSearchService(RecipeElasticRepository recipeElasticRepository) {
        this.recipeElasticRepository = recipeElasticRepository;
    }

    public void add(Recipe recipe) {
        RecipeDocument document = new RecipeDocument();
        document.setRecipeId(recipe.getRecipeId());
        document.setName(recipe.getName());
        recipeElasticRepository.save(document);
    }

}
