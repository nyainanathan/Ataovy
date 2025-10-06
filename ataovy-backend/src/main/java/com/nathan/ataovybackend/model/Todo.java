package com.nathan.ataovybackend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.UUID;


@Entity
@Table(name="todo")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Todo {


    enum ToDoStatus{
        DONE, IN_PROGRESS, NOT_STARTED
    }

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name="UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id",updatable = false, nullable = false,columnDefinition = "UUID")
    private UUID id;

    @Column(name="description")
    private String description;

    @Column(name="deadline")
    private LocalDateTime deadline;

    @Column(name="is_recurring")
    private Boolean isRecurring;

    @Enumerated(EnumType.STRING)
    @Column(name="status")
    private ToDoStatus status;

    @Column(name="user_id")
    private UUID userId;

    @Column(name="main_todo")
    private UUID mainTodoId;

    @Column(name = "category_id")
    private UUID categoryId;
}
