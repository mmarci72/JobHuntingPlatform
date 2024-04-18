package com.thesis.projectopportunities.model;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.thesis.projectopportunities.enums.SeniorityEnum;
import jakarta.persistence.*;
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

	private String roleName;

	@Enumerated(EnumType.STRING)
	private SeniorityEnum seniorityName;

	private String requirementsDescription;

	private String positionDescription;

	private String responsibilitiesDescription;

	private Integer salaryMin;

	private Integer salaryMax;

	private LocalDateTime postDate;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "company_id")
	@JsonIgnore
	private Company company;

	@ElementCollection(fetch = FetchType.EAGER)
	@CollectionTable(name = "position_technologies", joinColumns = @JoinColumn(name = "position_id"))
	@Column(name = "name")
	private List<String> technologies;

	@ElementCollection(fetch = FetchType.EAGER)
	@CollectionTable(name = "position_languages", joinColumns = @JoinColumn(name = "position_id"))
	@Column(name = "name")
	private List<String> languages;
}

