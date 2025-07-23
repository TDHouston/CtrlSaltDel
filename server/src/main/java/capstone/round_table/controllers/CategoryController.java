package capstone.round_table.controllers;

import capstone.round_table.domain.CategoryService;
import capstone.round_table.domain.Result;
import capstone.round_table.models.Category;
import capstone.round_table.models.Recipe;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/category")
public class CategoryController {

    public CategoryController(CategoryService service) {
        this.service = service;
    }

    private final CategoryService service;

    @GetMapping
    public List<Category> findAll() {
        return service.findAll();
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Category category) {
        Result<Category> result =  service.addCategory(category);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<Object> update(@PathVariable int categoryId, @RequestBody Category category) {
        if (categoryId != category.getCategoryId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Result<Category> result = service.updateCategory(category);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<Void> delete(@PathVariable int categoryId) {
        if (service.deleteCategory(categoryId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
