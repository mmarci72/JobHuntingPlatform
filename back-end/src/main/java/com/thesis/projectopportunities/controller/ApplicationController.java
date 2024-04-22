package com.thesis.projectopportunities.controller;


import com.thesis.projectopportunities.dto.ApplicationDto;
import com.thesis.projectopportunities.mapping.ApplicationMapping;
import com.thesis.projectopportunities.model.Application;
import com.thesis.projectopportunities.repo.ApplicationRepo;
import com.thesis.projectopportunities.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost", allowedHeaders = "*")
public class ApplicationController {

	private final ApplicationMapping mapping;

	private final ApplicationRepo applicationRepo;
	private final ApplicationService applicationService;

	@GetMapping("/application/{positionId}")
	public ResponseEntity<List<ApplicationDto>> getApplicationByPositionId(@PathVariable int positionId) {
		return ResponseEntity.ok(applicationRepo.getAllByPosition_PositionId(positionId).stream().map(mapping::toApplication).toList());
	}

	@GetMapping("/application/exists")
	public ResponseEntity<Boolean> getApplicationByPositionId(@RequestParam int positionId, @RequestParam String username) {
		return ResponseEntity.ok(applicationRepo.existsByPosition_PositionIdAndUsername(positionId, username));
	}

	@PostMapping("/application")
	public ResponseEntity<String> postApplication(@RequestBody ApplicationDto applicationDto) {
		Application application = mapping.toApplication(applicationDto);

		applicationRepo.save(application);

		return ResponseEntity.ok("Application saved successfully");
	}

	@GetMapping("/application/approve/{applicationId}/{approved}")
	public ResponseEntity<String> approveApplication(@PathVariable() int applicationId, @PathVariable boolean approved) {
		boolean isApproved = applicationService.approveApplication(applicationId, approved);

		if (!isApproved) {

			return ResponseEntity.notFound().build();
		}

		String status = approved ? "approved" : "rejected";

		return ResponseEntity.ok("Application " + status + " successfully");
	}

}
