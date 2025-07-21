package capstone.round_table.repository;

import capstone.round_table.models.User;
import capstone.round_table.repository.mappers.UserMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

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
        return null;
    }

    @Override
    public boolean updateUser(User user) {
        return false;
    }

    @Override
    public boolean deleteUser(int id) {
        return false;
    }
}
