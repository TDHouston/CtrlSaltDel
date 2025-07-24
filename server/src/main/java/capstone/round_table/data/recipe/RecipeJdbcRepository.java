package capstone.round_table.data.recipe;

import capstone.round_table.data.mappers.CategoryMapper;
import capstone.round_table.data.mappers.PseudoRecipeMapper;
import capstone.round_table.data.mappers.RecipeMapper;
import capstone.round_table.models.Recipe;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@Repository
public class RecipeJdbcRepository implements RecipeRepository {
    private final JdbcTemplate jdbcTemplate;

    public RecipeJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    /**
     * Add a new Recipe.
     * @param recipe
     * @return
     */
    @Override
    public Recipe addRecipe(Recipe recipe) {
        final String sql = "INSERT INTO recipe " +
            "(" +
            "user_id, " +
            "`name`, " +
            "difficulty, " +
            "cook_time, " +
            "servings, " +
            "`description`, " +
            "image_url" +
            ") " +
            "VALUES (?, ?, ?, ?, ?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
            ps.setInt(1, recipe.getUserId());
            ps.setString(2, recipe.getName());
            ps.setString(3, recipe.getDifficulty().getLevel());
            ps.setInt(4, recipe.getCookTime());
            ps.setInt(5, recipe.getServings());
            ps.setString(6, recipe.getDescription());
            ps.setString(7, recipe.getImageUrl());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        recipe.setRecipeId(keyHolder.getKey().intValue());
        return recipe;
    }

    /**
     * Returns a list of all the recipes.
     * @return
     */
    @Override
    public List<Recipe> findAll() {
        final String sql = "SELECT " +
            "recipe_id, " +
            "recipe.user_id, " +
            "`name` AS recipe_name, " +
            "difficulty, " +
            "cook_time, " +
            "servings, " +
            "`description`, " +
            "u.username, " +
            "featured, " +
            "image_url " +
            "FROM recipe INNER JOIN user u ON recipe.user_id = u.user_id" +
            ";";

        return jdbcTemplate.query(sql, new PseudoRecipeMapper());
    }

    /**
     * Find a specific Recipe.
     * @param recipeId
     * @return
     */
    @Override
    @Transactional(readOnly = true)
    public Recipe findByRecipeId(int recipeId) {
        final String sql = "SELECT " +
            "recipe_id, " +
            "recipe.user_id, " +
            "`name` AS recipe_name, " +
            "difficulty, " +
            "cook_time, " +
            "servings, " +
            "`description`, " +
            "u.username, "+
            "featured, " +
            "image_url " +
            "FROM recipe INNER JOIN user u ON u.user_id = recipe.user_id " +
            "WHERE recipe_id = ?" +
            ";";

        Recipe recipe = jdbcTemplate.query(sql, new PseudoRecipeMapper(), recipeId)
            .stream()
            .findFirst()
            .orElse(null);

        // Recipe + Category has a many-many relationship
        // Recipe will store the list of Categories
        if (recipe != null) {
            addCategories(recipe);

        }

        return recipe;
    }

    /**
     * Find all recipes a user has added.
     * @param userId
     * @return
     */
    @Override
    public List<Recipe> findRecipesByUserId(int userId) {
        final String sql = "SELECT " +
            "recipe_id, " +
            "user_id, " +
            "`name` AS recipe_name, " +
            "difficulty, " +
            "cook_time, " +
            "servings, " +
            "`description`, " +
            "featured, " +
            "image_url " +
            "FROM recipe " +
            "WHERE user_id = ?" +
            ";";

        List<Recipe> result = new ArrayList<>(jdbcTemplate.query(sql, new RecipeMapper(), userId));
        return result;
    }


    /**
     * Update a Recipe.
     * @param recipe
     * @return
     */
    @Override
    public boolean updateRecipe(Recipe recipe) {
        final String sql = "UPDATE recipe SET " +
            "`name` = ?, " +
            "difficulty = ?, " +
            "cook_time = ?, " +
            "servings = ?, " +
            "`description` = ?," +
            "featured = ?, " +
            "image_url = ? " +
            "WHERE recipe_id = ?" +
            ";";

        return jdbcTemplate.update(
            sql,
            recipe.getName(),
            recipe.getDifficulty().getLevel(),
            recipe.getCookTime(),
            recipe.getServings(),
            recipe.getDescription(),
            recipe.isFeatured(),
            recipe.getImageUrl(),
            recipe.getRecipeId()
        ) > 0;
    }

    /**
     * Delete a specific Recipe.
     * @param recipeId
     * @return
     */
    @Override
    @Transactional
    public boolean deleteRecipeById(int recipeId) {
        // Tables that reference recipe table: favorite, comment, recipe_category, recipe_ingredient, instruction
        List<String> tables = Arrays.asList("favorite", "comment", "recipe_category", "recipe_ingredient", "instruction");

        String sql = "DELETE FROM %s WHERE recipe_id = ?;";
        for (String table : tables) {
            jdbcTemplate.update(String.format(sql, table), recipeId);
        }

        return jdbcTemplate.update(String.format(sql, "recipe"), recipeId) > 0;
    }

    /**
     * Updates Recipe w/ list of Categories it falls under.
     * @param recipe
     */
    private void addCategories(Recipe recipe) {
        final String sql = "SELECT c.category_id, c.`name` " +
            "FROM category c " +
            "JOIN recipe_category rc ON c.category_id = rc.category_id " +
            "WHERE rc.recipe_id = ?" +
            ";";

        var categories = jdbcTemplate.query(sql, new CategoryMapper(), recipe.getRecipeId());
        recipe.setCategories(categories);
    }
}
