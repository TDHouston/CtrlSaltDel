package capstone.round_table.domain;

import capstone.round_table.data.user.UserRepository;
import capstone.round_table.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserDetailsService {

    private PasswordEncoder passwordEncoder;
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
            result.addError("User Id cannot be set", ResultType.INVALID);
            return result;
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
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
            result.addError("User Id must be set", ResultType.INVALID);
            return result;
        }
        if (!userRepository.updateUser(user)) {
            String msg = String.format("user %s, not found", user.getUsername());
            result.addError(msg, ResultType.NOT_FOUND);
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
            userResult.addError("User cannot be null", ResultType.INVALID);
            return userResult;
        }

        if (user.getUsername().isEmpty() || user.getUsername().isBlank()) {
            userResult.addError("Username is required", ResultType.MISSING_INFO);
            return userResult;
        }

        if (user.getEmail().isEmpty() || user.getEmail().isBlank()) {
            userResult.addError("Email is required", ResultType.MISSING_INFO);
            return userResult;
        }

        if (user.getPassword().isEmpty() || user.getPassword().isBlank()) {
            userResult.addError("Password is required", ResultType.MISSING_INFO);
            return userResult;
        }

        if (user.getFirstName().isEmpty() || user.getFirstName().isBlank()) {
            userResult.addError("First name is required", ResultType.MISSING_INFO);
            return userResult;
        }

        if (user.getLastName().isEmpty() || user.getLastName().isBlank()) {
            userResult.addError("Last name is required", ResultType.MISSING_INFO);
            return userResult;
        }

        if (user.getRole() == null) {
            userResult.addError("Role cannot be null", ResultType.INVALID);
            return userResult;
        }

        return userResult;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println(username);
        User user = userRepository.findByEmail(username);
        if (user == null || !user.isEnabled()) {
            throw new UsernameNotFoundException(username + " not found");
        }
        return user;
    }
}
