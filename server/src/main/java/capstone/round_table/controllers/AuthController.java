//package capstone.round_table.controllers;
//
//import capstone.round_table.controllers.dto.UserWithToken;
//import capstone.round_table.domain.Result;
//import capstone.round_table.domain.UserService;
//import capstone.round_table.models.Role;
//import capstone.round_table.models.User;
//import capstone.round_table.security.jwt.JwtConverter;
//import org.springframework.dao.DuplicateKeyException;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/auth")
//public class AuthController {
//
//    private final AuthenticationManager authenticationManager;
//    private final JwtConverter converter;
//    private final UserService service;
//
//    public AuthController(AuthenticationManager authenticationManager, JwtConverter converter, UserService service) {
//        this.authenticationManager = authenticationManager;
//        this.converter = converter;
//        this.service = service;
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<?> loginAccount(@RequestBody Map<String, String> credentials) {
//        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(credentials.get("email"), credentials.get("password"));
//        try {
//            Authentication authentication = authenticationManager.authenticate(authToken);
//
//            if (authentication.isAuthenticated()) {
//                String jwtToken = converter.getTokenFromUser((User) authentication.getPrincipal());
//
//                HashMap<String, String> map = new HashMap<>();
//                map.put("token", jwtToken);
//
//                return new ResponseEntity<>(map, HttpStatus.OK);
//            }
//
//        } catch (AuthenticationException ex) {
//            System.out.println(ex);
//        }
//        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
//    }
//
//    @PostMapping("/register")
//    public ResponseEntity<?> createAccount(@RequestBody User user) {
//
//        Result<User> userResult = service.addUser(user);
//
//        if (!userResult.isSuccess()) {
//            return ErrorResponse.build(userResult);
//        }
//
//        String token = converter.getTokenFromUser(user);
//        UserWithToken userWithToken = new UserWithToken(user, token);
//        userWithToken.setUserInfoToDTO();
//        return new ResponseEntity<>(userWithToken, HttpStatus.CREATED);
//    }
//}
