package com.thesis.projectopportunities.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ApplicationDto {

	@JsonProperty
	private int id;

	@JsonProperty
	private int positionId;

	@JsonProperty
	private String firstName;

	@JsonProperty
	private String lastName;

	@JsonProperty
	private String username;

	@JsonProperty
	private String email;

	@JsonProperty
	private String phoneNumber;

	@JsonProperty
	private boolean reviewed;

	@JsonProperty
	private boolean approved;

	@JsonProperty
	private LocalDateTime applicationDate;
}
