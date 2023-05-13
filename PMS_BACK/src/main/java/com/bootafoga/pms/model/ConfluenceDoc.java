package com.bootafoga.pms.model;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "confluence_doc")
public class ConfluenceDoc {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "id", unique = true)
    private String id;

    @ManyToOne(optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "section_id")
    private ConfluenceSection section;

    @Nullable
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User author;

    private String creationDate;

    @NotBlank
    @Size(max = 200)
    private String name;

    private String description;


    public ConfluenceDoc(){
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public ConfluenceSection getSection() {
        return section;
    }

    public void setSection(ConfluenceSection section) {
        this.section = section;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public String getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(String creationDate) {
        this.creationDate = creationDate;
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
