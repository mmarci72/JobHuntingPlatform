package com.thesis.projectopportunities.service;

import java.io.IOException;

import com.thesis.projectopportunities.model.User;
import com.thesis.projectopportunities.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

	private final UserRepo userRepo;

	private final KeycloakService keycloakService;

	public boolean assignAdminIfCareerCoach(User user) {
		try {
			if (keycloakService.isAdmin(user)) {
				return true;
			}
			if (!userRepo.findByCareerCoach(user.getCareerCoach()).isEmpty()) {
				keycloakService.addAdminRole(user);
				return true;
			}
		}
		catch (IOException e) {
			LOGGER.error("Couldn't add role to user with ID " + user.getId());
		}
		return false;
	}
}
