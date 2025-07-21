package capstone.round_table.models;

public enum role {
    ADMIN("admin"),
    USER("user")
    ;

    private String role;

    role(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}
