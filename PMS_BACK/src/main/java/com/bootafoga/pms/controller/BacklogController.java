package com.bootafoga.pms.controller;

import com.bootafoga.pms.model.BacklogTask;
import com.bootafoga.pms.model.Project;
import com.bootafoga.pms.payload.dto.BacklogTaskDTO;
import com.bootafoga.pms.payload.response.MessageResponse;
import com.bootafoga.pms.service.BacklogService;
import com.bootafoga.pms.service.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/backlog")
public class BacklogController {
    private final BacklogService backlogService;
    private final ProjectService projectService;

    public BacklogController(BacklogService backlogService, ProjectService projectService) {
        this.backlogService = backlogService;
        this.projectService = projectService;
    }

    @GetMapping("/list/{projectId}")
    public List<BacklogTaskDTO> list(@PathVariable("projectId") String projectId) {
        Project project = projectService.findById(projectId);

        if (project != null) {
            return backlogService.findByProject(project)
                    .stream()
                    .map(BacklogTaskDTO::new)
                    .collect(Collectors.toList());
        } else {
            return Collections.emptyList();
        }
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody BacklogTaskDTO backlogTask) {
        BacklogTask entity = mapTaskDtoToEntity(backlogTask);
        backlogService.save(entity);
        return ResponseEntity.ok(new MessageResponse("Backlog task saved successfully!"));
    }

    private BacklogTask mapTaskDtoToEntity(BacklogTaskDTO dto) {
        Project project = projectService.findById(dto.getProjectId());

        if (project == null) {
            throw new RuntimeException("Не найден проект, для которого создается задача");
        }

        BacklogTask entity = new BacklogTask();
        entity.setId(dto.getId());
        entity.setProject(project);
        entity.setType(dto.getType());
        entity.setStatus(dto.getStatus());
        entity.setName(dto.getName());
        entity.setSummary(dto.getSummary());
        entity.setDescription(dto.getDescription());
        return entity;
    }
}
