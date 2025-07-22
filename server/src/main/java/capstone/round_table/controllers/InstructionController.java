package capstone.round_table.controllers;

import capstone.round_table.models.Instruction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/instruction")
public class InstructionController {

    @GetMapping("/{recipeId}")
    public List<Instruction> findAllByRecipe(@PathVariable int recipeId) {
        return null;
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Instruction instruction) {
        return null;
    }

    @PostMapping("/batch")
    public ResponseEntity<Object> batchAdd(@RequestBody List<Instruction> instructions) {
        return null;
    }

    @PutMapping("/{instructionId}")
    public ResponseEntity<Object> update(@PathVariable int instructionId, @RequestBody Instruction instruction) {
        return null;
    }

    @DeleteMapping("/{instructionId}")
    public ResponseEntity<Object> delete(@PathVariable int instructionId) {
        return null;
    }


}
