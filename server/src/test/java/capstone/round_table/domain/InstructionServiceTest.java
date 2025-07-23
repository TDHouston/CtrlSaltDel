package capstone.round_table.domain;

import capstone.round_table.data.instruction.InstructionRepository;
import capstone.round_table.models.Instruction;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class InstructionServiceTest {

    @Autowired
    InstructionService service;

    @MockBean
    InstructionRepository repo;

    @Test
    void shouldAddInstruction() {
        List<Instruction> instructions = Arrays.asList(
            new Instruction(1,1, 1, "Step One"),
            new Instruction(2, 1, 2, "Step Two")
        );
        Instruction instruction = new Instruction(1, 3, "Step Three");
        Instruction mockOut = new Instruction(3, 1, 1, "Step Three");

        when(repo.findAllByRecipeId(1)).thenReturn(instructions);
        when(repo.addInstruction(instruction)).thenReturn(mockOut);

        Result<Instruction> result = service.addInstruction(instruction);
        assertEquals(ResultType.SUCCESS, result.getType());
        assertEquals(mockOut, result.getPayload());
    }

    @Test
    void shouldNotAddDuplicateStepNumber() {
        List<Instruction> instructions = Arrays.asList(
            new Instruction(1,1, 1, "Step One"),
            new Instruction(2, 1, 2, "Step Two")
        );
        Instruction instruction = new Instruction(1, 2, "Step Three");

        when(repo.findAllByRecipeId(1)).thenReturn(instructions);

        Result<Instruction> result = service.addInstruction(instruction);
        assertEquals(ResultType.DUPLICATE, result.getType());
        assertEquals("Step Number: 2 for Recipe ID: 1 is already defined.", result.getErrors().get(0));
    }

    @Test
    void shouldNotAddRecipeIdEqualZero() {
        Instruction instruction = new Instruction(0, 3, "Step Three");
        Result<Instruction> result = service.addInstruction(instruction);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Recipe ID must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotAddNegativeRecipeId() {
        Instruction instruction = new Instruction(-1, 3, "Step Three");
        Result<Instruction> result = service.addInstruction(instruction);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Recipe ID must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotAddStepNumberEqualZero() {
        Instruction instruction = new Instruction(1, 0, "Step Three");
        Result<Instruction> result = service.addInstruction(instruction);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Step Number must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotAddNegativeStepNumber() {
        Instruction instruction = new Instruction(1, -3, "Step Three");
        Result<Instruction> result = service.addInstruction(instruction);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Step Number must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldBatchAdd() {
        Instruction i1 = new Instruction(1, 1, "Step One");
        Instruction i2 = new Instruction(1, 2, "Step Two");
        List<Instruction> instructions = Arrays.asList(i1, i2);

        when(repo.findAllByRecipeId(1)).thenReturn(new ArrayList<>());
        when(repo.addInstruction(i1)).thenReturn(i1);
        when(repo.addInstruction(i2)).thenReturn(i2);

        Result<Instruction> result = service.batchAdd(instructions);
        assertEquals(ResultType.SUCCESS, result.getType());
    }

    @Test
    void shouldBatchAddDuplicateStepNumber() {
        Instruction i1 = new Instruction(1, 1, "Step One");
        Instruction i2 = new Instruction(1, 2, "Step Two");
        List<Instruction> instructions = Arrays.asList(i1, i2);

        when(repo.findAllByRecipeId(1)).thenReturn(List.of(
            new Instruction(3,1, 1, "Test")
        ));

        Result<Instruction> result = service.batchAdd(instructions);
        assertEquals(ResultType.DUPLICATE, result.getType());
        assertEquals("Step Number: 1 for Recipe ID: 1 is already defined.", result.getErrors().get(0));
    }

    @Test
    void shouldNotBatchAddRecipeIdEqualZero() {
        Instruction i1 = new Instruction(0, 1, "Step One");
        Instruction i2 = new Instruction(1, 2, "Step Two");
        List<Instruction> instructions = Arrays.asList(i1, i2);

        Result<Instruction> result = service.batchAdd(instructions);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Recipe ID must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotBatchAddNegativeRecipeId() {
        Instruction i1 = new Instruction(-1, 1, "Step One");
        Instruction i2 = new Instruction(1, 2, "Step Two");
        List<Instruction> instructions = Arrays.asList(i1, i2);

        Result<Instruction> result = service.batchAdd(instructions);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Recipe ID must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotBatchAddStepNumberEqualZero() {
        Instruction i1 = new Instruction(1, 0, "Step One");
        Instruction i2 = new Instruction(1, 2, "Step Two");
        List<Instruction> instructions = Arrays.asList(i1, i2);

        Result<Instruction> result = service.batchAdd(instructions);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Step Number must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotBatchAddNegativeStepNumber() {
        Instruction i1 = new Instruction(1, -1, "Step One");
        Instruction i2 = new Instruction(1, 2, "Step Two");
        List<Instruction> instructions = Arrays.asList(i1, i2);

        Result<Instruction> result = service.batchAdd(instructions);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Step Number must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void findAllByRecipeId() {
        List<Instruction> instructions = Arrays.asList(
            new Instruction(1,1, 1, "Step One"),
            new Instruction(2, 1, 2, "Step Two")
        );

        when(repo.findAllByRecipeId(1)).thenReturn(instructions);

        List<Instruction> result = service.findAllByRecipeId(1);
        assertEquals(2, result.size());
    }

    @Test
    void shouldUpdateInstruction() {
        List<Instruction> instructions = Arrays.asList(
            new Instruction(1,1, 1, "Step One"),
            new Instruction(2, 1, 2, "Step Two")
        );
        Instruction instruction = new Instruction(1,1, 1, "Test");

        when(repo.findAllByRecipeId(1)).thenReturn(instructions);
        when(repo.updateInstruction(instruction)).thenReturn(true);

        Result<Instruction> result = service.updateInstruction(instruction);
        assertEquals(ResultType.SUCCESS, result.getType());
    }

    @Test
    void shouldNotUpdateDuplicateStepNumber() {
        List<Instruction> instructions = Arrays.asList(
            new Instruction(1,1, 1, "Step One"),
            new Instruction(2, 1, 2, "Step Two")
        );
        Instruction instruction = new Instruction(3,1, 2, "Test");

        when(repo.findAllByRecipeId(1)).thenReturn(instructions);
        Result<Instruction> result = service.updateInstruction(instruction);
        assertEquals(ResultType.DUPLICATE, result.getType());
        assertEquals("Step Number: 2 for Recipe ID: 1 is already defined.", result.getErrors().get(0));
    }

    @Test
    void shouldNotUpdateInstructionIdEqualZero() {
        Instruction instruction = new Instruction(0,1, 2, "Test");
        Result<Instruction> result = service.updateInstruction(instruction);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Instruction ID must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotUpdateNegativeInstructionId() {
        Instruction instruction = new Instruction(-1,1, 2, "Test");
        Result<Instruction> result = service.updateInstruction(instruction);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Instruction ID must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotUpdateRecipeIdEqualZero() {
        Instruction instruction = new Instruction(1,0, 2, "Test");
        Result<Instruction> result = service.updateInstruction(instruction);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Recipe ID must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotUpdateNegativeRecipeId() {
        Instruction instruction = new Instruction(1,-1, 2, "Test");
        Result<Instruction> result = service.updateInstruction(instruction);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Recipe ID must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotUpdateStepNumberEqualZero() {
        Instruction instruction = new Instruction(1,1, 0, "Test");
        Result<Instruction> result = service.updateInstruction(instruction);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Step Number must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotUpdateNegativeStepNumber() {
        Instruction instruction = new Instruction(1,1, -2, "Test");
        Result<Instruction> result = service.updateInstruction(instruction);
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Step Number must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldBatchUpdate() {
        Instruction i1 = new Instruction(1,1, 1, "Step One");
        Instruction i2 = new Instruction(2,1, 2, "Step Two");
        List<Instruction> instructions = Arrays.asList(i1, i2);

        when(repo.findAllByRecipeId(1)).thenReturn(instructions);
        when(repo.updateInstruction(i1)).thenReturn(true);
        when(repo.updateInstruction(i2)).thenReturn(true);

        Result<Instruction> result = service.batchUpdate(instructions);
        assertEquals(ResultType.SUCCESS, result.getType());
    }

    @Test
    void shouldNotBatchUpdateDuplicateStepNumber() {
        List<Instruction> instructions = Arrays.asList(
            new Instruction(1,1, 1, "Step One"),
            new Instruction(2, 1, 2, "Step Two")
        );
        Instruction instruction = new Instruction(3,1, 2, "Test");

        when(repo.findAllByRecipeId(1)).thenReturn(instructions);
        Result<Instruction> result = service.batchUpdate(Arrays.asList(instruction));
        assertEquals(ResultType.DUPLICATE, result.getType());
        assertEquals("Step Number: 2 for Recipe ID: 1 is already defined.", result.getErrors().get(0));
    }

    @Test
    void shouldNotBatchUpdateRecipeIdEqualZero() {
        Instruction instruction = new Instruction(3,0, 2, "Test");
        Result<Instruction> result = service.batchUpdate(Arrays.asList(instruction));
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Recipe ID must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldNotBatchUpdateNegativeRecipeId() {
        Instruction instruction = new Instruction(3,-1, 2, "Test");
        Result<Instruction> result = service.batchUpdate(Arrays.asList(instruction));
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Recipe ID must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldBatchAddStepNumberEqualZero() {
        Instruction instruction = new Instruction(3,1, 0, "Test");
        Result<Instruction> result = service.batchUpdate(Arrays.asList(instruction));
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Step Number must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldBatchAddNegativeStepNumber() {
        Instruction instruction = new Instruction(3,1, -2, "Test");
        Result<Instruction> result = service.batchUpdate(Arrays.asList(instruction));
        assertEquals(ResultType.INVALID, result.getType());
        assertEquals("Step Number must be greater than zero.", result.getErrors().get(0));
    }

    @Test
    void shouldDeleteInstructionById() {
        when(repo.deleteInstructionById(3)).thenReturn(true);
        Result<Instruction> result = service.deleteInstructionById(3);
        assertEquals(ResultType.SUCCESS, result.getType());
    }

    @Test
    void shouldNotDeleteNonExistentInstructionById() {
        when(repo.deleteInstructionById(999)).thenReturn(false);
        Result<Instruction> result = service.deleteInstructionById(999);
        assertEquals(ResultType.NOT_FOUND, result.getType());
        assertEquals("Instruction ID: 999 was not found.", result.getErrors().get(0));
    }
}