package capstone.round_table.controllers;

import capstone.round_table.models.Favorite;
import capstone.round_table.models.Recipe;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/favorite")
public class FavoriteController {

    // TODO: add reference to service and create constructor

    @GetMapping("/{userId}")
    public List<Recipe> getUserFavorites(@PathVariable int userId){
        return null;
    }

    @GetMapping("/{recipeId}")
    public int getRecipeFavoriteCount(@PathVariable int recipeId) {
        return -1;
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Favorite favorite) {
        return null;
    }

    @DeleteMapping
    public ResponseEntity<Void> delete(@RequestBody Favorite favorite) {
        return null;
    }
}
