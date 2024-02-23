package com.thesis.projectopportunities.service;

import com.thesis.projectopportunities.dto.PositionDto;
import com.thesis.projectopportunities.mapping.PositionMapping;
import com.thesis.projectopportunities.repo.PositionRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PositionService {

	private final PositionRepo positionRepo;

	private final PositionMapping positionMapping;

	public void update(PositionDto positionDto, int id) {
		var position =
			positionRepo.findById(id);

		if (position.isPresent()) {
			positionMapping.update(positionDto, position.get());
			positionRepo.save(position.get());

		} else {
			positionRepo.save(positionMapping.toPosition(positionDto));
		}
	}
}
