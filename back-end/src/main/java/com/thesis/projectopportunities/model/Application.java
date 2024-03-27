package com.thesis.projectopportunities.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "application")
public class Application {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "position_id")
	private Position position;

	private String firstName;

	private String lastName;

	private String username;

	private String email;

	private String phoneNumber;

	private String linkedin;

	private String github;

	private String coverLetterPath;

	private LocalDateTime applicationDate;

}
