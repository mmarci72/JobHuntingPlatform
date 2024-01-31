package com.thesis.projectopportunities.controller;


import java.util.Set;
import java.util.stream.Collectors;

import com.thesis.projectopportunities.dto.CompanyDto;
import com.thesis.projectopportunities.mapping.CompanyMapping;
import com.thesis.projectopportunities.model.Company;
import com.thesis.projectopportunities.repo.CompanyRepo;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost", allowedHeaders = "*")
public class CompanyController {

	private final CompanyRepo companyRepo;

	@Setter(onMethod_ = @Autowired)
	private CompanyMapping companyMapping;

	@GetMapping("/companies")
	public Set<CompanyDto> getProjects() {
		return companyRepo.findAll().stream().map(company -> companyMapping.toProject(company)).collect(Collectors.toSet());
	}

	@GetMapping("/companies/{id}")
	public CompanyDto getProject(@PathVariable Long id) {
		var project = companyRepo.findById(id).orElseThrow(ResourceNotFoundException::new);
		return companyMapping.toProject(project);
	}

	@PostMapping("/companies")
	public ResponseEntity<CompanyDto> addProject(@RequestBody CompanyDto companyDto) {
		Company company = companyMapping.toProject(companyDto);
		return new ResponseEntity<>(companyMapping.toProject(companyRepo.save(company)),
			HttpStatus.CREATED);
	}

}
