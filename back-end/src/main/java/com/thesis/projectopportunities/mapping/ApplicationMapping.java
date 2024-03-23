package com.thesis.projectopportunities.mapping;

import com.thesis.projectopportunities.dto.ApplicationDto;
import com.thesis.projectopportunities.model.Application;
import com.thesis.projectopportunities.repo.PositionRepo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = PositionRepo.class)
public interface ApplicationMapping {

	@Mapping(source = "positionId", target = "position", qualifiedByName = "getReferenceById")
	Application toApplication(ApplicationDto applicationDto);

	@Mapping(expression = "java(application.getPosition().getPositionId())", target = "positionId")
	ApplicationDto toApplication(Application application);
}
