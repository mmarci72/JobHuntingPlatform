package com.thesis.projectopportunities.controller;


import java.util.Set;
import java.util.stream.Collectors;

import com.thesis.projectopportunities.dto.CompanyDto;
import com.thesis.projectopportunities.mapping.CompanyMapping;
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

	@Setter(onMethod_ = @Autowired)
	private CompanyMapping companyMapping;

	@GetMapping("/companies")
	public Set<CompanyDto> getCompanies() {
		return companyRepo.findAll().stream().map(company -> companyMapping.toProject(company)).collect(Collectors.toSet());
	}

	@GetMapping("/companies/{id}")
	public CompanyDto getCompany(@PathVariable Long id) {
		var project = companyRepo.findById(id).orElseThrow(ResourceNotFoundException::new);
		return companyMapping.toProject(project);
	}

	@PostMapping("/companies")
	public ResponseEntity<CompanyDto> addCompany(@RequestBody CompanyDto companyDto, @RequestParam String username) {
		if (!companyService.addNewCompany(companyDto, username)) {
			return ResponseEntity.internalServerError().body(null);
		}

		return new ResponseEntity<>(companyDto, HttpStatus.CREATED);
	}

}
