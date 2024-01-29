package com.thesis.projectopportunities.mapping;

import com.thesis.projectopportunities.dto.UnitDto;
import com.thesis.projectopportunities.enums.IndustryDomainEnum;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface IndustryDomainMapping {

	@Mapping(expression = "java(unit.getLiteral())", target = "name")
	UnitDto toUnit(IndustryDomainEnum unit);

	@Mapping(expression = "java(toEnum(unitDto.getName()))", target = "name")
	IndustryDomainEnum toUnit(UnitDto unitDto);

	default IndustryDomainEnum toEnum(String literal) {
		return IndustryDomainEnum.toEnum(literal);
	}
}
