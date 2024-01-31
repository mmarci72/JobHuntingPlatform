package com.thesis.projectopportunities.controller;

import java.util.List;

import com.thesis.projectopportunities.enums.SeniorityEnum;
import com.thesis.projectopportunities.service.SeniorityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost")
public class SeniorityController {

	private final SeniorityService seniorityService;

	@GetMapping("/seniorities")
	public ResponseEntity<List<String>> getAllSeniority() {
		return ResponseEntity.ok(seniorityService.getAllSeniority().stream().map(SeniorityEnum::getLiteral).toList());
	}
}
