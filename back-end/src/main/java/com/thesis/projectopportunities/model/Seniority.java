package com.thesis.projectopportunities.model;


import com.thesis.projectopportunities.enums.SeniorityEnum;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Seniority {

	@Id
	@Enumerated(EnumType.STRING)
	private SeniorityEnum name;
}
