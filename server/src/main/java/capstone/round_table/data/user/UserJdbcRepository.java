package capstone.round_table.data.user;

import capstone.round_table.models.User;
import capstone.round_table.data.mappers.UserMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.Arrays;
import java.util.List;

@Repository
public class UserJdbcRepository implements UserRepository {
    private final JdbcTemplate jdbcTemplate;

    public UserJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<User> findAll() {
        final String sql = "select user_id, role, `first_name`, `last_name`, username, email, password " +
                "from user;";

        return jdbcTemplate.query(sql, new UserMapper());
    }

    @Override
    public User findByEmail(String email) {
        final String sql = "select user_id, role, `first_name`, `last_name`, username, email, password " +
                "from user " +
                "where email = ?;";

        return jdbcTemplate.query(sql, new UserMapper(), email).stream()
                .findFirst().orElse(null);
    }

    @Override
    public User findById(int id) {
        final String sql = "select user_id, role, `first_name`, `last_name`, username, email, password " +
                "from user " +
                "where user_id = ?;";

        return jdbcTemplate.query(sql, new UserMapper(), id).stream()
                .findFirst().orElse(null);
    }

    @Override
    public User findByUsername(String username) {
        final String sql = "select user_id, role, `first_name`, `last_name`, username, email, password " +
                "from user " +
                "where username = ?;";

        return jdbcTemplate.query(sql, new UserMapper(), username).stream()
                .findFirst().orElse(null);
    }

    @Override
    public User addUser(User user) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        final String sql = "insert into `user` (role, first_name, last_name, username, email, password)" +
                " values (?,?,?,?,?,?);";

        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, user.getRole().getRole());
            ps.setString(2, user.getFirstName());
            ps.setString(3, user.getLastName());
            ps.setString(4, user.getUsername());
            ps.setString(5, user.getEmail());
            ps.setString(6, user.getPassword());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }
        user.setUserId(keyHolder.getKey().intValue());
        return user;
    }

    @Override
    public boolean updateUser(User user) {
        final String sql = "update user set "
                + "role = ?, "
                + "first_name = ?, "
                + "last_name = ?, "
                + "username = ?, "
                + "password = ?, "
                + "email = ? "
                + "where user_id = ?;";

        return jdbcTemplate.update(sql,
                user.getRole().getRole(),
                user.getFirstName(),
                user.getLastName(),
                user.getUsername(),
                user.getPassword(),
                user.getEmail(),
                user.getUserId()) > 0;
    }

    @Override
    @Transactional
    public boolean deleteUser(int userId) {
        List<String> tables = Arrays.asList("favorite", "comment", "recipe_category", "recipe_ingredient", "instruction");

        String recipesQuery = "select u.user_id, r.recipe_id " +
                "from user u join recipe r on u.user_id = r.user_id " +
                "where u.user_id = ?;";

        // Get all user's recipe id
        List<Integer> recipeIdList = jdbcTemplate.query(recipesQuery,  (resultSet, rowNum) -> resultSet.getInt("recipe_id"), userId);

        boolean success = true;
        String deleteRecipeFk = "DELETE FROM %s WHERE recipe_id = ?;";
        for (int recipeId : recipeIdList) {
            for (String table : tables) {
                jdbcTemplate.update(String.format(deleteRecipeFk, table), recipeId);
            }
            jdbcTemplate.update(String.format(deleteRecipeFk, "recipe"), recipeId);
        }

        jdbcTemplate.update("delete from favorite where user_id = ?;", userId);
        jdbcTemplate.update("delete from comment where user_id = ?;", userId);

        // Only care the user is able to delete. Other tables might or might not be affected but doesn't matter
        return jdbcTemplate.update("delete from user where user_id = ?;", userId) > 0;
    }
}
