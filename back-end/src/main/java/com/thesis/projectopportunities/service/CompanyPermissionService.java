package com.thesis.projectopportunities.service;

import com.thesis.projectopportunities.exception.UserNotFoundException;
import com.thesis.projectopportunities.exception.UsernameAlreadyExistsException;
import com.thesis.projectopportunities.model.CompanyPermission;
import com.thesis.projectopportunities.repo.CompanyPermissionRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CompanyPermissionService {

	private final KeycloakService keycloakService;
	private final CompanyPermissionRepo companyPermissionRepo;


	public CompanyPermission addAccess(CompanyPermission companyPermission) {
		if (companyPermission.getUsername() == null) {
			throw new UserNotFoundException("Invalid username");
		}

		if (companyPermissionRepo.existsByCompanyIdAndUsername(companyPermission.getCompanyId(),
			companyPermission.getUsername())) {
			throw new UsernameAlreadyExistsException("User has already been added as a Recruiter");
		}
		keycloakService.addRecruiterRole(companyPermission.getUsername());
		return companyPermissionRepo.save(companyPermission);
	}


}
