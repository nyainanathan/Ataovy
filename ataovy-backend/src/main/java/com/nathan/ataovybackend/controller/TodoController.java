package com.nathan.ataovybackend.controller;

import com.nathan.ataovybackend.model.Todo;
import com.nathan.ataovybackend.service.TodoService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/todo")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class TodoController {

    private TodoService service;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getTodoByUserId(@PathVariable UUID userId) {
        return ResponseEntity.ok(service.findTodoByUserId(userId));
    }

    @PostMapping("/create-single")
    public ResponseEntity<?> createOneTodo(@RequestBody Todo todo){
        try{
            service.createTodo(todo);
            return new ResponseEntity<>("Todo created succesfully", HttpStatus.CREATED);
        } catch(Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/create-multiple")
    public ResponseEntity<?> createMultipleTodos(@RequestBody List<Todo> todo){
        try{
            service.createTodos(todo);
            return new ResponseEntity<>("To do created succesfully", HttpStatus.CREATED);
        } catch (Exception ex){
            return new  ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
     }


}
