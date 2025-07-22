package capstone.round_table.models;

public enum Role {
    ADMIN("ADMIN"),
    USER("USER")
    ;

    private String role;

    Role(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}
