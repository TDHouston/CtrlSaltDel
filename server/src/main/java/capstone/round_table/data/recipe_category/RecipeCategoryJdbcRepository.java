package capstone.round_table.data.recipe_category;

import capstone.round_table.data.mappers.CategoryMapper;
import capstone.round_table.data.mappers.RecipeMapper;
import capstone.round_table.models.Category;
import capstone.round_table.models.Recipe;
import capstone.round_table.models.RecipeCategory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class RecipeCategoryJdbcRepository implements RecipeCategoryRepository{

    private final JdbcTemplate jdbcTemplate;

    public RecipeCategoryJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Category> findAllCategoryByRecipeId(int categoryId) {
        final String sql = "select c.category_id, c.name from recipe_category rc join category c on c.category_id = rc.category_id where rc.recipe_id = ?;";
        return jdbcTemplate.query(sql, new CategoryMapper(), categoryId);
    }

    @Override
    public List<Recipe> findAllRecipeByCategoryId(int recipeId) {
        final String sql = "select r.recipe_id, r.user_id, r.name as recipe_name, r.difficulty, r.cook_time, r.servings, r.description, r.featured from recipe_category rc join recipe r on rc.recipe_id = r.recipe_id where r.recipe_id = ?;";
        return jdbcTemplate.query(sql, new RecipeMapper(), recipeId);
    }

    @Override
    @Transactional
    public boolean batchAddRecipeCategory(List<RecipeCategory> recipeCategories) {
        boolean success = true;
        for (RecipeCategory recipeCategory : recipeCategories) {
            success = addRecipeCategory(recipeCategory.getRecipeId(), recipeCategory.getCategoryId()) && success;
        }
        return success;
    }

    @Override
    public boolean addRecipeCategory(int recipeId, int categoryId) {
        final String sql = "insert into recipe_category (recipe_id, category_id)" +
                " values (?,?);";
        return jdbcTemplate.update(sql, recipeId, categoryId) > 0;
    }

    @Override
    public boolean deleteRecipeCategory(int recipeId, int categoryId) {
        return jdbcTemplate.update("delete from recipe_category where recipe_id = ? and category_id = ?;", recipeId, categoryId) > 0;
    }
}
