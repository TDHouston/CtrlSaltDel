package capstone.round_table.data;

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

    // first user for finding
    // second user for updating

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
}