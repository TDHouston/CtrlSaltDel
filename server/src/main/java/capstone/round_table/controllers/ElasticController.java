package capstone.round_table.controllers;

import capstone.round_table.domain.RecipeSearchService;
import capstone.round_table.models.Recipe;
import capstone.round_table.models.RecipeDocument;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ingredient")
public class ElasticController {

    private final RecipeSearchService service;

    public ElasticController(RecipeSearchService service) {
        this.service = service;
    }

    @GetMapping("/suggest/{ingredient}")
    public List<RecipeDocument> elastic(@PathVariable String ingredient) {
        return service.findRecipesByIngredient(ingredient);
    }
}
