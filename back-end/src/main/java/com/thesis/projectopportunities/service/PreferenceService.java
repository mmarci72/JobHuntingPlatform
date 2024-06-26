package com.thesis.projectopportunities.service;

import com.thesis.projectopportunities.dto.PreferenceDto;
import com.thesis.projectopportunities.enums.SeniorityEnum;
import com.thesis.projectopportunities.mapping.PreferenceMapping;
import com.thesis.projectopportunities.model.Preference;
import com.thesis.projectopportunities.model.Position;
import com.thesis.projectopportunities.repo.PreferenceRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PreferenceService {

	private final PreferenceRepo preferenceRepo;

	private final PreferenceMapping preferenceMapper;

	public void update(String userId, PreferenceDto preferenceDto) {

		preferenceDto.setUserId(userId);
		var preference =
			preferenceRepo.findById(userId);

		if (preference.isPresent()) {
			preferenceMapper.update(preferenceDto, preference.get());
			preferenceRepo.save(preference.get());

		} else {
			preferenceRepo.save(preferenceMapper.toPreference(preferenceDto));
		}
	}

	public static boolean checkPreferences(Position position, Preference preference) {
		var preferences = preference.getPreferences();

		return
			(preferences.getSeniorities().stream()
				.anyMatch(seniority -> position.getSeniorityName().getLiteral().equalsIgnoreCase(seniority)) || position.getSeniorityName()
				.equals(SeniorityEnum.ANY));
	}
}
