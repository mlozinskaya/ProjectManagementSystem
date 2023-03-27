package com.bootafoga.pms.repository;

import com.bootafoga.pms.model.BacklogTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BacklogRepository extends JpaRepository<BacklogTask, Long> {
    Optional<BacklogTask> findByName(String name);
}