package capstone.round_table.data;


import capstone.round_table.data.KnownGoodState;
import capstone.round_table.data.user.UserJdbcRepository;
import capstone.round_table.models.Role;
import capstone.round_table.models.User;
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

    // 1 for finding
    // 2 for finding
    // 3 for updating
    // 4 for updating
    // 5 for delete
    // 6 for delete
    // Add for rest

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
        User user = repository.findByUsername("jsmith");
        assertNotNull(user);
        assertEquals("jsmith", user.getUsername());
        assertEquals("jsmith@example.com", user.getEmail());
        assertEquals("smith", user.getPassword());
    }

    @Test
    void findUserByEmail() {
        User user = repository.findByEmail("bburn@example.com");
        assertNotNull(user);
        assertEquals("bburn", user.getUsername());
        assertEquals("bburn@example.com", user.getEmail());
        assertEquals("burn", user.getPassword());
    }

    @Test
    void shouldAddUser() {
        User user = generateUser();
        User actual = repository.addUser(user);
        assertNotNull(actual);
        assertEquals(7, actual.getUserId());
    }

    @Test
    void shouldUpdateUser() {
        User user = repository.findById(3);
        user.setUsername("new username");
        user.setRole(Role.USER);
        user.setPassword("new password");
        assertTrue(repository.updateUser(user));
    }

    @Test
    void shouldDeleteUser() {
        assertTrue(repository.deleteUser(6));
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