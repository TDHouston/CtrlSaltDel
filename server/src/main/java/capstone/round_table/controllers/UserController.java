package capstone.round_table.controllers;

import capstone.round_table.domain.Result;
import capstone.round_table.domain.UserService;
import capstone.round_table.models.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/user")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping
    public List<User> findAll() {
        return service.findAll();
    }

//    @GetMapping("/{userEmail}")
//    public User findByEmail(@PathVariable String userEmail) {
//        return service.findByEmail(userEmail);
//    }
//
//    @GetMapping("/{userEmail}")
//    public User findByUsername(@PathVariable String username) {
//        return service.findByUsername(username);
//    }

    @GetMapping("/hi")
    public String hi(){
        return "hi";
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody User user) {
        Result<User> result = service.addUser(user);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
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
