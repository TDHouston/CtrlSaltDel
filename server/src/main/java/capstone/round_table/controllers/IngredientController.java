package capstone.round_table.controllers;

import capstone.round_table.models.Ingredient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/ingredients")
public class IngredientController {

    // TODO: declare service and make constructor

    @GetMapping
    public List<Ingredient> findAll(){
        return null;
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Ingredient ingredient) {
        return null;
    }

    @PutMapping("/{ingredientId}")
    public ResponseEntity<Object> update(@PathVariable int ingredientId, @RequestBody Ingredient ingredient) {
        return null;
    }

    @DeleteMapping("/{ingredientId}")
    public ResponseEntity<Void> deleteById(@PathVariable int ingredientId) {
        return null;
    }

}
