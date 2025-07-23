package capstone.round_table.models;

import java.util.Objects;

public class Instruction {
    private int instructionId;
    private int recipeId;
    private int stepNumber;
    private String description;

    public Instruction(){}

    public Instruction(int recipeId, int stepNumber, String description) {
        this.recipeId = recipeId;
        this.stepNumber = stepNumber;
        this.description = description;
    }

    public Instruction(int instructionId, int recipeId, int stepNumber, String description) {
        this.instructionId = instructionId;
        this.recipeId = recipeId;
        this.stepNumber = stepNumber;
        this.description = description;
    }

    public int getInstructionId() {
        return instructionId;
    }

    public void setInstructionId(int instructionId) {
        this.instructionId = instructionId;
    }

    public int getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(int recipeId) {
        this.recipeId = recipeId;
    }

    public int getStepNumber() {
        return stepNumber;
    }

    public void setStepNumber(int stepNumber) {
        this.stepNumber = stepNumber;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Instruction that = (Instruction) o;
        return instructionId == that.instructionId && recipeId == that.recipeId && stepNumber == that.stepNumber && Objects.equals(description, that.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(instructionId, recipeId, stepNumber, description);
    }
}
