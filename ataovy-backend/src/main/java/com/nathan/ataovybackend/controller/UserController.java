package com.nathan.ataovybackend.controller;

import com.nathan.ataovybackend.model.User;
import com.nathan.ataovybackend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UserController {

    private UserService service;

    @GetMapping("/")
    public List<User> getAllUser() {
        return service.getAllUser();
    }

    @PostMapping("/")
    public ResponseEntity<?> createUser(@RequestBody User newUser){
        try {
            Optional<User> existingUser = service.getUserByEmail(newUser.getEmail());
            if (existingUser.isPresent()) {
                return ResponseEntity.badRequest().body("User with this email already exists");
            }
            service.createUser(newUser);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Failed to create user: " + e.getMessage());
        }
    }

    @GetMapping("/{email}")
    public Optional<User> getUserByEmail(@PathVariable String email) {
        return service.getUserByEmail(email);
    }
}
