package com.thesis.projectopportunities.service;

import com.thesis.projectopportunities.dto.ProjectPositionDto;
import com.thesis.projectopportunities.mapping.ProjectPositionMapper;
import com.thesis.projectopportunities.repo.PositionRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PositionService {

	private final PositionRepo positionRepo;

	private final ProjectPositionMapper positionMapper;

	public void update(ProjectPositionDto positionDto, int id) {
		var position =
			positionRepo.findById(id);

		if (position.isPresent()) {
			positionMapper.update(positionDto, position.get());
			positionRepo.save(position.get());

		}
		else {
			positionRepo.save(positionMapper.toProjectPosition(positionDto));
		}
	}
}
