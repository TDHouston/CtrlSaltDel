package capstone.round_table.jwt;

import capstone.round_table.models.User;
import capstone.round_table.security.jwt.JwtConverter;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import static org.junit.jupiter.api.Assertions.*;

class JwtConverterTest {
//
//    @Autowired
//    JwtConverter jwt;
//
//    @Test
//    void shouldGenerateTokenForUser() {
//        User user = generateUser();
//        String token = jwt.getTokenFromUser(user);
//        assertFalse(token.isBlank());
//    }
//
//    @Test
//    void shouldGetUserFromToken() {
//        // TODO: Need to be implmeneted after user service
//    }
//
//
//    private User generateUser() {
//        User user = new User();
//
//        user.setUserId(1);
//        user.setFirstName("Test");
//        user.setLastName("Tester");
//        user.setEmail("Test@gmail.com");
//        user.setAuthorities(List.of(new SimpleGrantedAuthority("ROLE_ADMIN")));
//        user.setUsername("test");
//        user.setPassword("123");
//        return user;
//    }
}