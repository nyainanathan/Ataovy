package com.nathan.ataovybackend.controller;

import com.nathan.ataovybackend.dto.LoginRequest;
import com.nathan.ataovybackend.model.User;
import com.nathan.ataovybackend.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.Objects;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    private ResponseEntity<?> loginUser(@RequestBody LoginRequest credentials, HttpServletResponse response) {
        String token = authService.loginUser(credentials);
        if (!Objects.equals(token, "invalid password") && !Objects.equals(token, "invalid email")) {
            ResponseCookie cookie = ResponseCookie.from("jwt", token)
                    .httpOnly(true)
                    .secure(true)
                    .path("/")
                    .maxAge(Duration.ofHours(1))
                    .sameSite("None")
                    .build();
            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
            return ResponseEntity.ok("Login successful");
        }
        return new ResponseEntity<>(token, HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/logout")
    private ResponseEntity<?> logoutUser(HttpServletResponse response) {
        ResponseCookie clear = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0)
                .sameSite("None")
                .domain("localhost")
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, clear.toString());
        return new ResponseEntity<>("Logout successful", HttpStatus.OK);
    }

    @PostMapping("/signup")
    private ResponseEntity<String> signupUser(@RequestBody User user) {
        try {
            authService.createUser(user);
            return new ResponseEntity<>("User created successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            if (Objects.equals(e.getMessage(), "User already exists")) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
            }
            return new ResponseEntity<>("Failed to create user: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}