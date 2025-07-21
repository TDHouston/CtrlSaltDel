package capstone.round_table.repository.comment;

import capstone.round_table.models.Comment;
import capstone.round_table.repository.mappers.CommentMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

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
        final String sql = "select comment_id, user_id, recipe_id, content " +
                "from comment " +
                "where recipe_id = ?;";
        return jdbcTemplate.query(sql, new CommentMapper(), recipeId);
    }

    @Override
    public Comment addComment(Comment comment) {
        return null;
    }

    @Override
    public boolean updateComment(Comment comment) {
        return false;
    }

    @Override
    public boolean deleteComment(int commentId) {
        return false;
    }
}
