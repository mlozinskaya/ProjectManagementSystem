package com.bootafoga.pms.controller;

import com.bootafoga.pms.model.ConfluenceDoc;
import com.bootafoga.pms.payload.dto.ConfluenceDocDTO;
import com.bootafoga.pms.payload.response.MessageResponse;
import com.bootafoga.pms.service.ConfluenceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/confluence")
public class ConfluenceController {
    private final ConfluenceService confluenceService;

    public ConfluenceController(ConfluenceService confluenceService) {
        this.confluenceService = confluenceService;
    }

    @GetMapping("/list")
    public List<ConfluenceDoc> list() {
        return (List<ConfluenceDoc>) confluenceService.findAll();
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody ConfluenceDocDTO doc) {
        ConfluenceDoc entity = mapTaskDtoToEntity(doc);
        confluenceService.save(entity);

        return ResponseEntity.ok(new MessageResponse("Confluence document saved successfully!"));
    }

    @PostMapping("/remove")
    public ResponseEntity<?> remove(@RequestBody  ConfluenceDocDTO docDTO) {
        ConfluenceDoc doc = confluenceService.findById(docDTO.getId()).orElse(null);

        if (doc != null){
            confluenceService.remove(doc);
        }

        return ResponseEntity.ok(new MessageResponse("Confluence document removed successfully!"));
    }

    private ConfluenceDoc mapTaskDtoToEntity(ConfluenceDocDTO dto) {
        ConfluenceDoc entity = new ConfluenceDoc();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        return entity;
    }
}
