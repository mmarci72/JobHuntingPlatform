package com.thesis.projectopportunities.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PositionDto {

	@JsonProperty
	private int positionId;

	@JsonProperty
	private String positionName;

	@JsonProperty
	private String roleName;

	@JsonProperty
	private String seniorityName;

	@JsonProperty
	private String requirementsDescription;

	@JsonProperty
	private String offerDescription;

	@JsonProperty
	private String responsibilitiesDescription;

	@JsonProperty
	private int salaryMin;

	@JsonProperty
	private int salaryMax;

	@JsonProperty
	private LocalDateTime startDate;

	@JsonProperty
	private LocalDateTime postDate;

	@JsonProperty
	private long companyId;
}
