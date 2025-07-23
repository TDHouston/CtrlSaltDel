package capstone.round_table.domain;

import capstone.round_table.data.instruction.InstructionRepository;
import capstone.round_table.data.recipe.RecipeRepository;
import capstone.round_table.models.Instruction;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InstructionService {
    private final InstructionRepository instrRepo;
    private final Validator validator;
    private final String NOT_FOUND = "Instruction ID: %s was not found.";

    public InstructionService(InstructionRepository instrRepo, Validator validator) {
        this.instrRepo = instrRepo;
        this.validator = validator;
    }

    /**
     * Add an instruction step for recipe if values are valid.
     * @param instruction
     * @return
     */
    public Result<Instruction> addInstruction(Instruction instruction) {
        Result<Instruction> result = validate(instruction);
        if (!result.isSuccess()) {
            return result;
        }

        result.setPayload(instrRepo.addInstruction(instruction));
        return result;
    }

    /**
     * Add multiple instructions for a recipe.
     * @param instructions
     * @return
     */
    public Result<List<Instruction>> batchAdd(List<Instruction> instructions) {
        return batchOperation(instructions, false);
    }

    /**
     * Returns list of all instruction steps for a recipe.
     * @param recipeId
     * @return
     */
    public List<Instruction> findAllByRecipeId(int recipeId) {
        return instrRepo.findAllByRecipeId(recipeId);
    }

    /**
     * Update an instruction if update values are valid.
     * @param instruction
     * @return
     */
    public Result<Instruction> updateInstruction(Instruction instruction) {
        Result<Instruction> result = validate(instruction);
        if (!result.isSuccess()) {
            return result;
        }

        validator.validate(instruction.getInstructionId(), "Instruction ID", result);
        if (!result.isSuccess()) {
            return result;
        }

        if (!instrRepo.updateInstruction(instruction)) {
            result.addError(
                String.format(NOT_FOUND, instruction.getInstructionId()),
                ResultType.NOT_FOUND
            );
        }
        return result;
    }

    /**
     * Update multiple instructions for a recipe.
     * @param instructions
     * @return
     */
    public Result<List<Instruction>> batchUpdate(List<Instruction> instructions) {
        return batchOperation(instructions, true);
    }

    /**
     * Delete an instruction if it exists.
     * @param instructionId
     * @return
     */
    public Result<Instruction> deleteInstructionById(int instructionId) {
        Result<Instruction> result = new Result<>();
        if (!instrRepo.deleteInstructionById(instructionId)) {
            result.addError(
                String.format(NOT_FOUND, instructionId),
                ResultType.NOT_FOUND
            );
        }
        return result;
    }

    // HELPER METHODS

    /**
     * Perform batchAdd or batchUpdate depending on boolean isUpdate.
     * @param instructions
     * @param isUpdate
     * @return
     */
    private Result<List<Instruction>> batchOperation(List<Instruction> instructions, boolean isUpdate) {
        Result<List<Instruction>> result = new Result<>();
        List<Instruction> instructionList = new ArrayList<>();

        for (Instruction i : instructions) {
            // Validate each instruction
            Result<Instruction> check = isUpdate ? updateInstruction(i) : addInstruction(i);
            // If any of them are invalid, immediately break after setting errors
            if (!check.isSuccess()) {
                result.addError(check.getErrors().get(0), check.getType());
                break;
            }
            // Else, add new instruction to list
            instructionList.add(check.getPayload());
        }

        // Return errors immediately
        // Only set payload if ALL were valid
        if (!result.isSuccess()) {
            return result;
        }

        result.setPayload(instructionList);
        return result;
    }

    /**
     * Validate Instruction info.
     *  - recipe_id and step_number cannot be null
     *  - step numbers have to be unique for a recipe
     *
     * @param instruction
     * @return
     */
    private Result<Instruction> validate(Instruction instruction) {
        Result<Instruction> result = new Result<>();

        // Validate recipe_id
        validator.validate(instruction.getRecipeId(), "Recipe ID", result);

        // Validate step_number
        validator.validate(instruction.getStepNumber(), "Step Number", result);

        if (!result.isSuccess()) {
            return result;
        }

        // Check for duplicate step number
        validate(instruction, result);
        return result;
    }

    /**
     * Checks for duplicate step numbers.
     * @param instruction
     * @param result
     */
    private void validate(Instruction instruction, Result<Instruction> result) {
        if (findAllByRecipeId(instruction.getRecipeId()).stream()
            // Case when you're only updating description, check that instruction IDs are different
            .filter(i -> i.getInstructionId() != instruction.getInstructionId())
            .anyMatch(i -> i.getStepNumber() == instruction.getStepNumber())
        ) {
            result.addError(
                String.format("Step Number: %s for Recipe ID: %s is already defined.",
                    instruction.getStepNumber(), instruction.getRecipeId()
                ), ResultType.DUPLICATE
            );
        }
    }
}
