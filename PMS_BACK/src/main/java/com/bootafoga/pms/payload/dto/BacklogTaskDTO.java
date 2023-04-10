package com.bootafoga.pms.payload.dto;

import com.bootafoga.pms.model.BacklogTask;

public class BacklogTaskDTO {
    private String id;
    private String projectId;
    private String name;

    public BacklogTaskDTO() {
    }

    public BacklogTaskDTO(BacklogTask backlogTask) {
        this.id = backlogTask.getId();
        this.projectId = backlogTask.getProject().getId();
        this.name = backlogTask.getName();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
