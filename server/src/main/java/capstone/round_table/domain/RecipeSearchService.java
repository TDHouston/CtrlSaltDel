package capstone.round_table.domain;

import capstone.round_table.data.RecipeElasticRepository;
import capstone.round_table.models.Recipe;
import capstone.round_table.models.RecipeDocument;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeSearchService {

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

    // this needs to get all the category by recipeId

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
