package com.bootafoga.pms.controller;

import com.bootafoga.pms.model.ConfluenceDoc;
import com.bootafoga.pms.payload.dto.ConfluenceDocDTO;
import com.bootafoga.pms.payload.dto.ConfluenceSectionDTO;
import com.bootafoga.pms.payload.response.MessageResponse;
import com.bootafoga.pms.service.ConfluenceService;
import com.bootafoga.pms.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/confluence")
public class ConfluenceController {
    private final ConfluenceService confluenceService;
    private final UserService userService;

    public ConfluenceController(ConfluenceService confluenceService, UserService userService) {
        this.confluenceService = confluenceService;
        this.userService = userService;
    }

    @GetMapping("/list")
    public List<ConfluenceSectionDTO> list() {
        return confluenceService.getSections()
                .stream()
                .map(ConfluenceSectionDTO::new)
                .collect(Collectors.toList());
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
        entity.setSection(confluenceService.findSection(dto.getSectionId()));
        entity.setAuthor(userService.findById(dto.getUserId()));
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        return entity;
    }
}
