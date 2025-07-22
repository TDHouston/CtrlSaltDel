package capstone.round_table.controllers;

import capstone.round_table.domain.RecipeService;
import capstone.round_table.models.Recipe;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/recipes")
public class RecipeController {
    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping
    public List<Recipe> findAll() {
        return List.of(); // TODO: UPDATE TO SERVICE PASS-THROUGH
        // return recipeService.findAll();
    }

    @GetMapping("/{recipeId}")
    public ResponseEntity<Recipe> findById(@PathVariable int recipeId) { // TODO: UPDATE TO CALL SERVICE METHOD
        return null;
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Recipe recipe) {
        return null;
    }

    @PutMapping("/{recipeId}")
    public ResponseEntity<Object> update(@PathVariable int recipeId, @RequestBody Recipe recipe) {
        return null;
    }

    @DeleteMapping("/{recipeId}")
    public ResponseEntity<Void> deleteById(@PathVariable int recipeId) {
        return null;
    }


}
