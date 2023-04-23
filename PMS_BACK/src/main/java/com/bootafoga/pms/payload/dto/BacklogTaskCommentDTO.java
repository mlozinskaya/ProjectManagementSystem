package com.bootafoga.pms.payload.dto;

import com.bootafoga.pms.model.BacklogTaskComment;

public class BacklogTaskCommentDTO {
    private String comment;

    public BacklogTaskCommentDTO() {

    }

    public BacklogTaskCommentDTO(BacklogTaskComment taskComment){
        this.comment = taskComment.getComment();
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
