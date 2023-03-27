package com.bootafoga.pms.controller;

import com.bootafoga.pms.model.BacklogTask;
import com.bootafoga.pms.service.BacklogService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/backlog")
public class BacklogController {
    private final BacklogService backlogService;

    public BacklogController(BacklogService backlogService) {
        this.backlogService = backlogService;
    }

    @GetMapping("/list")
    public List<BacklogTask> list() {
        return (List<BacklogTask>) backlogService.findAll();
    }
}
