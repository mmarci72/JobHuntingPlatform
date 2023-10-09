package com.thesis.projectopportunities.mapping;

import com.thesis.projectopportunities.dto.UnitDto;
import com.thesis.projectopportunities.enums.UnitEnum;
import com.thesis.projectopportunities.model.Unit;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UnitMapping {

	@Mapping(expression = "java(unit.getName().getLiteral())", target = "name")
	UnitDto toUnit(Unit unit);

	@Mapping(expression = "java(toEnum(unitDto.getName()))", target = "name")
	Unit toUnit(UnitDto unitDto);

	default UnitEnum toEnum(String literal) {
		return UnitEnum.toEnum(literal);
	}
}
