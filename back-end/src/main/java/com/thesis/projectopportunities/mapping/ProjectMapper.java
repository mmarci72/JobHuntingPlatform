package com.thesis.projectopportunities.mapping;

import com.thesis.projectopportunities.dto.ProjectDto;
import com.thesis.projectopportunities.enums.UnitEnum;
import com.thesis.projectopportunities.model.Project;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = ProjectPositionMapper.class)
public interface ProjectMapper {

	@Mapping(expression = "java(toEnum(dto.getUnitName()))", target = "unitName")
	Project toProject(ProjectDto dto);

	@Mapping(expression = "java(project.getUnitName().getLiteral())", target = "unitName")
	ProjectDto toProject(Project project);

	default UnitEnum toEnum(String literal) {
		return UnitEnum.toEnum(literal);
	}
}
