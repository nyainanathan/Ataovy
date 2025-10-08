package com.nathan.ataovybackend.repository;

import com.nathan.ataovybackend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CategoryRepo extends JpaRepository<Category, UUID> {
    List<Category> getCategoriesByUserId(UUID userId);
}
