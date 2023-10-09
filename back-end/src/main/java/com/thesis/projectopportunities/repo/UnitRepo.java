package com.thesis.projectopportunities.repo;

import com.thesis.projectopportunities.model.Unit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UnitRepo extends JpaRepository<Unit, String> {

}
