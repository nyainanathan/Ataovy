package com.nathan.ataovybackend.service;

import com.nathan.ataovybackend.dto.LoginRequest;
import com.nathan.ataovybackend.model.User;
import com.nathan.ataovybackend.repository.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepo repo;
    private final PasswordEncoder passwordEncoder;

    public List<User> getAllUser() {
        return repo.findAll();
    }

    public Optional<User> getUserByEmail(String email) {
        return repo.findByEmail(email);
    }

    public void createUser(User newUser) {
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        repo.save(newUser);
    }

    public boolean validateLogin(LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        return  repo.findByEmail(email)
                .map(user -> passwordEncoder.matches(password, user.getPassword()))
                .orElse(false);
    }
}
