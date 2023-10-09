package com.thesis.projectopportunities.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Interests {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private int positionId;

	private String username;
}
