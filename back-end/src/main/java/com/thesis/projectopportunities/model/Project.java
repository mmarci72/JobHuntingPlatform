package com.thesis.projectopportunities.model;


import java.time.LocalDateTime;
import java.util.List;

import com.thesis.projectopportunities.enums.UnitEnum;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Enumerated(EnumType.STRING)
	private UnitEnum unitName;

	private String name;

	private String description;

	private String technologies;

	private LocalDateTime creationDate;

	@OneToMany(targetEntity = ProjectPosition.class, fetch = FetchType.EAGER, mappedBy = "project")
	private List<ProjectPosition> projectPositions;


}
