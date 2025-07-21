package capstone.round_table.models;

import java.util.Objects;

public class Comment {
    private int commentId;
    private int userId;
    private int recipeId;
    private int comment;

    public Comment() {
    }

    public int getCommentId() {
        return commentId;
    }

    public void setCommentId(int commentId) {
        this.commentId = commentId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(int recipeId) {
        this.recipeId = recipeId;
    }

    public int getComment() {
        return comment;
    }

    public void setComment(int comment) {
        this.comment = comment;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Comment comment1 = (Comment) o;
        return commentId == comment1.commentId && userId == comment1.userId && recipeId == comment1.recipeId && comment == comment1.comment;
    }

    @Override
    public int hashCode() {
        return Objects.hash(commentId, userId, recipeId, comment);
    }
}
