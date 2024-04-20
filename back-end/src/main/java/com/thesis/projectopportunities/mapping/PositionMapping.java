package com.thesis.projectopportunities.mapping;

import com.thesis.projectopportunities.dto.PositionDto;
import com.thesis.projectopportunities.enums.SeniorityEnum;
import com.thesis.projectopportunities.model.Position;
import com.thesis.projectopportunities.repo.CompanyRepo;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = CompanyRepo.class, nullValuePropertyMappingStrategy =
	NullValuePropertyMappingStrategy.IGNORE,
	nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface PositionMapping {

	@Mapping(expression = "java(position.getCompany().getId())", target = "companyId")
	PositionDto toPosition(Position position);

	@Mapping(source = "companyId", target = "company", qualifiedByName = "getReferenceById")
	@Mapping(target = "seniorityName", source = "seniorityName",
		qualifiedByName = "stringToSeniorityEnum")
	Position toPosition(PositionDto positionDto);

	@InheritConfiguration
	void update(PositionDto positionDto, @MappingTarget Position position);

	@Named("stringToSeniorityEnum")
	default SeniorityEnum stringToSeniorityEnum(String seniorityString) {
		return SeniorityEnum.valueOf(seniorityString.toUpperCase());
	}
}
