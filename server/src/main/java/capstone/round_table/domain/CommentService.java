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
        return commentRepository.findAll();
    }

    public List<Comment> findByUserId(int userId) {
        return commentRepository.findByUserId(userId);
    }

    public List<Comment> findByRecipeId(int recipeId) {
        return commentRepository.findByRecipeId(recipeId);
    }

    public Result<Comment> addComment(Comment comment) {
        Result<Comment> result = validate(comment);

        if (!result.isSuccess()) {
            return result;
        }

        if (comment.getCommentId() != 0) {
            result.addMessage("Comment Id cannot be set", ResultType.INVALID);
            return result;
        }
        result.setPayload(comment);
        return result;
    }

    public Result<Comment> updateComment(Comment comment) {
        Result<Comment> result = validate(comment);

        if (!result.isSuccess()) {
            return result;
        }

        if (comment.getCommentId() == 0) {
            result.addMessage("Comment Id must be set", ResultType.INVALID);
            return result;
        }
        return result;
    }

    public boolean deleteComment(int commentId) {
        return commentRepository.deleteComment(commentId);
    }

    private Result<Comment> validate (Comment comment) {
        Result<Comment> result = new Result<>();

        if (comment == null) {
            result.addMessage("Comment cannot be null", ResultType.INVALID);
            return result;
        }

        if (comment.getUserId() == 0) {
            result.addMessage("User Id must be set", ResultType.INVALID);
            return result;
        }

        if (comment.getRecipeId() == 0) {
            result.addMessage("Recipe Id must be set", ResultType.INVALID);
            return result;
        }

        if (comment.getContent().isEmpty()) {
            result.addMessage("Content must not be empty", ResultType.MISSING_INFO);
            return result;
        }

        return result;
    }
}
