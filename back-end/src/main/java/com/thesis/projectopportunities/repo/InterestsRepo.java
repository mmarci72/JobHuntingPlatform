package com.thesis.projectopportunities.repo;

import java.util.Set;

import com.thesis.projectopportunities.model.Interests;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InterestsRepo extends JpaRepository<Interests, Integer> {

	Set<Interests> findAllByUsername(String username);
}
