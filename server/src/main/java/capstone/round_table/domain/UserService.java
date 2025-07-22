package capstone.round_table.domain;

import capstone.round_table.data.user.UserRepository;
import capstone.round_table.models.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public List<User> findAll() {
        return List.of();
    }

    public Result<User> findByEmail(String email) {
        return null;
    }

    public Result<User> findById(int id) {
        return null;
    }

    public Result<User> findByUsername(String username) {
        return null;
    }

    public Result<User> addUser(User user) {
        return null;
    }

    public Result<User> updateUser(User user) {
        return null;
    }

    public Result<Void> deleteUser(int userId) {
        return null;
    }

    private Result<User> validate(User user) {
        return null;
    }


}
