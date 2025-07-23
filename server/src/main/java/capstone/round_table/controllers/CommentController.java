package capstone.round_table.controllers;

import capstone.round_table.domain.CommentService;
import capstone.round_table.domain.Result;
import capstone.round_table.models.Comment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/comment")
public class CommentController {

    public CommentController(CommentService service) {
        this.service = service;
    }

    private final CommentService service;

    @GetMapping
    public List<Comment> findAll() {
        return service.findAll();
    }

    @GetMapping("/user/{userId}")
    public List<Comment> findByUser(@PathVariable int userId) {
        return service.findByUserId(userId);
    }

    @GetMapping("/recipe/{recipeId}")
    public List<Comment> findByRecipe(@PathVariable int recipeId) {
        return service.findByRecipeId(recipeId);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Comment comment) {
        Result<Comment> result = service.addComment(comment);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<Object> update(@PathVariable int commentId, @RequestBody Comment comment) {
        if (commentId != comment.getCommentId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Result<Comment> result = service.updateComment(comment);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> delete(@PathVariable int commentId) {
        if (service.deleteComment(commentId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
