package com.nathan.ataovybackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.UUID;

@Entity
@Table(name = "users")
public class User {
    @Id
    private UUID id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
}
