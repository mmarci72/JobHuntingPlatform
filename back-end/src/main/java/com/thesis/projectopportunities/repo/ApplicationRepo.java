package com.thesis.projectopportunities.repo;

import com.thesis.projectopportunities.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationRepo extends JpaRepository<Application, Integer> {
}
