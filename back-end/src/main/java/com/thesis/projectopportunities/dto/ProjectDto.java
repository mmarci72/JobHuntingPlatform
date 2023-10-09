package com.thesis.projectopportunities.dto;


import java.time.LocalDateTime;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProjectDto {

	@JsonProperty
	private Long id;

	@JsonProperty
	private String name;

	@JsonProperty
	private String unitName;

	@JsonProperty
	private String description;

	@JsonProperty
	private String technologies;

	@JsonProperty
	private LocalDateTime creationDate;

	@JsonProperty
	private Set<ProjectPositionDto> projectPositions;
}
