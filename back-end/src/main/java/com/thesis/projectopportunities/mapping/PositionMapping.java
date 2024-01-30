package com.thesis.projectopportunities.mapping;

import com.thesis.projectopportunities.dto.PositionDto;
import com.thesis.projectopportunities.model.Position;
import com.thesis.projectopportunities.repo.CompanyRepo;
import org.mapstruct.InheritConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", uses = CompanyRepo.class, nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
	nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface PositionMapping {

	@Mapping(expression = "java(position.getCompany().getId())", target = "companyId")
	PositionDto toProjectPosition(Position position);

	@Mapping(source = "companyId", target = "company", qualifiedByName = "getReferenceById")
	Position toProjectPosition(PositionDto positionDto);

	@InheritConfiguration
	void update(PositionDto positionDto, @MappingTarget Position position);
}
