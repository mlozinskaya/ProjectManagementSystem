package com.bootafoga.pms.service;

import com.bootafoga.pms.model.BacklogTask;
import com.bootafoga.pms.repository.BacklogRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BacklogService {
    private final BacklogRepository backlogRepository;

    public BacklogService(BacklogRepository projectRepository) {
        this.backlogRepository = projectRepository;
    }

    public Iterable<BacklogTask> findAll(){
        return backlogRepository.findAll();
    }

    public Optional<BacklogTask> findById(Long id){
        return backlogRepository.findById(id);
    }

    public void remove(BacklogTask task){
        backlogRepository.delete(task);
    }

    public BacklogTask save(BacklogTask task){
        return backlogRepository.save(task);
    }
}
