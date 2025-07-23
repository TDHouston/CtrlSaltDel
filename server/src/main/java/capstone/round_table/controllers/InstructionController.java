package capstone.round_table.controllers;

import capstone.round_table.domain.InstructionService;
import capstone.round_table.domain.Result;
import capstone.round_table.models.Instruction;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/instruction")
public class InstructionController {
    private final InstructionService service;

    public InstructionController(InstructionService service) {
        this.service = service;
    }

    @GetMapping("/{recipeId}")
    public List<Instruction> findAllByRecipe(@PathVariable int recipeId) {
        return service.findAllByRecipeId(recipeId);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Instruction instruction) {
        Result<Instruction> result = service.addInstruction(instruction);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PostMapping("/batch_add")
    public ResponseEntity<Object> batchAdd(@RequestBody List<Instruction> instructions) {
        Result<List<Instruction>> result = service.batchAdd(instructions);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{instructionId}")
    public ResponseEntity<Object> update(
        @PathVariable int instructionId,
        @RequestBody Instruction instruction
    ) {
        if (instructionId != instruction.getInstructionId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Instruction> result = service.updateInstruction(instruction);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/batch_update")
    public ResponseEntity<Object> batchUpdate(@RequestBody List<Instruction> instructions) {
        Result<List<Instruction>> result = service.batchUpdate(instructions);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{instructionId}")
    public ResponseEntity<Object> delete(@PathVariable int instructionId) {
        Result<Instruction> result = service.deleteInstructionById(instructionId);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }
}
