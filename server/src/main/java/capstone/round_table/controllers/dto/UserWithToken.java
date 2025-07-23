package capstone.round_table.controllers.dto;

import capstone.round_table.models.Role;
import capstone.round_table.models.User;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;

public class UserWithToken {
    private User user;
    private String token;

    private int userId;
    private Role role;
    private String username;
    private String firstName;
    private String lastName;
    private String email;

    public UserWithToken() {
    }

    public UserWithToken(User user, String token) {
        this.user = user;
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setUserInfoToDTO() {
        if (user != null) {
            this.userId = user.getUserId();
            this.role = user.getRole();
            this.username = user.getUsername();
            this.firstName = user.getFirstName();
            this.lastName = user.getLastName();
            this.email = user.getEmail();
        }
    }
}
