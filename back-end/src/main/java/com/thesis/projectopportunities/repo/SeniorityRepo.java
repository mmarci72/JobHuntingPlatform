package com.thesis.projectopportunities.repo;


import com.thesis.projectopportunities.model.Seniority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeniorityRepo extends JpaRepository<Seniority, Long> {

}
