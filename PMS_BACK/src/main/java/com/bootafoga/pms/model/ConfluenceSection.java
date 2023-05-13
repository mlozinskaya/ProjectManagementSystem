package com.bootafoga.pms.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.GenericGenerator;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "confluence_section")
public class ConfluenceSection {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "id", unique = true)
    private String id;

    @NotBlank
    @Size(max = 100)
    private String name;

    @JsonBackReference
    @OneToMany(mappedBy="section")
    private List<ConfluenceDoc> docs = new ArrayList<>();

    public ConfluenceSection() {

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

    public List<ConfluenceDoc> getDocs() {
        return docs;
    }

    public void setDocs(List<ConfluenceDoc> docs) {
        this.docs = docs;
    }
}
