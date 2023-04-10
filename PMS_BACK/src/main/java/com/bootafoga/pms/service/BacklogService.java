package com.bootafoga.pms.service;

import com.bootafoga.pms.model.BacklogTask;
import com.bootafoga.pms.model.Project;
import com.bootafoga.pms.repository.BacklogRepository;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class BacklogService {
    private final BacklogRepository backlogRepository;

    public BacklogService(BacklogRepository projectRepository) {
        this.backlogRepository = projectRepository;
    }

    public List<BacklogTask> findAll(){
        return backlogRepository.findAll();
    }

    public List<BacklogTask> findByProject(Project project) {
        return backlogRepository.findByProject(project);
    }

    public Optional<BacklogTask> findById(String id){
        return backlogRepository.findById(id);
    }

    public void remove(BacklogTask task){
        backlogRepository.delete(task);
    }

    public BacklogTask save(BacklogTask task){
        return backlogRepository.save(task);
    }


}
