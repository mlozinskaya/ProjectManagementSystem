package com.bootafoga.pms.service;

import com.bootafoga.pms.model.Project;
import com.bootafoga.pms.payload.dto.ProjectDTO;
import com.bootafoga.pms.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<Project> findAll(){
        return projectRepository.findAll();
    }

    public Project findById(String id){
        return projectRepository.findById(id).orElse(null);
    }

    public void remove(Project project){
        projectRepository.delete(project);
    }

    public Project save(Project project){
        return projectRepository.save(project);
    }

    public Project mapProjectDtoToEntity(ProjectDTO dto){
        Project project = new Project();
        project.setId(dto.getId());
        project.setName(dto.getName());
        project.setKey(dto.getKey());
        return project;
    }
}
