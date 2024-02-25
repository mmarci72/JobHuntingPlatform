package com.thesis.projectopportunities.service;

import com.thesis.projectopportunities.dto.PositionDto;
import com.thesis.projectopportunities.mapping.PositionMapping;
import com.thesis.projectopportunities.model.PaginatedModel;
import com.thesis.projectopportunities.repo.PositionRepo;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
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

	public PaginatedModel<PositionDto> getPaginatedPositions(String filter, int page, int size) {
		try {
			PaginatedModel<PositionDto> response = new PaginatedModel<>();

			Pageable paging = PageRequest.of(page, size, Sort.by("postDate").and(Sort.by("positionName")));

			var allPositions = filter == null ? positionRepo.findAll(paging) :
				positionRepo.findByCompanyNameContainingIgnoreCaseOrPositionNameContainingIgnoreCase(filter, filter, paging);

			Page<PositionDto> pageTuts =
				new PageImpl<>(allPositions.stream().map(positionMapping::toPosition).toList(), paging,
					allPositions.getTotalElements());

			response.setEntities(pageTuts.getContent());
			response.setCurrentPage(pageTuts.getNumber());
			response.setTotalItems(pageTuts.getTotalElements());
			response.setTotalPages(pageTuts.getTotalPages());

			return response;
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException();
		}
	}
}
