package capstone.round_table.controllers;

import capstone.round_table.models.Category;
import capstone.round_table.models.Recipe;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/category")
public class CategoryController {

    // TODO: declare reference to service and create constructor

    @GetMapping
    public List<Category> findAll() {
        return null;
    }

    @GetMapping("/{category}")
    public List<Recipe> findRecipesByCategory(@PathVariable String category) {
        return null;
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Category category) {
        return null;
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<Object> update(@PathVariable int categoryId, @RequestBody Category category) {
        return null;
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<Void> delete(@PathVariable int categoryId) {
        return null;
    }
}
