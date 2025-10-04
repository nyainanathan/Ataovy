package com.nathan.ataovybackend.service;

import com.nathan.ataovybackend.model.Todo;
import com.nathan.ataovybackend.repository.TodoRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class TodoService {

    private TodoRepo repo;

    public List<Todo> findTodoByUserId(UUID id){
        return repo.findByUserId(id);
    }

    public void createTodo(Todo todo) {
        repo.save(todo);
    }

    public void createTodos(List<Todo> todos) {
        repo.save(todos.get(0));
        repo.saveAll(todos.subList(1, todos.size()));
    }
}
