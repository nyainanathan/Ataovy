package com.nathan.ataovybackend.controller;

import com.nathan.ataovybackend.dto.LoginRequest;
import com.nathan.ataovybackend.model.User;
import com.nathan.ataovybackend.security.JwtUtil;
import com.nathan.ataovybackend.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

    private JwtUtil jwtUtil;
    private AuthService authService;

    @PostMapping("/login")
    private String loginUser(@RequestBody LoginRequest loginCredentials) {
        return authService.loginUser(loginCredentials);
    }

    @PostMapping("/signup")
    private ResponseEntity<String> signupUser(@RequestBody User user) {
        try{
            authService.createUser(user);
            return new ResponseEntity<>("User created successfully", HttpStatus.CREATED);
        }
        catch (Exception e){
            if(Objects.equals(e.getMessage(), "User already exists")) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
            }
            return new ResponseEntity<>("Failed to create user: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
