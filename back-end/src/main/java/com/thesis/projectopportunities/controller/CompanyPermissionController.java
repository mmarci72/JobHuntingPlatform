package com.thesis.projectopportunities.controller;

import com.thesis.projectopportunities.model.CompanyPermission;
import com.thesis.projectopportunities.repo.CompanyPermissionRepo;
import com.thesis.projectopportunities.service.KeycloakService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost", allowedHeaders = "*")
public class CompanyPermissionController {


	private final CompanyPermissionRepo companyPermissionRepo;
	private final KeycloakService keycloakService;

	@GetMapping("/permissions/hasAccess")
	public ResponseEntity<Boolean> hasAccess(@RequestParam Long companyId, @RequestParam String username) {
		return ResponseEntity.ok(companyPermissionRepo.existsByCompanyIdAndUsername(companyId, username));
	}

	@PostMapping("/permissions")
	public ResponseEntity<CompanyPermission> addAccess(@RequestBody CompanyPermission companyPermission) {
		this.keycloakService.addRecruiterRole(companyPermission.getUsername());
		return ResponseEntity.ok(companyPermissionRepo.save(companyPermission));
	}
}
