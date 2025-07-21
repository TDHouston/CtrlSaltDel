package capstone.round_table.data;

import capstone.round_table.models.Role;
import capstone.round_table.models.User;
import capstone.round_table.repository.UserJdbcRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class UserJdbcRepositoryTest {

    @Autowired
    UserJdbcRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    // 1 user for finding
    // 2 user for updating
    // 3 user for delete
    // 4 user for add

    @Test
    void findAllUser() {
        List<User> users = repository.findAll();
        assertNotNull(users);
        assertTrue(users.size() >= 3);
    }

    @Test
    void findUserById() {
        User user = repository.findById(1);
        assertNotNull(user);
        assertEquals(1, user.getUserId());
    }

    @Test
    void findUserByUsername() {
        User user = repository.findByUsername("alice");
        assertNotNull(user);
        assertEquals("alice", user.getUsername());
    }

    @Test
    void findUserByEmail() {
        User user = repository.findByEmail("alice@example.com");
        assertNotNull(user);
        assertEquals("alice@example.com", user.getEmail());
    }

    @Test
    void shouldAddUser() {
        User user = generateUser();
        User actual = repository.addUser(user);
        assertNotNull(actual);
        assertEquals(4, actual.getUserId());
    }

    @Test
    void shouldUpdateUser() {
        User user = repository.findById(2);
        user.setUsername("new username");
        user.setRole(Role.USER);
        user.setPassword("new password");
        assertTrue(repository.updateUser(user));
    }

    @Test
    void shouldDeleteUser() {
        assertTrue(repository.deleteUser(3));
    }

    private User generateUser() {
        User user = new User();
        user.setEmail("Test@gmail.com");
        user.setRole(Role.ADMIN);
        user.setPassword("123");
        user.setUsername("test");
        user.setLastName("Mob");
        user.setFirstName("Gray");

        return user;
    }
}