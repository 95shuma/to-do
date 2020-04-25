package com.hw64.todo.controller;

import com.hw64.todo.model.Task;
import com.hw64.todo.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TaskRestController {

    @Autowired
    TaskRepository tr;

    @GetMapping("/task/all")
    public List<Task> findAll(){
        return (List<Task>) tr.findAll();
    }

    @PostMapping("/task")
    public Task addTask(@RequestParam("task") String task){
        Task task1 = new Task(task);
        tr.save(task1);
        System.out.println(task1);
        return task1;
    }

    @PostMapping("/task/status")
    public Task changeStatus(@RequestParam("id") String id){
        Task task = tr.findTaskById(id);
        if (task.getStatus()){
            task.setStatus(false);
        } else {
            task.setStatus(true);
        }
        System.out.println("Status changed");
        tr.save(task);
        return task;
    }
}
