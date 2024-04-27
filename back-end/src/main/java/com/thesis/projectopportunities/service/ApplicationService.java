package com.thesis.projectopportunities.service;


import com.thesis.projectopportunities.model.Application;
import com.thesis.projectopportunities.repo.ApplicationRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ApplicationService {

	private final ApplicationRepo applicationRepo;

	public boolean approveApplication(int applicationId, boolean approve) {

		Application application = getApplication(applicationId);

		if (application == null) {
			return false;
		}

		Application renamedApplication = setApprovedStatus(approve, application);

		applicationRepo.save(renamedApplication);

		return true;

	}

	private Application getApplication(int applicationId) {

		Optional<Application> application = applicationRepo.findById(applicationId);

		return application.orElse(null);

	}

	private Application setApprovedStatus(boolean approved, Application application) {
		application.setApproved(approved);
		application.setReviewed(true);

		return application;
	}
}
