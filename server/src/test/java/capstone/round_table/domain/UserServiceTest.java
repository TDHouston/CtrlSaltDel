package capstone.round_table.domain;

import capstone.round_table.data.user.UserRepository;
import capstone.round_table.models.Role;
import capstone.round_table.models.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class UserServiceTest {
    @Autowired
    UserService service;

    @MockBean
    UserRepository repository;

    @Test
    void shouldFindAll() {

        when(repository.findAll()).thenReturn(generateListUser());
        List<User> actual = service.findAll();
        assertEquals(2, actual.size());
    }

    @Test
    void shouldFindByEmail() {
        when(repository.findByEmail("user3@gmail.com")).thenReturn(generateUser());
        User actual = service.findByEmail("user3@gmail.com");
        assertEquals(3, actual.getUserId());
        assertEquals("user3@gmail.com", actual.getEmail());
    }

    @Test
    void shouldFindByUsername() {
        when(repository.findByUsername("user3")).thenReturn(generateUser());
        User actual = service.findByUsername("user3");
        assertEquals(3, actual.getUserId());
        assertEquals("user3", actual.getUsername());
    }

    @Test
    void shouldFindById() {
        when(repository.findById(3)).thenReturn(generateUser());
        User actual = service.findById(3);
        assertEquals(3, actual.getUserId());
    }

    @Test
    void shouldNotFindByEmail() {
        when(repository.findByEmail("user13@gmail.com")).thenReturn(null);
        User actual = service.findByEmail("user13@gmail.com");
        assertNull(actual);
    }


    @Test
    void shouldNotFindById() {
        when(repository.findById(55)).thenReturn(null);
        User actual = service.findById(55);
        assertNull(actual);
    }

    @Test
    void shouldNotFindByUsername() {
        when(repository.findByUsername("NotExist")).thenReturn(null);
        User actual = service.findByUsername("NotExist");
        assertNull(actual);
    }

    @Test
    void shouldAddUser() {
        User user = generateUser();
        user.setUserId(0);

        when(repository.addUser(user)).thenReturn(user);
        Result<User> result = service.addUser(user);
        assertTrue(result.isSuccess());
    }

    @Test
    void shouldNotAddUserSetId() {
        User user = generateUser();
        Result<User> result = service.addUser(user);
        assertFalse(result.isSuccess());
    }

    @Test
    void shouldNotAddUserMissingUsername() {
        User user = generateUser();
        user.setUserId(0);
        user.setUsername("");
        Result<User> result = service.addUser(user);
        assertFalse(result.isSuccess());
    }

    @Test
    void shouldNotAddNullUser() {
        Result<User> result = service.addUser(null);
        assertFalse(result.isSuccess());
    }

    @Test
    void shouldNotAddUserMissingPassword() {
        User user = generateUser();
        user.setUserId(0);
        user.setPassword("");
        Result<User> result = service.addUser(user);
        assertFalse(result.isSuccess());
    }

    @Test
    void shouldNotAddUserMissingRole() {
        User user = generateUser();
        user.setUserId(0);
        user.setRole(null);
        Result<User> result = service.addUser(user);
        assertFalse(result.isSuccess());
    }

    @Test
    void shouldNotAddUserMissingEmail() {
        User user = generateUser();
        user.setUserId(0);
        user.setEmail("");
        Result<User> result = service.addUser(user);
        assertFalse(result.isSuccess());
    }

    @Test
    void shouldNotAddUserMissingFirstName() {
        User user = generateUser();
        user.setUserId(0);
        user.setFirstName("");
        Result<User> result = service.addUser(user);
        assertFalse(result.isSuccess());
    }

    @Test
    void shouldNotAddUserMissingLastName() {
        User user = generateUser();
        user.setUserId(0);
        user.setLastName("");
        Result<User> result = service.addUser(user);
        assertFalse(result.isSuccess());
    }

    @Test
    void shouldUpdateUser() {
        User user = generateUser();
        user.setEmail("newemail@gmail.com");
        when(repository.updateUser(user)).thenReturn(true);
        Result<User> result = service.updateUser(user);
        assertTrue(result.isSuccess());
    }

    @Test
    void shouldNotUpdateUser() {
        User user = generateUser();
        user.setUserId(0);
        Result<User> result = service.updateUser(user);
        assertFalse(result.isSuccess());
    }

    @Test
    void shouldDeleteUser() {
        when(repository.deleteUser(3)).thenReturn(true);
        assertTrue(service.deleteUser(3));
    }

    @Test
    void shouldNotDeleteUser() {
        when(repository.deleteUser(13)).thenReturn(false);
        assertFalse(service.deleteUser(13));
    }

    private List<User> generateListUser() {

        User user1 = new User();
        user1.setUserId(1);
        user1.setUsername("user1");
        user1.setPassword("123");
        user1.setEmail("user1@gmail.com");
        user1.setFirstName("user");
        user1.setLastName("tester");
        user1.setRole(Role.USER);

        User user2 = new User();
        user2.setUserId(1);
        user2.setUsername("user2");
        user2.setPassword("321");
        user2.setEmail("user2@gmail.com");
        user2.setFirstName("user2");
        user2.setLastName("tester2");
        user2.setRole(Role.ADMIN);

        return List.of(user1, user2);
    }

    private User generateUser() {

        User user1 = new User();
        user1.setUserId(3);
        user1.setUsername("user3");
        user1.setPassword("12345");
        user1.setEmail("user3@gmail.com");
        user1.setFirstName("user3");
        user1.setLastName("tester3");
        user1.setRole(Role.USER);

        return user1;
    }


}
