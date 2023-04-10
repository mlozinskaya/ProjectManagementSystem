package com.bootafoga.pms.repository;

import com.bootafoga.pms.model.BacklogTask;
import com.bootafoga.pms.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BacklogRepository extends JpaRepository<BacklogTask, String> {
    List<BacklogTask> findByName(String name);
    List<BacklogTask> findByProject(Project project);
}