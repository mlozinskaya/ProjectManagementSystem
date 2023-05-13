package com.bootafoga.pms.payload.dto;

import com.bootafoga.pms.model.ConfluenceSection;

import java.util.List;
import java.util.stream.Collectors;

public class ConfluenceSectionDTO {
    private String id;
    private String name;
    private List<ConfluenceDocDTO> docs;

    public ConfluenceSectionDTO() {
    }

    public ConfluenceSectionDTO(ConfluenceSection section) {
        this.id = section.getId();
        this.name = section.getName();

        if (section.getDocs() != null) {
            docs = section.getDocs().stream()
                    .map(ConfluenceDocDTO::new).collect(Collectors.toList());
        }
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<ConfluenceDocDTO> getDocs() {
        return docs;
    }

    public void setDocs(List<ConfluenceDocDTO> docs) {
        this.docs = docs;
    }
}
