package capstone.round_table.data.category;

import capstone.round_table.models.Category;
import capstone.round_table.data.mappers.CategoryMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class CategoryJdbcRepository implements CategoryRepository {

    private final JdbcTemplate jdbcTemplate;

    public CategoryJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Category> findAll() {
        final String sql = "select category_id, name " +
                "from category;";
        return jdbcTemplate.query(sql, new CategoryMapper());
    }

    @Override
    public Category findById(int categoryId) {
        final String sql = "select category_id, name " +
                "from category " +
                "where category_id = ?;";

        return jdbcTemplate.query(sql, new CategoryMapper(), categoryId).stream()
                .findFirst().orElse(null);
    }

    @Override
    public Category addCategory(Category category) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        final String sql = "insert into category (name)" +
                " values (?);";

        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, category.getName());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }
        category.setCategoryId(keyHolder.getKey().intValue());
        return category;
    }

    @Override
    public boolean updateCategory(Category category) {
        final String sql = "update category set " +
                "name = ? " +
                "where category_id = ?";
        return jdbcTemplate.update(sql, category.getName(), category.getCategoryId()) > 0;
    }

    @Override
    public boolean deleteCategory(int categoryId) {
        return jdbcTemplate.update("delete from category where category_id = ?;", categoryId) > 0;
    }
}
