package capstone.round_table.controllers;

import capstone.round_table.models.Comment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/comment")
public class CommentController {

    // TODO: declare service and create constructor

    @GetMapping
    public List<Comment> findAll() {
        return null;
    }

    @GetMapping("/user/{userId}")
    public List<Comment> findByUser(@PathVariable int userId) {
        return null;
    }

    @GetMapping("/recipe/{recipeId}")
    public List<Comment> findByRecipe(@PathVariable int recipeId) {
        return null;
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Comment comment) {
        return null;
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<Object> update(@PathVariable int commentId, @RequestBody Comment comment) {
        return null;
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> delete(@PathVariable int commentId) {
        return null;
    }

}
