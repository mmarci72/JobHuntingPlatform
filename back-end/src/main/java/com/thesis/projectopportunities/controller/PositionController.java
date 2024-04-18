package com.thesis.projectopportunities.controller;

import com.thesis.projectopportunities.dto.PositionDto;
import com.thesis.projectopportunities.mapping.PositionMapping;
import com.thesis.projectopportunities.model.PaginatedModel;
import com.thesis.projectopportunities.model.Position;
import com.thesis.projectopportunities.repo.PositionRepo;
import com.thesis.projectopportunities.service.PositionService;
import com.thesis.projectopportunities.service.UserNotificationService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost")
public class PositionController {

	private final PositionRepo positionRepo;

	private final PositionService positionService;

	private final UserNotificationService userNotificationService;

	private final PositionMapping positionMapping;

	@PostMapping("/positions")
	public ResponseEntity<Position> addPosition(@RequestBody PositionDto position) {
		var savedPosition = positionRepo.save(positionMapping.toPosition(position));
		var responseEntity = new ResponseEntity<>(savedPosition, HttpStatus.CREATED);
		position.setPositionId(savedPosition.getPositionId());
		userNotificationService.newNotification(positionMapping.toPosition(position));
		return responseEntity;
	}

	@GetMapping("/positions/{id}")
	public ResponseEntity<PositionDto> getPositionById(@PathVariable int id) {
		try {
			return ResponseEntity.ok(positionMapping.toPosition(positionRepo.getReferenceById(id)));
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException();
		}
	}

	@GetMapping("/positions/company/{companyId}")
	public ResponseEntity<List<PositionDto>> getPositionById(@PathVariable Long companyId) {
		try {
			List<Position> positions = positionRepo.getPositionsByCompany_Id(companyId);
			return ResponseEntity.ok(positions.stream().map(positionMapping::toPosition).toList());
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException();
		}
	}

	@GetMapping("/positions")
	public ResponseEntity<PaginatedModel<PositionDto>> getPositions(@RequestParam(required = false) String filter,
																	@RequestParam(defaultValue = "0") int page,
																	@RequestParam(defaultValue = "10") int size,
																	@RequestParam(required = false) String[] seniorities,
																	@RequestParam(defaultValue = "0") int minSalary,
																	@RequestParam(defaultValue = "0") int maxSalary) {
		try {
			PaginatedModel<PositionDto> response = positionService.getPaginatedPositions(filter, page, size, seniorities,
				minSalary, maxSalary);
			return ResponseEntity.ok(response);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException();
		}
	}

	@DeleteMapping("/positions/{id}")
	public void deletePosition(@PathVariable int id) {
		positionRepo.deleteById(id);
	}

	@PatchMapping("/positions/{id}")
	public void patchPosition(@PathVariable int id, @RequestBody PositionDto positionDto) {
		positionService.update(positionDto, id);
	}
}

