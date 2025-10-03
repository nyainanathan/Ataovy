package com.nathan.ataovybackend.controller;

import com.nathan.ataovybackend.dto.LoginRequest;
import com.nathan.ataovybackend.model.User;
import com.nathan.ataovybackend.security.JwtUtil;
import com.nathan.ataovybackend.service.AuthService;
import io.jsonwebtoken.JwtException;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/token")
    public String getToken(@RequestBody String username) {
        return jwtUtil.generateToken(username);
    }

    @GetMapping("/name")
    public String testToken(@RequestBody String token) throws JwtException, IllegalArgumentException {
        return jwtUtil.extractUsername(token);
    }

    @GetMapping("/validate")
    public boolean validateToken(@RequestBody String token) throws JwtException, IllegalArgumentException {
        return jwtUtil.validateToken(token);
    }
}
