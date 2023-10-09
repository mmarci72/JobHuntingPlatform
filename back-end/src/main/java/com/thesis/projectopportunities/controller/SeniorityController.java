package com.thesis.projectopportunities.controller;

import java.util.List;

import com.thesis.projectopportunities.repo.SeniorityRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost")
public class SeniorityController {

	private final SeniorityRepo seniorityRepo;

	@GetMapping("/seniorities")
	public ResponseEntity<List<String>> getAllSeniority() {
		return ResponseEntity.ok(seniorityRepo.findAll().stream().map(seniority -> seniority.getName().getLiteral()).toList());
	}
}
