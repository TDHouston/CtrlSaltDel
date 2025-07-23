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
            result.addError("Comment Id cannot be set", ResultType.INVALID);
            return result;
        }

        Comment res = commentRepository.addComment(comment);
        result.setPayload(res);
        return result;
    }

    public Result<Comment> updateComment(Comment comment) {
        Result<Comment> result = validate(comment);

        if (!result.isSuccess()) {
            return result;
        }

        if (comment.getCommentId() == 0) {
            result.addError("Comment Id must be set", ResultType.INVALID);
            return result;
        }

        if (!commentRepository.updateComment(comment)) {
            String msg = String.format("comment: %s, not found", comment.getCommentId());
            result.addError(msg, ResultType.NOT_FOUND);
        }
        return result;
    }

    public boolean deleteComment(int commentId) {
        return commentRepository.deleteComment(commentId);
    }

    private Result<Comment> validate (Comment comment) {
        Result<Comment> result = new Result<>();

        if (comment == null) {
            result.addError("Comment cannot be null", ResultType.INVALID);
            return result;
        }

        if (comment.getUserId() == 0) {
            result.addError("User Id must be set", ResultType.INVALID);
            return result;
        }

        if (comment.getRecipeId() == 0) {
            result.addError("Recipe Id must be set", ResultType.INVALID);
            return result;
        }

        if (comment.getContent().isEmpty()) {
            result.addError("Content must not be empty", ResultType.MISSING_INFO);
            return result;
        }

        return result;
    }
}
