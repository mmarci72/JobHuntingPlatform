package com.thesis.projectopportunities.mapping;

import com.thesis.projectopportunities.dto.ProjectPositionDto;
import com.thesis.projectopportunities.model.ProjectPosition;
import com.thesis.projectopportunities.repo.ProjectRepo;
import org.mapstruct.InheritConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", uses = ProjectRepo.class, nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
	nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface ProjectPositionMapper {

	@Mapping(expression = "java(projectPosition.getProject().getId())", target = "projectId")
	ProjectPositionDto toProjectPosition(ProjectPosition projectPosition);

	@Mapping(source = "projectId", target = "project", qualifiedByName = "getReferenceById")
	ProjectPosition toProjectPosition(ProjectPositionDto projectPositionDto);

	@InheritConfiguration
	void update(ProjectPositionDto projectPositionDto, @MappingTarget ProjectPosition projectPosition);
}
