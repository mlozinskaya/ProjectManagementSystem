package com.bootafoga.pms.repository;

import com.bootafoga.pms.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, String> {
    Project findByName(String name);
}