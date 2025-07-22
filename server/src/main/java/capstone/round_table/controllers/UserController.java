package capstone.round_table.controllers;

import capstone.round_table.models.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/user")
public class UserController {

    // TODO: add reference to service and create controller

    @GetMapping
    public List<User> findAll() {
        return null;
    }

    @GetMapping("/{userEmail}")
    public User findByEmail(@PathVariable String userEmail) {
        return null;
    }

    @PutMapping("/{userId}")
    public ResponseEntity<Object> update(@PathVariable int userId, @RequestBody User user) {
        return null;
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteById(@PathVariable int userId) {
        return null;
    }

}
