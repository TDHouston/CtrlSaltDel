package capstone.round_table.controllers;

import capstone.round_table.domain.RecipeCategoryService;
import capstone.round_table.models.Category;
import capstone.round_table.models.Recipe;
import capstone.round_table.models.RecipeCategory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/recipe_category")
public class RecipeCategoryController {

    public RecipeCategoryController(RecipeCategoryService service) {
        this.service = service;
    }

    private final RecipeCategoryService service;

    @GetMapping("/category/{recipeId}")
    public List<Category> findAllCategoryByRecipeId(@PathVariable int recipeId) {
        return service.findAllCategoryByRecipeId(recipeId);
    }

    @GetMapping("/recipe/{categoryId}")
    public List<Recipe> findAllRecipeByCategoryId(@PathVariable int categoryId) {
        return service.findAllRecipeByCategoryId(categoryId);
    }

    @PostMapping("/batch")
    public ResponseEntity<Void> batchAddRecipeCategory(@RequestBody List<RecipeCategory> recipeCategories) {
        // i need to get recipeId and the all the categories
        if (service.batchAddRecipeCategory(recipeCategories)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Void> addRecipeCategory(@RequestBody RecipeCategory recipeCategory) {
        System.out.println(recipeCategory.getCategoryId());
        System.out.println(recipeCategory.getRecipeId());
        boolean success = service.addRecipeCategory(recipeCategory.getRecipeId(), recipeCategory.getCategoryId());
        if (success) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{recipeId}/{categoryId}")
    public ResponseEntity<Void> deleteRecipeCategory(@PathVariable int recipeId, @PathVariable int categoryId) {
        if (service.deleteRecipeCategory(recipeId, categoryId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


}
