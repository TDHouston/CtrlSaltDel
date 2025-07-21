package capstone.round_table.repository.category;

import capstone.round_table.models.Category;
import capstone.round_table.repository.mappers.CategoryMapper;
import capstone.round_table.repository.mappers.UserMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

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
                "where categoryId = ?;";

        return jdbcTemplate.query(sql, new CategoryMapper(), categoryId).stream()
                .findFirst().orElse(null);
    }

    @Override
    public Category addCategory(Category category) {
        return null;
    }

    @Override
    public boolean updateCategory(Category category) {
        return false;
    }

    @Override
    public boolean deleteCategory(int categoryId) {
        return false;
    }
}
