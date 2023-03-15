package com.bootafoga.pms.service;

import com.bootafoga.pms.model.Project;
import com.bootafoga.pms.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public Iterable<Project> findAll(){
        return projectRepository.findAll();
    }

    public Optional<Project> findById(Long id){
        return projectRepository.findById(id);
    }

    public void remove(Project project){
        projectRepository.delete(project);
    }

    public Project save(Project project){
        return projectRepository.save(project);
    }
}
