package com.bootafoga.pms.model;

import com.bootafoga.pms.utils.TaskStatus;
import com.bootafoga.pms.utils.TaskType;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.GenericGenerator;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "backlog_task")
public class BacklogTask {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "id", unique = true)
    private String id;

    @ManyToOne(optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "project_id")
    private Project project;

    @NotNull
    private TaskType type;

    @NotNull
    private TaskStatus status;

    @NotBlank
    @Size(max = 20)
    private String name;

    @Size(max = 100)
    private String summary;

    private String description;

    @Nullable
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User assignTo;

    @OneToMany(mappedBy="task")
    private List<BacklogTaskComment> comments = new ArrayList<>();

    public BacklogTask() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
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

    public User getAssignTo() {
        return assignTo;
    }

    public void setAssignTo(User assignTo) {
        this.assignTo = assignTo;
    }

    public List<BacklogTaskComment> getComments() {
        return comments;
    }

    public void setComments(List<BacklogTaskComment> comments) {
        this.comments = comments;
    }
}
