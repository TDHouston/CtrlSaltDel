package capstone.round_table.repository.comment;

import capstone.round_table.models.Comment;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class CommentJdbcRepository implements CommentRepository {

    // TODO: Complete category first
    private final JdbcTemplate jdbcTemplate;

    public CommentJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Comment> findAll() {
//        final String sql = "select comment_id, user_id, recipe_id, content " +
//                "from comment;";
//
//        return jdbcTemplate.query(sql, new CommentMapper());
        return List.of();
    }

    @Override
    public List<Comment> findByUserId(int userId) {
        return List.of();
    }

    @Override
    public List<Comment> findByRecipeId(int recipeId) {
        return List.of();
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
