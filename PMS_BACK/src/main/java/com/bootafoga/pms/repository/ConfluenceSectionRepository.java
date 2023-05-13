package com.bootafoga.pms.repository;

import com.bootafoga.pms.model.ConfluenceDoc;
import com.bootafoga.pms.model.ConfluenceSection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ConfluenceSectionRepository extends JpaRepository<ConfluenceSection, String> {
    Optional<ConfluenceSection> findById(String id);
    Optional<ConfluenceSection> findByName(String name);
}