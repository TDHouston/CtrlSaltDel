package capstone.round_table.controllers;

import capstone.round_table.domain.FavoriteService;
import capstone.round_table.domain.Result;
import capstone.round_table.models.Favorite;
import capstone.round_table.models.Recipe;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/favorite")
public class FavoriteController {

    private final FavoriteService service;

    public FavoriteController(FavoriteService service) {
        this.service = service;
    }

    @GetMapping("/top?num={num}")
    public List<Recipe> getTopFavorites(@PathVariable int num) {
        return service.findTopFavorites(num);
    }


    @GetMapping("/{userId}")
    public List<Recipe> getUserFavorites(@PathVariable int userId){
        return service.findUserFavorites(userId);
    }

    @GetMapping("/{recipeId}")
    public int getRecipeFavoriteCount(@PathVariable int recipeId) {
        return service.findRecipeFavoriteCount(recipeId);
    }

    @PostMapping
    public ResponseEntity<Void> add(@RequestBody Favorite favorite) {
        Result<Boolean> deleteResult = service.addFavorites(favorite.getUserId(), favorite.getRecipeId());
        if (deleteResult.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping
    public ResponseEntity<Void> delete(@RequestBody Favorite favorite) {
        Result<Boolean> deleteResult = service.deleteFavorites(favorite.getUserId(), favorite.getRecipeId());
        if (deleteResult.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
