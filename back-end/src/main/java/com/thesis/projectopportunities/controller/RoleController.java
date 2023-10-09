package com.thesis.projectopportunities.controller;

import java.util.List;

import com.thesis.projectopportunities.repo.RoleRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost", allowedHeaders = "*")
public class RoleController {

	private final RoleRepo roleRepo;

	@GetMapping("/roles")
	public ResponseEntity<List<String>> getAllRoles() {
		return ResponseEntity.ok(roleRepo.findAll().stream().map(role -> role.getName().getLiteral()).toList());
	}
}
