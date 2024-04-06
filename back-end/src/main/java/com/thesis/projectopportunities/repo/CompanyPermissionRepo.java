package com.thesis.projectopportunities.repo;

import com.thesis.projectopportunities.model.CompanyPermission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CompanyPermissionRepo extends JpaRepository<CompanyPermission, Integer> {

	Boolean existsByCompanyIdAndUsername(int companyId, String username);

}
