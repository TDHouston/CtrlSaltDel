package capstone.round_table.repository;

import capstone.round_table.models.User;

import java.util.List;

public interface UserRepository {
    List<User> findAll();
    User findByEmail(String email);
    User findById(int id);
    User findByUsername(String username);

    User addUser(User user);
    boolean updateUser(User user);
    boolean deleteUser(int id);
}
