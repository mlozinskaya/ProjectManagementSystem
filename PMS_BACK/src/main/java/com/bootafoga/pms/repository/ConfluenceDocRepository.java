package com.bootafoga.pms.repository;

import com.bootafoga.pms.model.ConfluenceDoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ConfluenceDocRepository extends JpaRepository<ConfluenceDoc, String> {
    Optional<ConfluenceDoc> findById(String id);
    Optional<ConfluenceDoc> findByName(String name);
}