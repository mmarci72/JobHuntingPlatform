package com.thesis.projectopportunities.repo;

import java.util.List;

import com.thesis.projectopportunities.model.User;

public interface UserRepo {

	User findByUsername(String username);

	User findByFullName(String fullNameBase64);

	List<User> findByCareerCoach(String careerCoach);

}
