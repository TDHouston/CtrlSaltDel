package capstone.round_table.controllers;

import capstone.round_table.domain.CategorySearchService;
import capstone.round_table.domain.RecipeSearchService;
import capstone.round_table.domain.RecipeService;
import capstone.round_table.models.CategoryDocument;
import capstone.round_table.models.Recipe;
import capstone.round_table.models.RecipeDocument;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Temporarily disabled for deployment - ElasticSearch not available
// @RestController
// @RequestMapping("/api/elastic")
public class RecipeSearchController_DISABLED {
    private final RecipeSearchService service;
    private final CategorySearchService categorySearchService;

    public RecipeSearchController(RecipeSearchService service, CategorySearchService categorySearchService) {
        this.service = service;
        this.categorySearchService = categorySearchService;
    }


    @GetMapping("/{name}")
    public List<RecipeDocument> findByName(@PathVariable String name){
        return service.findByName(name);
    }

    @GetMapping("/category/{name}")
    public List<CategoryDocument> findByCategoryName(@PathVariable String name){
        return categorySearchService.findByName(name);
    }

    @GetMapping("/recipe/{searchTerm}/{category}")
    public List<RecipeDocument> filterByCategory(@PathVariable String searchTerm, @PathVariable String category) {
        return service.filterByCategory(searchTerm, category);
    }


    @GetMapping("/fuzzy/{term}")
    public List<RecipeDocument> findRecipeByTerm(@PathVariable String term) {
        return service.searchRecipes(term);
    }

    @GetMapping("/auto/{prefix}")
    public List<String> autoSuggest(@PathVariable String prefix) {
        return service.getRecipeSuggestions(prefix);
    }


}
