package capstone.round_table.data.user;

import capstone.round_table.models.User;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserRepository {
    List<User> findAll();
    User findByEmail(String email);
    User findById(int id);
    User findByUsername(String username);

    User addUser(User user);
    boolean updateUser(User user);

    @Transactional
    boolean deleteUser(int id);
}
