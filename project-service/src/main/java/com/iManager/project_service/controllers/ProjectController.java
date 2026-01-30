package com.iManager.project_service.controllers;

import com.iManager.project_service.configuration.JwtHelper;
import com.iManager.project_service.dto.CreateProjectRequest;
import com.iManager.project_service.entity.Project;
import com.iManager.project_service.entity.ProjectStatus;
import com.iManager.project_service.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/projects")
public class ProjectController {

    private final ProjectService projectService;
    private final JwtHelper jwtHelper;

    @Autowired
    public ProjectController(ProjectService projectService, JwtHelper jwtHelper){
        this.projectService = projectService;
        this.jwtHelper = jwtHelper;
    }

    @PostMapping("/createProject")
    public ResponseEntity<Project> createProject(@RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody CreateProjectRequest request) {

        String token = authHeader.substring(7); // Bearer <token>
        String email = jwtHelper.extractEmail(token);

        return ResponseEntity.ok(projectService.createProject(request, email));
    }

    @GetMapping("/getProjects")
    public ResponseEntity<List<Project>> getProjects(@RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);
        String email = jwtHelper.extractEmail(token);

        return ResponseEntity.ok(
                projectService.getProjects(email)
        );
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<String> deleteProject(@PathVariable Long projectId,
                                                @RequestHeader("Authorization") String authHeader) {
        String email = jwtHelper.extractEmail(authHeader.substring(7));

        projectService.deleteProject(projectId, email);

        return ResponseEntity.ok("Project deleted successfully");
    }


    @PutMapping("/{projectId}/status")
    public ResponseEntity<Project> updateProjectStatus(
            @PathVariable Long projectId,
            @RequestParam String status,
            @RequestHeader("Authorization") String authHeader
    ) {
        String email = jwtHelper.extractEmail(authHeader.substring(7));
        ProjectStatus projectStatus = ProjectStatus.valueOf(status.toUpperCase());

        return ResponseEntity.ok(
                projectService.updateStatus(projectId, projectStatus, email)
        );
    }

}
