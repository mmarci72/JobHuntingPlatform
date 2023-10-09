package com.thesis.projectopportunities.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class InterestsDto {

	@JsonProperty
	private int id;

	@JsonProperty
	private int positionId;

	@JsonProperty
	private String username;
}
