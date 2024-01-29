package com.thesis.projectopportunities.controller;

import java.util.List;

import com.thesis.projectopportunities.dto.UnitDto;
import com.thesis.projectopportunities.mapping.IndustryDomainMapping;
import com.thesis.projectopportunities.service.IndustryDomainService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin("http://localhost")
public class IndustryDomainController {

	private final IndustryDomainService industryDomainService;
	private final IndustryDomainMapping industryDomainMapping;

	@GetMapping("/units")
	public List<UnitDto> getAllUnits() {
		return industryDomainService.getAllUnit().stream().map(industryDomainMapping::toUnit).toList();
	}
}
