package capstone.round_table.models;

import java.util.Objects;

public class Comment {
    private int commentId;
    private int userId;
    private int recipeId;
    private String content;

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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Comment comment1 = (Comment) o;
        return commentId == comment1.commentId && userId == comment1.userId && recipeId == comment1.recipeId && content == comment1.content;
    }

    @Override
    public int hashCode() {
        return Objects.hash(commentId, userId, recipeId, content);
    }
}
