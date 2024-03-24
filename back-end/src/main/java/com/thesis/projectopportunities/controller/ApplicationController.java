package com.thesis.projectopportunities.controller;


import com.thesis.projectopportunities.dto.ApplicationDto;
import com.thesis.projectopportunities.mapping.ApplicationMapping;
import com.thesis.projectopportunities.model.Application;
import com.thesis.projectopportunities.repo.ApplicationRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost", allowedHeaders = "*")
public class ApplicationController {

	private final ApplicationMapping mapping;

	private final ApplicationRepo applicationRepo;

	@GetMapping("/application/{positionId}")
	public ResponseEntity<ApplicationDto> getApplicationByPositionId(@PathVariable int positionId) {
		return ResponseEntity.ok(mapping.toApplication(applicationRepo.getByPosition_PositionId(positionId)));
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

}
