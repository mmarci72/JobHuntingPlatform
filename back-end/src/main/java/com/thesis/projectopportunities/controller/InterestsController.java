package com.thesis.projectopportunities.controller;

import java.util.Set;
import java.util.stream.Collectors;

import com.thesis.projectopportunities.dto.InterestsDto;
import com.thesis.projectopportunities.mapping.InterestsMapping;
import com.thesis.projectopportunities.repo.InterestsRepo;
import com.thesis.projectopportunities.repo.PositionRepo;
import com.thesis.projectopportunities.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost")
public class InterestsController {

	private final InterestsRepo interestsRepo;

	private final InterestsMapping interestsMapping;

	private final PositionRepo positionRepo;

	private final EmailService emailService;

	@GetMapping("/interests")
	public Set<InterestsDto> getAllInterests() {
		return interestsRepo.findAll().stream().map(interestsMapping::toInterests).collect(Collectors.toSet());
	}

	@GetMapping("/interests/{username}")
	public Set<InterestsDto> getInterestsByUsername(@PathVariable String username) {
		return interestsRepo.findAllByUsername(username).stream().map(interestsMapping::toInterests).collect(
			Collectors.toSet());
	}

	@PostMapping("/interests")
	public InterestsDto addNewInterest(@RequestBody InterestsDto interestsDto) {
		return interestsMapping.toInterests(interestsRepo.save(interestsMapping.toInterests(interestsDto)));
	}
}

