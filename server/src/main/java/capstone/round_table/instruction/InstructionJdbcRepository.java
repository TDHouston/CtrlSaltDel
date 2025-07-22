package capstone.round_table.instruction;

import capstone.round_table.data.mappers.InstructionMapper;
import capstone.round_table.models.Instruction;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.List;

@Repository
public class InstructionJdbcRepository implements InstructionRepository {

    private JdbcTemplate jdbcTemplate;

    public InstructionJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Instruction addInstruction(Instruction instruction) {
        final String sql = "INSERT INTO instruction " +
            "(recipe_id, step_number, `description`) " +
            "VALUES (?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
            ps.setInt(1, instruction.getRecipeId());
            ps.setInt(2, instruction.getStepNumber());
            ps.setString(3, instruction.getDescription());
            return ps;
        }, keyHolder);

        if (rowAffected <= 0) {
            return null;
        }

        instruction.setInstructionId(keyHolder.getKey().intValue());
        return instruction;
    }

    @Override
    public List<Instruction> batchAdd(List<Instruction> instructions) {
        List<Instruction> result = new ArrayList<>();
        for (Instruction instr : instructions) {
            result.add(addInstruction(instr));
        }

        return result;
    }

    @Override
    public List<Instruction> findAllByRecipeId(int recipeId) {
        final String sql = "SELECT " +
            "instruction_id, " +
            "recipe_id, " +
            "step_number, " +
            "description " +
            "FROM instruction " +
            "WHERE recipe_id = ?" +
            ";";

        List<Instruction> result = jdbcTemplate.query(sql, new InstructionMapper(), recipeId);
        return result;
    }

    @Override
    public boolean updateInstruction(Instruction instruction) {
        final String sql = "UPDATE instruction SET " +
            "recipe_id = ?, " +
            "step_number = ?, " +
            "description = ? " +
            "WHERE instruction_id = ?" +
            ";";

        return jdbcTemplate.update(
            sql,
            instruction.getRecipeId(),
            instruction.getStepNumber(),
            instruction.getDescription(),
            instruction.getInstructionId()
        ) > 0;
    }

    @Override
    public boolean batchUpdate(List<Instruction> instructions) {
        for (Instruction instr : instructions) {
            if (!updateInstruction(instr)) {
                return false;
            }
        }

        return true;
    }

    @Override
    public boolean deleteInstructionById(int instructionId) {
        return jdbcTemplate.update("DELETE FROM instruction WHERE instruction_id = ?;", instructionId) > 0;
    }
}
