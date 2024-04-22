package com.thesis.projectopportunities.service;

import com.thesis.projectopportunities.dto.PositionDto;
import com.thesis.projectopportunities.mapping.PositionMapping;
import com.thesis.projectopportunities.model.PaginatedModel;
import com.thesis.projectopportunities.model.Position;
import com.thesis.projectopportunities.repo.CompanyPermissionRepo;
import com.thesis.projectopportunities.repo.PositionRepo;
import com.thesis.projectopportunities.specification.PositionSpecification;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PositionService {

	private final PositionRepo positionRepo;

	private final PositionMapping positionMapping;
	private final UserNotificationService userNotificationService;
	private final CompanyPermissionRepo companyPermissionRepo;

	public void update(PositionDto positionDto, int id, String username) {

		var position =
			positionRepo.findById(id);

		if (position.isPresent()) {
			if (!companyPermissionRepo.existsByCompanyIdAndUsername(position.get().getCompany().getId(), username)) {
				return;
			}
			positionMapping.update(positionDto, position.get());
			positionRepo.save(position.get());

		} else {
			positionRepo.save(positionMapping.toPosition(positionDto));
		}
	}

	public Position addPosition(PositionDto position, String username) {
		if (!companyPermissionRepo.existsByCompanyIdAndUsername(position.getCompanyId(), username)) {
			return null;
		}
		position.setPostDate(LocalDateTime.now());
		var savedPosition = positionRepo.save(positionMapping.toPosition(position));
		position.setPositionId(savedPosition.getPositionId());
		userNotificationService.newNotification(positionMapping.toPosition(position));
		return savedPosition;
	}

	public PaginatedModel<PositionDto> getPaginatedPositions(String filter, int page, int size, String[] seniorities,
															 int minSalary,
															 int maxSalary) {
		try {
			PaginatedModel<PositionDto> response = new PaginatedModel<>();

			Pageable paging = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "postDate").and(Sort.by("positionName")));

			Specification<Position> spec = PositionSpecification.getFilterSpecification(filter, seniorities, minSalary,
				maxSalary);

			Page<Position> pagePositions = positionRepo.findAll(spec, paging);
			List<PositionDto> positionDTOs =
				pagePositions.getContent().stream().map(positionMapping::toPosition).toList();

			response.setEntities(positionDTOs);
			response.setCurrentPage(pagePositions.getNumber());
			response.setTotalItems(pagePositions.getTotalElements());
			response.setTotalPages(pagePositions.getTotalPages());

			return response;
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException();
		}
	}

}
