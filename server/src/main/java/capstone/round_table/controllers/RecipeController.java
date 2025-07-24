package capstone.round_table.controllers;

import capstone.round_table.domain.RecipeSearchService;
import capstone.round_table.domain.RecipeService;
import capstone.round_table.domain.Result;
import capstone.round_table.models.Recipe;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/recipes")
public class RecipeController {
    private final RecipeService service;
    private final RecipeSearchService recipeSearchService;

    public RecipeController(RecipeService service, RecipeSearchService recipeSearchService) {
        this.service = service;
        this.recipeSearchService = recipeSearchService;
    }


    @GetMapping
    public List<Recipe> findAll() {
        return service.findAll();
    }

    @GetMapping("/{recipeId}")
    public Recipe findById(@PathVariable int recipeId) { // TODO: UPDATE TO CALL SERVICE METHOD
        return service.findByRecipeId(recipeId);
    }

    //user?id=1
    @GetMapping("/user")
    public List<Recipe> findByUserId(@RequestParam int id) {
        return service.findRecipeByUserId(id);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Recipe recipe) {
        Result<Recipe> result = service.addRecipe(recipe);
        if (result.isSuccess()) {
            recipeSearchService.add(result.getPayload());
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{recipeId}")
    public ResponseEntity<Object> update(@PathVariable int recipeId, @RequestBody Recipe recipe) {
        if (recipeId != recipe.getRecipeId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Recipe> result = service.updateRecipe(recipe);
        if (result.isSuccess()) {
            recipeSearchService.update(recipe);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{recipeId}")
    public ResponseEntity<Void> deleteById(@PathVariable int recipeId) {
        if (service.deleteRecipeById(recipeId).isSuccess()) {
            recipeSearchService.deleteById(recipeId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
