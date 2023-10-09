package com.thesis.projectopportunities.dto;

import com.thesis.projectopportunities.model.SettingsPreference;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PreferenceDto {

	@JsonProperty
	private String username;

	@JsonProperty
	private SettingsPreference preferences;
}
