package com.thesis.projectopportunities.controller;

import com.thesis.projectopportunities.dto.ProjectPositionDto;
import com.thesis.projectopportunities.mapping.ProjectPositionMapper;
import com.thesis.projectopportunities.model.ProjectPosition;
import com.thesis.projectopportunities.repo.PositionRepo;
import com.thesis.projectopportunities.service.PositionService;
import com.thesis.projectopportunities.service.UserNotificationService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost")
public class PositionController {

	private final PositionRepo positionRepo;

	private final PositionService positionService;

	private final UserNotificationService userNotificationService;

	private final ProjectPositionMapper projectPositionMapper;

	@PostMapping("/positions")
	public ResponseEntity<ProjectPosition> addPosition(@RequestBody ProjectPositionDto position) {
		var savedPosition = positionRepo.save(projectPositionMapper.toProjectPosition(position));
		var responseEntity = new ResponseEntity<>(savedPosition, HttpStatus.CREATED);
		position.setPositionId(savedPosition.getPositionId());
		userNotificationService.newNotification(projectPositionMapper.toProjectPosition(position));
		return responseEntity;
	}

	@GetMapping("/positions/{id}")
	public ResponseEntity<ProjectPositionDto> getPositionById(@PathVariable int id) {
		try {
			return ResponseEntity.ok(projectPositionMapper.toProjectPosition(positionRepo.getReferenceById(id)));
		}
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException();
		}
	}

	@DeleteMapping("/positions/{id}")
	public void deletePosition(@PathVariable int id) {
		positionRepo.deleteById(id);
	}

	@PatchMapping("/positions/{id}")
	public void patchPosition(@PathVariable int id, @RequestBody ProjectPositionDto positionDto) {
		positionService.update(positionDto, id);
	}
}

