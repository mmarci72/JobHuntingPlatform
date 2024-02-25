package com.thesis.projectopportunities.repo;

import com.thesis.projectopportunities.model.Position;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PositionRepo extends JpaRepository<Position, Integer> {
	Page<Position> findByCompanyNameContainingIgnoreCaseOrPositionNameContainingIgnoreCase(String company, String positionName,
																						   Pageable pageable);
}
