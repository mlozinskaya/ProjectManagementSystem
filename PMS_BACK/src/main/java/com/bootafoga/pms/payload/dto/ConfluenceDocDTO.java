package com.bootafoga.pms.payload.dto;

import com.bootafoga.pms.model.ConfluenceDoc;

public class ConfluenceDocDTO {
    private String id;
    private String sectionId;
    private String userId;
    private String name;
    private String description;

    public ConfluenceDocDTO() {
    }

    public ConfluenceDocDTO(ConfluenceDoc doc){
        this.id = doc.getId();
        this.sectionId = doc.getSection().getId();
        this.userId = doc.getAuthor().getId();
        this.name = doc.getName();
        this.description = doc.getDescription();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSectionId() {
        return sectionId;
    }

    public void setSectionId(String sectionId) {
        this.sectionId = sectionId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
