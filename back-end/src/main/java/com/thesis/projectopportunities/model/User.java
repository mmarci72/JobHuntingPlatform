package com.thesis.projectopportunities.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.ldap.odm.annotations.Entry;
import org.springframework.ldap.odm.annotations.Id;
import org.springframework.ldap.odm.annotations.Attribute;

import javax.naming.Name;

@Entry(objectClasses = { "person", "inetOrgPerson", "top" })
@NoArgsConstructor
@Data
public class User {

	@JsonIgnore
	@Id
	private Name id;

	@Attribute(name = "uid")
	private String username;

	@Attribute(name = "givenName")
	private String firstName;

	@Attribute(name = "sn")
	private String lastName;

	@Attribute(name = "mail")
	private String email;

	@Attribute(name = "careerCoach")
	private String careerCoach;

	@Attribute(name = "un")
	private String fullName;


}
