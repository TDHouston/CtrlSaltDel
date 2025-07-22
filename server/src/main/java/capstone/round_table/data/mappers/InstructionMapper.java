package capstone.round_table.data.mappers;

import capstone.round_table.models.Instruction;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class InstructionMapper implements RowMapper<Instruction> {
    @Override
    public Instruction mapRow(ResultSet resultSet, int i) throws SQLException {
        Instruction instruction = new Instruction();

        instruction.setInstructionId(resultSet.getInt("instruction_id"));
        instruction.setRecipeId(resultSet.getInt("recipe_id"));
        instruction.setStepNumber(resultSet.getInt("step_number"));
        instruction.setDescription(resultSet.getString("description"));

        return instruction;
    }
}
