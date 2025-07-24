package capstone.round_table.controllers;

import capstone.round_table.domain.IngredientService;
import capstone.round_table.domain.Result;
import capstone.round_table.models.Ingredient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/ingredients")
public class IngredientController {
    private final IngredientService service;

    public IngredientController(IngredientService service) {
        this.service = service;
    }

    @GetMapping
    public List<Ingredient> findAll() {
        return service.findAll();
    }

    @GetMapping("/{ingredientId}")
    public Ingredient findById(@PathVariable int ingredientId) {
        return service.findById(ingredientId);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Ingredient ingredient) {
        Result<Ingredient> result = service.addIngredient(ingredient);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{ingredientId}")
    public ResponseEntity<Object> update(
        @PathVariable int ingredientId,
        @RequestBody Ingredient ingredient
    ) {
        if (ingredientId != ingredient.getIngredientId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Ingredient> result = service.updateIngredient(ingredient);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{ingredientId}")
    public ResponseEntity<Object> deleteById(@PathVariable int ingredientId) {
        Result<Ingredient> result = service.deleteIngredientById(ingredientId);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }
}
