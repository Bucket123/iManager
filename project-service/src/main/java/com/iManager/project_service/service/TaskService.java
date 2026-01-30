package com.iManager.project_service.service;

import com.iManager.project_service.dto.CreateTaskRequest;
import com.iManager.project_service.entity.Project;
import com.iManager.project_service.entity.Task;
import com.iManager.project_service.entity.TaskStatus;
import com.iManager.project_service.repository.ProjectRepository;
import com.iManager.project_service.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository, ProjectRepository projectRepository){
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
    }

    public Task createTask(Long projectId, CreateTaskRequest request) {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

//        Task task = Task.builder()
//                .title(request.getTitle())
//                .status(TaskStatus.TODO)
//                .project(project)
//                .build();

        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setStatus(TaskStatus.DONE);
        task.setProject(project);
        return taskRepository.save(task);
    }

    public List<Task> getTasks(Long projectId, String ownerEmail) {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        if (!project.getOwnerEmail().equals(ownerEmail)) {
            throw new RuntimeException("Unauthorized access");
        }

        return taskRepository.findByProjectId(projectId);
    }


    public Task updateStatus(Long taskId, TaskStatus status, String ownerEmail) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        Project project = task.getProject();

        if (!project.getOwnerEmail().equals(ownerEmail)) {
            throw new RuntimeException("Unauthorized access");
        }

        task.setStatus(status);
        return taskRepository.save(task);
    }

    public void deleteTask(Long taskId, String ownerEmail) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getProject().getOwnerEmail().equals(ownerEmail)) {
            throw new RuntimeException("Unauthorized access");
        }

        taskRepository.delete(task);
    }


    public Task createTask(Long projectId, CreateTaskRequest request, String ownerEmail) {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        if (!project.getOwnerEmail().equals(ownerEmail)) {
            throw new RuntimeException("Unauthorized access");
        }

//        Task task1 = Task1.builder()
//                .title(request.getTitle())
//                .status(TaskStatus.TODO)
//                .project(project)
//                .build();

        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setStatus(TaskStatus.TODO);
        task.setProject(project);

        return taskRepository.save(task);
    }

}
