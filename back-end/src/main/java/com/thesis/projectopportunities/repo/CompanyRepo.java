package com.thesis.projectopportunities.repo;


import com.thesis.projectopportunities.model.Company;
import lombok.NonNull;
import org.mapstruct.Named;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface CompanyRepo extends JpaRepository<Company, Long> {

	@Named("getReferenceById")
	@NonNull
    Company getReferenceById(@NonNull Long id);
}
