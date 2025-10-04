package com.nathan.ataovybackend.controller;

import com.nathan.ataovybackend.dto.LoginRequest;
import com.nathan.ataovybackend.model.User;
import com.nathan.ataovybackend.security.JwtUtil;
import com.nathan.ataovybackend.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
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
    private ResponseEntity<?> loginUser(@RequestBody LoginRequest loginCredentials, HttpServletResponse response) {
        String token = authService.loginUser(loginCredentials);
        if(!Objects.equals(token, "invalid password") && !Objects.equals(token, "invalid email")){
            Cookie cookie = new Cookie("jwt", token);
            cookie.setHttpOnly(true);       // JavaScript can't read it         // only over HTTPS
            cookie.setPath("/");            // available to the whole domain
            cookie.setMaxAge(60 * 60);      // 1 hour
            cookie.setAttribute("SameSite", "Strict"); // prevent CSRF

            response.addCookie(cookie);

            return ResponseEntity.ok("Login successful");
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
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
