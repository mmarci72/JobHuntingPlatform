package com.thesis.projectopportunities.service;

import com.thesis.projectopportunities.dto.PreferenceDto;
import com.thesis.projectopportunities.enums.SeniorityEnum;
import com.thesis.projectopportunities.enums.UnitEnum;
import com.thesis.projectopportunities.mapping.PreferenceMapping;
import com.thesis.projectopportunities.model.Preference;
import com.thesis.projectopportunities.model.ProjectPosition;
import com.thesis.projectopportunities.repo.PreferenceRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PreferenceService {

	private final PreferenceRepo preferenceRepo;

	private final PreferenceMapping preferenceMapper;

	public void update(String username, PreferenceDto preferenceDto) {
		var preference =
			preferenceRepo.findById(username);

		if (preference.isPresent()) {
			preferenceMapper.update(preferenceDto, preference.get());
			preferenceRepo.save(preference.get());

		}
		else {
			preferenceRepo.save(preferenceMapper.toPreference(preferenceDto));
		}
	}

	public static boolean checkPreferences(ProjectPosition position, Preference preference) {
		var preferences = preference.getPreferences();

		return (preferences.getRoles().contains(position.getRoleName()) &&
			(preferences.getSeniorities().contains(position.getSeniorityName()) || position.getSeniorityName()
				.equals(SeniorityEnum.ANY.toString())) &&
			preferences.getUnits().stream().map(UnitEnum::toEnum).toList().contains(position.getProject().getUnitName()));
	}
}
