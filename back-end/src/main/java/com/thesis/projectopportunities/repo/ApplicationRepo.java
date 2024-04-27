package com.thesis.projectopportunities.repo;

import com.thesis.projectopportunities.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepo extends JpaRepository<Application, Integer> {

	List<Application> getAllByPosition_PositionId(int positionId);

	Boolean existsByPosition_PositionIdAndUsername(int positionId, String username);
}
