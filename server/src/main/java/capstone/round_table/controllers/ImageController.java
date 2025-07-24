package capstone.round_table.controllers;

import capstone.round_table.controllers.dto.ImageUploadResponse;
import capstone.round_table.domain.S3Service;
import capstone.round_table.domain.RecipeService;
import capstone.round_table.models.Recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/recipes/images")
@CrossOrigin(origins = "http://localhost:3000")
public class ImageController {

    @Autowired
    private S3Service s3Service;

    @Autowired
    private RecipeService recipeService;

    private static final List<String> ALLOWED_EXTENSIONS =
        Arrays.asList("jpg", "jpeg", "png", "gif", "webp");

    // MAX_FILE_SIZE equivalent to 10 MB
    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024;

    @PostMapping("/{recipeId}")
    public ResponseEntity<?> uploadRecipeImage(
        @PathVariable int recipeId,
        @RequestParam("file") MultipartFile file) {

        try {
            // Validate file
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("File is empty");
            }
            if (file.getSize() > MAX_FILE_SIZE) {
                return ResponseEntity.badRequest().body("File size exceeds 10MB limit");
            }

            String filename = file.getOriginalFilename();
            if (filename == null || !isValidImageFile(filename)) {
                return ResponseEntity.badRequest().body("Invalid file type. Only images allowed.");
            }

            // Check if recipe exists
            Recipe recipe = recipeService.findByRecipeId(recipeId);
            if (recipe == null) {
                return ResponseEntity.notFound().build();
            }

            // Delete old image if exists
            if (recipe.getImageUrl() != null) {
                String oldKey = s3Service.extractKeyFromUrl(recipe.getImageUrl());
                if (oldKey != null) {
                    s3Service.deleteFile(oldKey);
                }
            }

            // Upload new image
            String imageUrl = s3Service.uploadFile(file, "recipes");

            // Update recipe with image URL
            recipe.setImageUrl(imageUrl);
            recipeService.updateRecipe(recipe);

            return ResponseEntity.ok().body(new ImageUploadResponse(imageUrl));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Failed to upload image: " + e.getMessage());
        }
    }

    @DeleteMapping("/{recipeId}")
    public ResponseEntity<?> deleteRecipeImage(@PathVariable int recipeId) {
        try {
            Recipe recipe = recipeService.findByRecipeId(recipeId);
            if (recipe == null) {
                return ResponseEntity.notFound().build();
            }

            if (recipe.getImageUrl() != null) {
                String key = s3Service.extractKeyFromUrl(recipe.getImageUrl());
                if (key != null) {
                    s3Service.deleteFile(key);
                }

                // Remove image URL from recipe
                recipe.setImageUrl(null);
                recipeService.updateRecipe(recipe);
            }

            return ResponseEntity.ok().build();

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Failed to delete image: " + e.getMessage());
        }
    }

    private boolean isValidImageFile(String filename) {
        String extension = filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();
        return ALLOWED_EXTENSIONS.contains(extension);
    }
}