package com.nathan.ataovybackend.service;

import com.nathan.ataovybackend.model.User;
import com.nathan.ataovybackend.repository.UserRepo;
import com.nathan.ataovybackend.security.JwtUtil;
import io.jsonwebtoken.Jwt;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepo repo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public List<User> getAllUser() {
        return repo.findAll();
    }

    public User getUserByEmail(String email) {
        User user = repo.findByEmail(email);
        if(user == null){
            throw new EntityNotFoundException("User not found");
        }
        return user;
    }

    public void createUser(User newUser) {
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        repo.save(newUser);
    }

    public UUID getUserIdbyEmail(String email) {
        User user = repo.findByEmail(email);
        if(user != null){
            return user.getId();
        }
        return null;
    }

    public UUID getCurrentUserId(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if(cookies != null){
            for (Cookie cookie : cookies) {
                if(cookie.getName().equals("jwt")){
                    String userEmail = jwtUtil.extractUsername(cookie.getValue());
                    return this.getUserIdbyEmail(userEmail);
                }
            }
        }
        return null;
    }
}
