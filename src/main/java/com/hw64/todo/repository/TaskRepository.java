package com.hw64.todo.repository;

import com.hw64.todo.model.Task;
import org.springframework.data.repository.CrudRepository;

public interface TaskRepository  extends CrudRepository<Task,String> {
    Task findTaskById(String id);
}
