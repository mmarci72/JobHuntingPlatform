package com.thesis.projectopportunities.dto;


import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.thesis.projectopportunities.enums.IndustryDomainEnum;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CompanyDto {

	@JsonProperty
	private Long id;

	@JsonProperty
	private String name;

	@JsonProperty
	private String description;

	@JsonProperty
	private LocalDateTime founded;

	@JsonProperty
	private String location;

	@JsonProperty
	private int sizeMin;

	@JsonProperty
	private int sizeMax;

	@JsonProperty
	private IndustryDomainEnum industryDomain;

	@JsonProperty
	private LocalDateTime creationDate;

	@JsonProperty
	private List<PositionDto> positions;

}
