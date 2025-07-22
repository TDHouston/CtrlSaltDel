package capstone.round_table.data.instruction;

import capstone.round_table.models.Instruction;

import java.util.List;

public interface InstructionRepository {
    Instruction addInstruction(Instruction instruction);

    List<Instruction> batchAdd(List<Instruction> instructions);

    List<Instruction> findAllByRecipeId(int recipeId);

    boolean updateInstruction(Instruction instruction);

    boolean batchUpdate(List<Instruction> instructions);

    boolean deleteInstructionById(int instructionId);
}
