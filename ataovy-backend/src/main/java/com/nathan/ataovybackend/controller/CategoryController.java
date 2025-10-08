package com.nathan.ataovybackend.controller;

import com.nathan.ataovybackend.model.Category;
import com.nathan.ataovybackend.service.CategoryService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class CategoryController {

    private final CategoryService service;

    @GetMapping("/")
    private List<Category> getCategories(@RequestParam String userId) {
        return service.getCategories(userId);
    }
}
