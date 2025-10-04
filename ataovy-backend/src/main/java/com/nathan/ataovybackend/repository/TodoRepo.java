package com.nathan.ataovybackend.repository;

import com.nathan.ataovybackend.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TodoRepo extends JpaRepository<Todo, UUID> {
    List<Todo> findByUserId(UUID id);
}
