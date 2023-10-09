package com.thesis.projectopportunities.controller;

import java.util.List;

import com.thesis.projectopportunities.dto.UnitDto;
import com.thesis.projectopportunities.mapping.UnitMapping;
import com.thesis.projectopportunities.repo.UnitRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin("http://localhost")
public class UnitController {

	private final UnitRepo unitRepo;

	private final UnitMapping unitMapping;

	@GetMapping("/units")
	public List<UnitDto> getAllUnits() {
		return unitRepo.findAll().stream().map(unitMapping::toUnit).toList();
	}
}
