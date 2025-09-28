package com.nathan.ataovybackend.service;

import com.nathan.ataovybackend.model.User;
import com.nathan.ataovybackend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepo repo;
    public List<User> getAllUser() {
        return repo.findAll();
    }
}
