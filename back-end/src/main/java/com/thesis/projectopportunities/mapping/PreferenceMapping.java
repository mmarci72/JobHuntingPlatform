package com.thesis.projectopportunities.mapping;

import com.thesis.projectopportunities.dto.PreferenceDto;
import com.thesis.projectopportunities.enums.SeniorityEnum;
import com.thesis.projectopportunities.model.Preference;
import com.thesis.projectopportunities.model.SettingsPreference;
import org.mapstruct.InheritConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
	nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface PreferenceMapping {

	@Mapping(source = "preferences", target = "preferences", qualifiedByName = "convertPreferencesToDto")
	PreferenceDto toPreference(Preference preference);

	@Mapping(source = "preferences", target = "preferences", qualifiedByName = "convertPreferencesFromDto")
	Preference toPreference(PreferenceDto preferenceDto);


	@InheritConfiguration
	void update(PreferenceDto preferenceDto, @MappingTarget Preference preference);

	@Named("convertPreferencesFromDto")
	default SettingsPreference convertPreferencesFromDto(SettingsPreference preferences) {
		preferences.setSeniorities(preferences.getSeniorities().stream().map(seniority ->
			SeniorityEnum.toEnum(seniority).toString()).toList());

		return preferences;
	}

	@Named("convertPreferencesToDto")
	default SettingsPreference convertPreferencesToDto(SettingsPreference preferences) {
		preferences.setSeniorities(preferences.getSeniorities().stream()
			.map(seniorities -> SeniorityEnum.valueOf(seniorities).getLiteral()).toList());

		return preferences;
	}
}
