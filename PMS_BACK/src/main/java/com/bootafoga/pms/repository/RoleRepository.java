package com.bootafoga.pms.repository;

import java.util.Optional;

import com.bootafoga.pms.model.ERole;
import com.bootafoga.pms.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole name);
}
