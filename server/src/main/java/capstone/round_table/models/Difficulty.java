package capstone.round_table.models;

public enum Difficulty {
    EASY("easy"),
    INTERMEDIATE("intermediate"),
    ADVANCED("advanced"),
    EXPERT("expert")
    ;

    private String level;

    Difficulty(String level) {
        this.level = level;
    }

    public String getLevel() {
        return level;
    }
}
