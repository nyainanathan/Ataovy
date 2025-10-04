package com.nathan.ataovybackend.service;

import com.nathan.ataovybackend.dto.LoginRequest;
import com.nathan.ataovybackend.model.User;
import com.nathan.ataovybackend.repository.UserRepo;
import com.nathan.ataovybackend.security.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthService {

    private UserRepo repo;
    private JwtUtil jwtUtil;
    private PasswordEncoder passwordEncoder;

    public String loginUser(LoginRequest loginCredentials) {
        User user = repo.findByEmail(loginCredentials.getEmail());
        if(user == null){
            return "invalid email";
        }
        if(passwordEncoder.matches(loginCredentials.getPassword(), user.getPassword())){
            String token = jwtUtil.generateToken(user.getEmail());
            return token;
        }
        return "invalid password";
    }

    public void createUser(User user) throws Exception {
        if(repo.findByEmail(user.getEmail()) == null){
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            repo.save(user);
        } else {
            throw new Exception("User already exists");
        }
    }
}
