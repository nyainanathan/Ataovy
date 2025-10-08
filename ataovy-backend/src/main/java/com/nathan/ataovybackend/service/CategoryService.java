package com.nathan.ataovybackend.service;

import com.nathan.ataovybackend.model.Category;
import com.nathan.ataovybackend.repository.CategoryRepo;
import lombok.AllArgsConstructor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class CategoryService {

    private CategoryRepo repo;

    public List<Category> getCategories(String userId) {
        return repo.getCategoriesByUserId(UUID.fromString(userId));
    }

    public Category createCategory(Category category) {
        return repo.save(category);
    }

    public void deleteCategory(String categoryId) {
        repo.deleteById(UUID.fromString(categoryId));
    }
}
