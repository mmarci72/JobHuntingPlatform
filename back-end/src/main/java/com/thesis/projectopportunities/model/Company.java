package com.thesis.projectopportunities.model;


import java.time.LocalDateTime;
import java.util.List;

import com.thesis.projectopportunities.enums.IndustryDomainEnum;
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
public class Company {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	private String description;

	private LocalDateTime founded;

	private String location;

	private int sizeMin;

	private int sizeMax;

	@Enumerated(EnumType.STRING)
	private IndustryDomainEnum industryDomainName;

	private LocalDateTime creationDate;

	@OneToMany(targetEntity = Position.class, fetch = FetchType.EAGER, mappedBy = "company")
	private List<Position> positions;


}
