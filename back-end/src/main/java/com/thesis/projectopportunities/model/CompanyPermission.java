package com.thesis.projectopportunities.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyPermission {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private Long companyId;

	private String username;
}
