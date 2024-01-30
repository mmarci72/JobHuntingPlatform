package com.thesis.projectopportunities.controller;

import java.util.List;

import com.thesis.projectopportunities.enums.IndustryDomainEnum;
import com.thesis.projectopportunities.service.IndustryDomainService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin("http://localhost")
public class IndustryDomainController {

	private final IndustryDomainService industryDomainService;

	@GetMapping("/domains")
	public ResponseEntity<List<String>> getAllIndustryDomain() {
		return ResponseEntity.ok(industryDomainService.getAllIndustryDomain().stream().map(IndustryDomainEnum::getLiteral).toList());
	}
}
