package capstone.round_table.models;

public enum difficulty {
    EASY("easy"),
    INTERMEDIATE("intermediate"),
    ADVANCED("advanced"),
    EXPERT("expert");

    private String level;

    difficulty(String level) {
        this.level = level;
    }

    public String getLevel() {
        return level;
    }
}
