package com.thesis.projectopportunities.model;

import com.thesis.projectopportunities.enums.UnitEnum;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Unit {

	@Id
	@Enumerated(EnumType.STRING)
	private UnitEnum name;
}
