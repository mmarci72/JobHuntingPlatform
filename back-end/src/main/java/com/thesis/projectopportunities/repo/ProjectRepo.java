package com.thesis.projectopportunities.repo;


import com.thesis.projectopportunities.model.Project;
import lombok.NonNull;
import org.mapstruct.Named;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface ProjectRepo extends JpaRepository<Project, Long> {

	@Named("getReferenceById")
	@NonNull
	Project getReferenceById(@NonNull Long id);
}
