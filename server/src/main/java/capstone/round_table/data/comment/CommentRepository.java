package capstone.round_table.data.comment;

import capstone.round_table.models.Comment;

import java.util.List;

public interface CommentRepository {
    List<Comment> findAll();
    List<Comment> findByUserId(int userId);
    List<Comment> findByRecipeId(int recipeId);

    Comment addComment(Comment comment);
    boolean updateComment(Comment comment);
    boolean deleteComment(int commentId);
}
