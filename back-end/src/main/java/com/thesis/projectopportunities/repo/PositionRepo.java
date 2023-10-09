package com.thesis.projectopportunities.repo;

import com.thesis.projectopportunities.model.ProjectPosition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PositionRepo extends JpaRepository<ProjectPosition, Integer> {

}
