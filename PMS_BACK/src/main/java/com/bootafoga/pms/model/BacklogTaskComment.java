package com.bootafoga.pms.model;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "backlog_task_comment")
public class BacklogTaskComment {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "id", unique = true)
    private String id;

    @ManyToOne(optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "task_id")
    private BacklogTask task;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user_id;

    private String comment;

    public BacklogTaskComment() {

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public BacklogTask getTask() {
        return task;
    }

    public void setTask(BacklogTask task) {
        this.task = task;
    }

    public User getUser_id() {
        return user_id;
    }

    public void setUser_id(User user_id) {
        this.user_id = user_id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
