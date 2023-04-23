package com.bootafoga.pms.payload.dto;

import com.bootafoga.pms.model.BacklogTask;
import com.bootafoga.pms.utils.TaskStatus;
import com.bootafoga.pms.utils.TaskType;

import java.util.List;
import java.util.stream.Collectors;

public class BacklogTaskDTO {
    private String id;
    private String projectId;
    private TaskType type;
    private TaskStatus status;
    private String name;
    private String summary;
    private String description;
    private String userId;
    private List<BacklogTaskCommentDTO> comments;

    public BacklogTaskDTO() {
    }

    public BacklogTaskDTO(BacklogTask backlogTask) {
        this.id = backlogTask.getId();
        this.projectId = backlogTask.getProject().getId();
        this.type = backlogTask.getType();
        this.status = backlogTask.getStatus();
        this.name = backlogTask.getName();
        this.summary = backlogTask.getSummary();
        this.description = backlogTask.getDescription();

        if (backlogTask.getAssignTo() != null) {
            this.userId = backlogTask.getAssignTo().getId();
        }

        if (backlogTask.getComments() != null) {
            comments = backlogTask.getComments().stream()
                    .map(BacklogTaskCommentDTO::new).collect(Collectors.toList());
        }
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

    public TaskType getType() {
        return type;
    }

    public void setType(TaskType type) {
        this.type = type;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<BacklogTaskCommentDTO> getComments() {
        return comments;
    }

    public void setComments(List<BacklogTaskCommentDTO> comments) {
        this.comments = comments;
    }
}
