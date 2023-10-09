package com.thesis.projectopportunities.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserNotificationDto {

	@JsonProperty
	private String username;

	@JsonProperty
	private Boolean emailNotificationEnabled;

	@JsonProperty
	private Boolean pushNotificationEnabled;
}
