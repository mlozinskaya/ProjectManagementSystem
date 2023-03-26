package com.bootafoga.pms.controller;

import com.bootafoga.pms.model.Project;
import com.bootafoga.pms.payload.dto.ProjectDTO;
import com.bootafoga.pms.payload.response.MessageResponse;
import com.bootafoga.pms.service.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/project")
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("/list")
    public List<Project> list() {
        return (List<Project>) projectService.findAll();
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody ProjectDTO projectDTO) {
        Project newProject = mapProjectDtoToEntity(projectDTO);
        projectService.save(newProject);

        return ResponseEntity.ok(new MessageResponse("Project saved successfully!"));
    }

    @PostMapping("/remove")
    public ResponseEntity<?> remove(@RequestBody ProjectDTO projectDTO) {
        Project project = projectService.findById(projectDTO.getId()).orElse(null);

        if (project != null){
            projectService.remove(project);
        }

        return ResponseEntity.ok(new MessageResponse("Project removed successfully!"));
    }

    private Project mapProjectDtoToEntity(ProjectDTO dto){
        Project project = new Project();
        project.setId(dto.getId());
        project.setName(dto.getName());
        project.setKey(dto.getKey());
        return project;
    }
}
