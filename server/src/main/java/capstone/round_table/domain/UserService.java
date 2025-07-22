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
        return userRepository.findAll();
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User findById(int userId) {
        return userRepository.findById(userId);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Result<User> addUser(User user) {
        Result<User> result = validate(user);
        if (!result.isSuccess()) {
            return result;
        }

        if (user.getUserId() != 0) {
            result.addMessage("User Id cannot be set", ResultType.INVALID);
            return result;
        }

        User addedUser = userRepository.addUser(user);
        result.setPayload(addedUser);

        return result;
    }

    public Result<User> updateUser(User user) {
        Result<User> result = validate(user);
        if (!result.isSuccess()) {
            return result;
        }

        if (user.getUserId() == 0) {
            result.addMessage("User Id must be set", ResultType.INVALID);
            return result;
        }
        if (!userRepository.updateUser(user)) {
            String msg = String.format("user %s, not found", user.getUsername());
            result.addMessage(msg, ResultType.NOT_FOUND);
            return result;
        }
        
        return result;
    }

    public boolean deleteUser(int userId) {
        return userRepository.deleteUser(userId);
    }

    private Result<User> validate(User user) {
        Result<User> userResult = new Result<>();

        if (user == null) {
            userResult.addMessage("User cannot be null", ResultType.INVALID);
            return userResult;
        }

        if (user.getUsername().isEmpty() || user.getUsername().isBlank()) {
            userResult.addMessage("Username is required", ResultType.MISSING_INFO);
            return userResult;
        }

        if (user.getEmail().isEmpty() || user.getEmail().isBlank()) {
            userResult.addMessage("Email is required", ResultType.MISSING_INFO);
            return userResult;
        }

        if (user.getPassword().isEmpty() || user.getPassword().isBlank()) {
            userResult.addMessage("Password is required", ResultType.MISSING_INFO);
            return userResult;
        }

        if (user.getFirstName().isEmpty() || user.getFirstName().isBlank()) {
            userResult.addMessage("First name is required", ResultType.MISSING_INFO);
            return userResult;
        }

        if (user.getLastName().isEmpty() || user.getLastName().isBlank()) {
            userResult.addMessage("Last name is required", ResultType.MISSING_INFO);
            return userResult;
        }

        if (user.getRole() == null) {
            userResult.addMessage("Role cannot be null", ResultType.INVALID);
            return userResult;
        }

        return userResult;
    }


}
