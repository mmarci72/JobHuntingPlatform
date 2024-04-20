package com.thesis.projectopportunities.repo;

import com.thesis.projectopportunities.model.Position;
import lombok.NonNull;
import org.mapstruct.Named;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface PositionRepo extends JpaRepository<Position, Integer>, JpaSpecificationExecutor<Position> {

	@Named("getReferenceById")
	@NonNull
	Position getReferenceById(@NonNull Integer positionId);

	List<Position> getPositionsByCompany_Id(Long companyId);


	void deleteAllByCompanyId(@NonNull Long companyId);
}
