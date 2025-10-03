package com.nathan.ataovybackend.service;

import com.nathan.ataovybackend.dto.LoginRequest;
import com.nathan.ataovybackend.model.User;
import com.nathan.ataovybackend.repository.UserRepo;
import jakarta.persistence.EntityNotFoundException;
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

}
