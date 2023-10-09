package com.thesis.projectopportunities.repo;

import java.util.List;

import com.thesis.projectopportunities.model.User;
import org.springframework.data.ldap.repository.LdapRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface UserRepo extends LdapRepository<User> {

	User findByUsername(String username);

	User findByFullName(String fullNameBase64);

	List<User> findByCareerCoach(String careerCoach);

}
