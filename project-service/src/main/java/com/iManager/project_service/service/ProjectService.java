package com.iManager.project_service.service;

import com.iManager.project_service.dto.CreateProjectRequest;
import com.iManager.project_service.entity.Project;
import com.iManager.project_service.entity.ProjectStatus;
import com.iManager.project_service.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    @Autowired
    public ProjectService(ProjectRepository projectRepository){
        this.projectRepository = projectRepository;
    }
    public Project createProject(CreateProjectRequest request, String ownerEmail) {

        Project project = new Project();
        project.setName(request.getName());
        project.setStatus(ProjectStatus.ACTIVE);
        project.setOwnerEmail(ownerEmail);

        return projectRepository.save(project);
    }

    public List<Project> getProjects(String ownerEmail) {
        return projectRepository.findByOwnerEmail(ownerEmail);
    }

    public Project updateStatus(Long projectId, ProjectStatus status, String ownerEmail) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        if (!project.getOwnerEmail().equals(ownerEmail)) {
            throw new RuntimeException("Unauthorized access");
        }

        project.setStatus(status);
        return projectRepository.save(project);
    }

    public void deleteProject(Long projectId, String ownerEmail) {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        if (!project.getOwnerEmail().equals(ownerEmail)) {
            throw new RuntimeException("Unauthorized access");
        }

        projectRepository.delete(project);
    }


}
