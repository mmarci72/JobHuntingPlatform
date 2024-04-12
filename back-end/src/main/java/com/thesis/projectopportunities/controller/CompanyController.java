package com.thesis.projectopportunities.controller;


import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import com.thesis.projectopportunities.dto.CompanyDto;
import com.thesis.projectopportunities.mapping.CompanyMapping;
import com.thesis.projectopportunities.repo.CompanyPermissionRepo;
import com.thesis.projectopportunities.repo.CompanyRepo;
import com.thesis.projectopportunities.service.CompanyService;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost", allowedHeaders = "*")
public class CompanyController {

	private final CompanyRepo companyRepo;
	private final CompanyService companyService;
	private final CompanyPermissionRepo companyPermissionRepo;

	@Setter(onMethod_ = @Autowired)
	private CompanyMapping companyMapping;

	@GetMapping("/companies")
	public Set<CompanyDto> getCompanies() {
		return companyRepo.findAll().stream().map(company -> companyMapping.toCompany(company)).collect(Collectors.toSet());
	}

	@GetMapping("/companies/{id}")
	public CompanyDto getCompany(@PathVariable Long id) {
		var project = companyRepo.findById(id).orElseThrow(ResourceNotFoundException::new);
		return companyMapping.toCompany(project);
	}

	@GetMapping("/companies/permissions/{username}")
	public ResponseEntity<List<CompanyDto>> getAccessibleCompanies(@PathVariable String username) {
		List<Long> companyIds = companyPermissionRepo.findCompanyIdsByUsername(username);
		return ResponseEntity.ok(companyIds.stream().map(id -> companyMapping.toCompany(companyRepo.findById(id).orElse(null))
		).filter(Objects::nonNull).toList());
	}

	@PostMapping("/companies")
	public ResponseEntity<CompanyDto> addCompany(@RequestBody CompanyDto companyDto, @RequestParam String username) {
		CompanyDto addedCompany;

		addedCompany = companyService.addNewCompany(companyDto, username);

		if (addedCompany == null) {
			return ResponseEntity.internalServerError().body(null);
		}

		return new ResponseEntity<>(addedCompany, HttpStatus.CREATED);
	}

	@PatchMapping("/companies/{id}")
	public ResponseEntity<CompanyDto> patchPosition(@PathVariable Long id, @RequestBody CompanyDto companyDto,
													@RequestParam String username) {
		companyService.update(companyDto, id, username);
		return ResponseEntity.ok(companyDto);
	}
}
