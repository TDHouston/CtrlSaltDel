package capstone.round_table.data.mappers;

import capstone.round_table.models.Comment;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CommentMapper implements RowMapper<Comment> {
    @Override
    public Comment mapRow(ResultSet rs, int rowNum) throws SQLException {
        Comment comment = new Comment();
        comment.setCommentId(rs.getInt("comment_id"));
        comment.setContent(rs.getString("content"));
        comment.setRecipeId(rs.getInt("recipe_id"));
        comment.setUserId(rs.getInt("user_id"));
        comment.setAuthor(rs.getString("username"));
        return comment;
    }
}
