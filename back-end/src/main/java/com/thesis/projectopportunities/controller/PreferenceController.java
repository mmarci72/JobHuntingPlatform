package com.thesis.projectopportunities.controller;

import com.thesis.projectopportunities.dto.PreferenceDto;
import com.thesis.projectopportunities.mapping.PreferenceMapping;
import com.thesis.projectopportunities.repo.PreferenceRepo;
import com.thesis.projectopportunities.service.PreferenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(value = "http://localhost")
public class PreferenceController {

	private final PreferenceRepo preferenceRepo;

	private final PreferenceMapping preferenceMapping;

	private final PreferenceService preferenceService;

	@GetMapping("/preferences/{username}")
	public PreferenceDto getPreferencesForUser(@PathVariable String username) {
		return preferenceMapping.toPreference(preferenceRepo.findById(username)
			.orElseThrow(ResourceNotFoundException::new));
	}

	@PostMapping("/preferences")
	public void postPreference(@RequestBody PreferenceDto preferenceDto) {
		preferenceRepo.save(preferenceMapping.toPreference(preferenceDto));
	}

	@PatchMapping("/preferences/{username}")
	public PreferenceDto patchPreferences(@PathVariable String username, @RequestBody PreferenceDto preferenceDto) {
		preferenceService.update(username, preferenceDto);

		return preferenceMapping.toPreference(preferenceRepo.findById(username).orElseThrow(ResourceNotFoundException::new));
	}
}
