package capstone.round_table.controllers;

import capstone.round_table.domain.RecipeIngredientService;
import capstone.round_table.domain.Result;
import capstone.round_table.models.RecipeIngredient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/recipe_ingredient")
public class RecipeIngredientController {
    private final RecipeIngredientService service;

    public RecipeIngredientController(RecipeIngredientService service) {
        this.service = service;
    }

    @GetMapping("/{recipeId}")
    public List<RecipeIngredient> findAllIngredientsByRecipeId (@PathVariable int recipeId) {
        return service.findAllIngredientsByRecipeId(recipeId);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody RecipeIngredient ri) {
        Result<RecipeIngredient> result = service.addRecipeIngredient(ri);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PostMapping("/batch_add")
    public ResponseEntity<Object> batchAdd(@RequestBody List<RecipeIngredient> riList) {
        Result<List<RecipeIngredient>> result = service.batchAdd(riList);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{recipeId}/{ingredientId}")
    public ResponseEntity<Object> update(
        @PathVariable int recipeId,
        @PathVariable int ingredientId,
        @RequestBody RecipeIngredient ri
    ) {
        if (recipeId != ri.getRecipeId() || ingredientId != ri.getIngredientId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<RecipeIngredient> result = service.updateRecipeIngredient(ri);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{recipeId}/{ingredientId}")
    public ResponseEntity<Object> deleteByIds(
        @PathVariable int recipeId,
        @PathVariable int ingredientId
    ) {
        Result<RecipeIngredient> result = service.deleteRecipeIngredient(recipeId, ingredientId);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }
}
