package com.bootafoga.pms.service;

import com.bootafoga.pms.model.ConfluenceDoc;
import com.bootafoga.pms.repository.ConfluenceRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ConfluenceService {
    private final ConfluenceRepository confluenceRepository;

    public ConfluenceService(ConfluenceRepository confluenceRepository) {
        this.confluenceRepository = confluenceRepository;
    }

    public Iterable<ConfluenceDoc> findAll(){
        return confluenceRepository.findAll();
    }

    public Optional<ConfluenceDoc> findById(String id){
        return confluenceRepository.findById(id);
    }

    public void remove(ConfluenceDoc doc){
        confluenceRepository.delete(doc);
    }

    public ConfluenceDoc save(ConfluenceDoc doc){
        return confluenceRepository.save(doc);
    }
}
