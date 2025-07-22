package capstone.round_table.instruction;

import capstone.round_table.data.KnownGoodState;
import capstone.round_table.data.instruction.InstructionJdbcRepository;
import capstone.round_table.models.Instruction;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class InstructionJdbcRepositoryTest {

    @Autowired
    InstructionJdbcRepository repo;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() { knownGoodState.set(); }

    @Test
    void shouldAddInstruction() {
        Instruction instruction = new Instruction(
            2,
            2,
            "Boil Soup"
        );

        Instruction actual = repo.addInstruction(instruction);
        assertEquals(9, actual.getInstructionId());
    }

    @Test
    void shouldBatchAdd() {
        Instruction step3 = new Instruction(
            1,
            3,
            "Add carrots"
        );

        Instruction step4 = new Instruction(
            1,
            4,
            "Add potato"
        );

        List<Instruction> instructions = Arrays.asList(step3, step4);
        List<Instruction> actual = repo.batchAdd(instructions);
        List<Integer> ids = actual
            .stream()
            .map(i -> i.getInstructionId())
            .sorted()
            .collect(Collectors.toList());

        assertTrue(ids.get(0) >= 9);
        assertTrue(ids.get(0) >= 10);
    }

    @Test
    void shouldFindAllByRecipeId() {
        List<Instruction> instructions = repo.findAllByRecipeId(1);
        assertEquals(2, instructions.size());
    }

    @Test
    void shouldUpdateInstruction() {
        Instruction instruction = new Instruction(
            3, 2, "Add Test"
        );
        instruction.setInstructionId(3);

        assertTrue(repo.updateInstruction(instruction));
    }

    @Test
    void batchUpdate() {
        Instruction instruction1 = new Instruction(
            3, 3, "TEST"
        );
        instruction1.setInstructionId(3);

        Instruction instruction2 = new Instruction(
            4, 2, "Add Test Ingredient"
        );
        instruction2.setInstructionId(3);

        List<Instruction> instructions = Arrays.asList(instruction1, instruction2);
        assertTrue(repo.batchUpdate(instructions));
    }

    @Test
    void deleteInstructionById() {
        assertTrue(repo.deleteInstructionById(5));
    }
}