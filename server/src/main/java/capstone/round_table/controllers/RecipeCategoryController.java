package capstone.round_table.controllers;

// import capstone.round_table.domain.CategorySearchService;
import capstone.round_table.domain.RecipeCategoryService;
// import capstone.round_table.domain.RecipeSearchService;
import capstone.round_table.models.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/recipe_category")
public class RecipeCategoryController {

    private final RecipeCategoryService service;
    // private final RecipeSearchService recipeSearchService;
    // private final CategorySearchService categorySearchService;

    public RecipeCategoryController(RecipeCategoryService service) {
        this.service = service;
        // this.recipeSearchService = recipeSearchService;
        // this.categorySearchService = categorySearchService;
    }

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
        // int recipeId = recipeCategories.get(0).getRecipeId();
        // RecipeDocument recipeDocument = recipeSearchService.findById(recipeId);

        // List<String> cd = categorySearchService.convertToCDList(recipeCategories);
        // recipeDocument.setCategories(cd);
        // recipeSearchService.update(recipeDocument);

        if (service.batchAddRecipeCategory(recipeCategories)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Void> addRecipeCategory(@RequestBody RecipeCategory recipeCategory) {
        boolean success = service.addRecipeCategory(recipeCategory.getRecipeId(), recipeCategory.getCategoryId());
        if (success) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // probably don't need to use and just batch update
    @DeleteMapping("/{recipeId}/{categoryId}")
    public ResponseEntity<Void> deleteRecipeCategory(@PathVariable int recipeId, @PathVariable int categoryId) {
        if (service.deleteRecipeCategory(recipeId, categoryId)) {

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


}
