package com.thesis.projectopportunities.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.naming.Name;

@NoArgsConstructor
@Data
public class User {

	@JsonIgnore
	private Name id;

	private String username;

	private String firstName;

	private String lastName;

	private String email;

	private String fullName;


}
