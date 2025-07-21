package capstone.round_table.repository;

import capstone.round_table.models.User;
import capstone.round_table.repository.mappers.UserMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
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
    public boolean deleteUser(int id) {
        return false;
    }
}
