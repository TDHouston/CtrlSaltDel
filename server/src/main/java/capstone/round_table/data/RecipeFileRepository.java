package capstone.round_table.data;

import capstone.round_table.data.mappers.RecipeMapper;
import capstone.round_table.models.Recipe;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.util.List;
import java.util.stream.Collectors;


@Repository
public class RecipeFileRepository implements RecipeRepository {
    private final JdbcTemplate jdbcTemplate;

    public RecipeFileRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Recipe addRecipe(Recipe recipe) {
        final String sql = "INSERT INTO recipe " +
            "(" +
            "user_id, " +
            "category_id, " +
            "`name`, " +
            "difficulty, " +
            "cook_time, " +
            "servings, " +
            "`description`, " +
            "upvotes" +
            ") " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
            ps.setInt(1, recipe.getUserId());
            ps.setInt(2, recipe.getCategoryId());
            ps.setString(3, recipe.getName());
            ps.setString(4, recipe.getDifficulty().getLevel());
            ps.setInt(5, recipe.getCookTime());
            ps.setInt(6, recipe.getServings());
            ps.setString(7, recipe.getDescription());
            ps.setInt(8, recipe.getUpvotes());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        recipe.setRecipeId(keyHolder.getKey().intValue());
        return recipe;
    }

    @Override
    public List<Recipe> findAll() {
        final String sql = "SELECT " +
            "recipe_id, " +
            "user_id, " +
            "category_id, " +
            "`name`, " +
            "difficulty, " +
            "cook_time, " +
            "servings, " +
            "`description`, " +
            "upvotes " +
            "FROM recipe" +
            ";";

        return jdbcTemplate.query(sql, new RecipeMapper());
    }

    @Override
    public Recipe findByRecipeId(int recipeId) {
        final String sql = "SELECT " +
            "recipe_id, " +
            "user_id, " +
            "category_id, " +
            "`name`, " +
            "difficulty, " +
            "cook_time, " +
            "servings, " +
            "`description`, " +
            "upvotes " +
            "FROM recipe " +
            "WHERE recipe_id = ?" +
            ";";

        Recipe recipe = jdbcTemplate.query(sql, new RecipeMapper(), recipeId)
            .stream()
            .findFirst()
            .orElse(null);

        return recipe;
    }

    @Override
    public List<Recipe> findByUserId(int userId) {
        final String sql = "SELECT " +
            "recipe_id, " +
            "user_id, " +
            "category_id, " +
            "`name`, " +
            "difficulty, " +
            "cook_time, " +
            "servings, " +
            "`description`, " +
            "upvotes " +
            "FROM recipe " +
            "WHERE user_id = ?" +
            ";";

        List<Recipe> result = jdbcTemplate.query(sql, new RecipeMapper(), userId)
            .stream()
            .collect(Collectors.toList());

        return result;
    }

    /**
     * -- RECIPE TABLE
     * CREATE TABLE recipe (
     * 	recipe_id INT PRIMARY KEY AUTO_INCREMENT,
     *     user_id INT NOT NULL,
     *     category_id INT NOT NULL,
     *     `name` VARCHAR(150) NOT NULL,
     *     difficulty VARCHAR(15),
     *     cook_time INT,
     *     servings INT,
     *     `description` VARCHAR(200),
     *     upvotes INT,
     *     -- Foreign Keys
     *     CONSTRAINT fk_user
     * 		FOREIGN KEY (user_id)
     *         REFERENCES `user`(user_id),
     * 	CONSTRAINT fk_category
     * 		FOREIGN KEY (category_id)
     *         REFERENCES category(category_id)
     * );
     * @param recipe
     * @return
     */

    @Override
    public boolean updateRecipe(Recipe recipe) {
        final String sql = "UPDATE recipe SET " +
            "category_id = ?, " +
            "`name` = ?, " +
            "difficulty = ?, " +
            "cook_time = ?, " +
            "servings = ?, " +
            "`description` = ?, " +
            "upvotes = ? " +
            "WHERE recipe_id = ?" +
            ";";

        return jdbcTemplate.update(
            sql,
            recipe.getCategoryId(),
            recipe.getName(),
            recipe.getDifficulty(),
            recipe.getCookTime(),
            recipe.getServings(),
            recipe.getDescription(),
            recipe.getUpvotes(),
            recipe.getRecipeId()
        ) > 0;
    }

    @Override
    public boolean deleteRecipeById(int recipeId) {
        Recipe recipe = findByRecipeId(recipeId);

        // Tables that reference recipe: favorite, comment, recipe_category, recipe_ingredient, instruction
        // TODO: wait for Jason to finish other repos first
        return true;
    }
}
