package com.thesis.projectopportunities.repo;

import com.thesis.projectopportunities.model.CompanyPermission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CompanyPermissionRepo extends JpaRepository<CompanyPermission, Integer> {

	Boolean existsByCompanyIdAndUsername(Long companyId, String username);

	@Query("SELECT cp.companyId FROM CompanyPermission cp WHERE cp.username = :username")
	List<Long> findCompanyIdsByUsername(String username);
}
