package capstone.round_table.controllers;

import capstone.round_table.domain.RecipeSearchService;
import capstone.round_table.models.Recipe;
import capstone.round_table.models.RecipeDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/search")
@CrossOrigin(origins = "http://localhost:3000")
public class ElasticController {

    @Autowired
    private RecipeSearchService searchService;

    @GetMapping("/recipes")
    public ResponseEntity<List<RecipeDocument>> searchRecipes(
            @RequestParam(required = false) String q) {
        List<RecipeDocument> results = searchService.searchRecipes(q);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/recipes/advanced")
    public ResponseEntity<List<RecipeDocument>> advancedSearch(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String difficulty,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Integer maxCookTime) {

        List<RecipeDocument> results = searchService.searchWithFilters(
                q, difficulty, category, maxCookTime);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/suggestions")
    public ResponseEntity<List<String>> getSuggestions(
            @RequestParam String prefix) {
        List<String> suggestions = searchService.getRecipeSuggestions(prefix);
        return ResponseEntity.ok(suggestions);
    }
}