package capstone.round_table.controllers;

import capstone.round_table.models.RecipeIngredient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/recipe/ingredient")
public class RecipeIngredientController {

    // TODO: add reference to one of the services and create constructor

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody RecipeIngredient recipeIngredient) {
        return null;
    }

    @PutMapping
    public ResponseEntity<Object> update(@RequestBody RecipeIngredient recipeIngredient) {
        return null;
    }

    @DeleteMapping("/{recipeId}/{ingredientId}")
    public ResponseEntity<Void> deleteByKey(@PathVariable int recipeId, @PathVariable int ingredientId) {
        return null;
    }

}
