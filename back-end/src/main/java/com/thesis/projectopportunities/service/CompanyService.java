package com.thesis.projectopportunities.service;

import com.thesis.projectopportunities.dto.CompanyDto;
import com.thesis.projectopportunities.mapping.CompanyMapping;
import com.thesis.projectopportunities.model.Company;
import com.thesis.projectopportunities.model.CompanyPermission;
import com.thesis.projectopportunities.repo.CompanyPermissionRepo;
import com.thesis.projectopportunities.repo.CompanyRepo;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CompanyService {

	private final CompanyRepo companyRepo;
	private final KeycloakService keycloakService;
	private final CompanyPermissionRepo companyPermissionRepo;

	@Setter(onMethod_ = @Autowired)
	private CompanyMapping companyMapping;

	public CompanyDto addNewCompany(CompanyDto companyDto, String username) {
		Company company = companyMapping.toCompany(companyDto);

		if (!keycloakService.addRecruiterRole(username)) {
			return null;
		}

		var companyPermission = new CompanyPermission();
		var companyAdded = companyRepo.save(company);

		var companyId = companyAdded.getId();

		companyPermission.setCompanyId(companyId);
		companyPermission.setUsername(username);
		companyPermissionRepo.save(companyPermission);

		return companyMapping.toCompany(companyAdded);
	}

	public void update(CompanyDto companyDto, Long id, String username) {
		var company =
			companyRepo.findById(id);

		if (company.isPresent()) {
			companyMapping.update(companyDto, company.get());
			companyRepo.save(company.get());

		} else {
			addNewCompany(companyDto, username);
		}
	}
}
