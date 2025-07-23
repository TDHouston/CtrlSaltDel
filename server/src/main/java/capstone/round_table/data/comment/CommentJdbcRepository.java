package capstone.round_table.data.comment;

import capstone.round_table.models.Comment;
import capstone.round_table.data.mappers.CommentMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class CommentJdbcRepository implements CommentRepository {

    private final JdbcTemplate jdbcTemplate;

    public CommentJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Comment> findAll() {
        final String sql = "select comment_id, user_id, recipe_id, content " +
                "from comment;";

        return jdbcTemplate.query(sql, new CommentMapper());
    }

    @Override
    public List<Comment> findByUserId(int userId) {
        final String sql = "select comment_id, user_id, recipe_id, content " +
                "from comment " +
                "where user_id = ?;";
        return jdbcTemplate.query(sql, new CommentMapper(), userId);
    }

    @Override
    public List<Comment> findByRecipeId(int recipeId) {
        final String sql = "select comment_id, comment.user_id, recipe_id, content, username " +
                "from comment inner join user on comment.user_id = user.user_id " +
                "where recipe_id = ?;";
        return jdbcTemplate.query(sql, new CommentMapper(), recipeId);
    }

    @Override
    public Comment addComment(Comment comment) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        final String sql = "insert into comment (user_id, recipe_id, content)" +
                " values (?,?,?);";

        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, comment.getUserId());
            ps.setInt(2, comment.getRecipeId());
            ps.setString(3, comment.getContent());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }
        comment.setCommentId(keyHolder.getKey().intValue());
        return comment;
    }

    @Override
    public boolean updateComment(Comment comment) {
        final String sql = "update comment set "
                + "content = ? "
                + "where user_id = ? and recipe_id = ? and comment_id = ?;";

        return jdbcTemplate.update(sql,
                comment.getContent(),
                comment.getUserId(),
                comment.getRecipeId(),
                comment.getCommentId()) > 0;
    }

    @Override
    public boolean deleteComment(int commentId) {
        return jdbcTemplate.update("delete from comment where comment_id = ?;", commentId) > 0;
    }
}
