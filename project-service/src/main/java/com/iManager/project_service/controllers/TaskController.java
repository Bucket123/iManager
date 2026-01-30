package com.iManager.project_service.controllers;

import com.iManager.project_service.configuration.JwtHelper;
import com.iManager.project_service.dto.CreateTaskRequest;
import com.iManager.project_service.entity.Task;
import com.iManager.project_service.entity.TaskStatus;
import com.iManager.project_service.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/projects/{projectId}/tasks")
public class TaskController {

    private final TaskService taskService;
    private final JwtHelper jwtHelper;
    @Autowired()
    public TaskController(TaskService taskService, JwtHelper jwtHelper){
        this.taskService = taskService;
        this.jwtHelper = jwtHelper;
    }

    @PostMapping("/createTask")
    public ResponseEntity<Task> createTask(@PathVariable Long projectId,
                                           @RequestHeader("Authorization") String authHeader,
                                           @Valid @RequestBody CreateTaskRequest request) {

        String email = jwtHelper.extractEmail(authHeader.substring(7));

        return ResponseEntity.ok(taskService.createTask(projectId, request, email));
    }

    @GetMapping("/getTask")
    public ResponseEntity<List<Task>> getTasks(@PathVariable Long projectId,
                                               @RequestHeader("Authorization") String authHeader) {

        String email = jwtHelper.extractEmail(authHeader.substring(7));

        return ResponseEntity.ok(taskService.getTasks(projectId, email));
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<String> deleteTask(@PathVariable Long projectId,
                                             @PathVariable Long taskId,
                                             @RequestHeader("Authorization") String authHeader) {
        String email = jwtHelper.extractEmail(authHeader.substring(7));

        taskService.deleteTask(taskId, email);

        return ResponseEntity.ok("Task deleted successfully");
    }


    @PutMapping("/{taskId}/status")
    public ResponseEntity<Task> updateStatus(@PathVariable Long projectId,
                                             @PathVariable Long taskId,
                                             @RequestParam String status,
                                             @RequestHeader("Authorization") String authHeader) {

        String email = jwtHelper.extractEmail(authHeader.substring(7));
        TaskStatus taskStatus = TaskStatus.valueOf(status.toUpperCase());

        return ResponseEntity.ok(taskService.updateStatus(taskId, taskStatus, email));
    }

}
