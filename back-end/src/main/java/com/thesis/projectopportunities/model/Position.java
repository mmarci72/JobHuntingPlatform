package com.thesis.projectopportunities.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.thesis.projectopportunities.enums.RoleEnum;
import com.thesis.projectopportunities.enums.SeniorityEnum;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "position")
public class Position {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int positionId;

	private String positionName;

	private LocalDateTime startDate;

	private RoleEnum roleName;

	private SeniorityEnum seniorityName;

	private String requirementsDescription;

	private String offerDescription;

	private String responsibilitiesDescription;

	private int salaryMin;

	private int salaryMax;

	private LocalDateTime postDate;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "company_id")
	@JsonIgnore
	private Company company;
}
