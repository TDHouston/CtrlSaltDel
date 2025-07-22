package capstone.round_table.domain;

import capstone.round_table.data.comment.CommentRepository;
import capstone.round_table.models.Comment;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public List<Comment> findAll() {
        return List.of();
    }

    public List<Comment> findByUserId(int userId) {
        return List.of();
    }

    public List<Comment> findByRecipeId(int recipeId) {
        return List.of();
    }

    public Result<Comment> addComment(Comment comment) {
        return null;
    }

    public Result<Comment> updatecomment(Comment comment) {
        return null;
    }

    public Result<Void> deleteComment(int commentId) {
        return null;
    }

    private Result<Comment> validate (Comment comment) {
        return null;
    }
}
