package com.thesis.projectopportunities.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UnitDto {

	@JsonProperty
	private String name;
}
