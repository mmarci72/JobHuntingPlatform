package com.thesis.projectopportunities.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProjectPositionDto {

	@JsonProperty
	private int positionId;

	@JsonProperty
	private String roleName;

	@JsonProperty
	private String seniorityName;

	@JsonProperty
	private int numberOfOpenPositions;

	@JsonProperty
	private int farming;

	@JsonProperty
	private LocalDateTime startDate;

	@JsonProperty
	private LocalDateTime postDate;

	@JsonProperty
	private long projectId;
}
