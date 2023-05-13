package com.bootafoga.pms.service;

import com.bootafoga.pms.model.ConfluenceDoc;
import com.bootafoga.pms.model.ConfluenceSection;
import com.bootafoga.pms.repository.ConfluenceDocRepository;
import com.bootafoga.pms.repository.ConfluenceSectionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConfluenceService {
    private final ConfluenceSectionRepository confluenceSectionRepository;
    private final ConfluenceDocRepository confluenceDocRepository;

    public ConfluenceService(ConfluenceSectionRepository confluenceSectionRepository,
                             ConfluenceDocRepository confluenceDocRepository) {
        this.confluenceSectionRepository = confluenceSectionRepository;
        this.confluenceDocRepository = confluenceDocRepository;
    }

    public List<ConfluenceSection> getSections() {
        return confluenceSectionRepository.findAll();
    }

    public ConfluenceSection findSection(String id) {
        return confluenceSectionRepository.findById(id).orElse(null);
    }

    public List<ConfluenceDoc> findAll(){
        return confluenceDocRepository.findAll();
    }

    public Optional<ConfluenceDoc> findById(String id){
        return confluenceDocRepository.findById(id);
    }

    public void remove(ConfluenceDoc doc){
        confluenceDocRepository.delete(doc);
    }

    public ConfluenceDoc save(ConfluenceDoc doc){
        return confluenceDocRepository.save(doc);
    }


}
