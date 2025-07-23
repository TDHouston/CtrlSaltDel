package capstone.round_table.controllers;

import capstone.round_table.domain.RecipeSearchService;
import capstone.round_table.models.Recipe;
import capstone.round_table.models.RecipeDocument;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ingredient")
public class ElasticController {

    private final RecipeSearchService service;

    public ElasticController(RecipeSearchService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<String> addRecipe(@RequestBody Recipe recipe) {
        boolean added = service.add(recipe);
        if (added) {
            return ResponseEntity.ok("Fruit added successfully");
        } else {
            return ResponseEntity.status(500).body("Failed to add fruit");
        }
    }

    @GetMapping("/suggest/{ingredient}")
    public List<RecipeDocument> elastic(@PathVariable String ingredient) {
        return service.findRecipesByIngredient(ingredient);
    }
}
