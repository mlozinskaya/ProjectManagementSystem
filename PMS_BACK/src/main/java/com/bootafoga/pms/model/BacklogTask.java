package com.bootafoga.pms.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.GenericGenerator;

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

    @NotBlank
    @Size(max = 20)
    private String name;

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
