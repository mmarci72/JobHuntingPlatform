package com.thesis.projectopportunities.controller;

import com.thesis.projectopportunities.repo.CompanyPermissionRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost", allowedHeaders = "*")
public class CompanyPermissionController {


	private final CompanyPermissionRepo companyPermissionRepo;

	public ResponseEntity<Boolean> hasAccess(@RequestParam int companyId, @RequestParam String username) {
		return ResponseEntity.ok(companyPermissionRepo.existsByCompanyIdAndUsername(companyId, username));
	}

}
