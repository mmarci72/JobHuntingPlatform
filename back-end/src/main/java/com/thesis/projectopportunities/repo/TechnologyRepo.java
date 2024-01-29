package com.thesis.projectopportunities.repo;

import com.thesis.projectopportunities.model.Technology;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TechnologyRepo extends JpaRepository<Technology, Integer> {
}
