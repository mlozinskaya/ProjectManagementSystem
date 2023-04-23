package com.bootafoga.pms.controller;

import com.bootafoga.pms.model.Project;
import com.bootafoga.pms.payload.dto.BacklogTaskDTO;
import com.bootafoga.pms.service.BacklogService;
import com.bootafoga.pms.service.ProjectService;
import com.bootafoga.pms.utils.TaskStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/dashboard")
public class DashboardController {
    private final BacklogService backlogService;
    private final ProjectService projectService;

    public DashboardController(BacklogService backlogService, ProjectService projectService) {
        this.backlogService = backlogService;
        this.projectService = projectService;
    }

    @GetMapping("/list/{projectId}")
    public List<BacklogTaskDTO> list(@PathVariable("projectId") String projectId) {
        Project project = projectService.findById(projectId);

        if (project != null) {
            return backlogService.findByProject(project)
                    .stream()
                    .filter(task -> task.getStatus() != TaskStatus.BACKLOG)
                    .map(BacklogTaskDTO::new)
                    .collect(Collectors.toList());
        } else {
            return Collections.emptyList();
        }
    }
}
