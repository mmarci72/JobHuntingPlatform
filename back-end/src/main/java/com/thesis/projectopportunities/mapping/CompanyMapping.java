package com.thesis.projectopportunities.mapping;

import com.thesis.projectopportunities.dto.CompanyDto;
import com.thesis.projectopportunities.model.Company;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = PositionMapping.class)
public interface CompanyMapping {

    Company toProject(CompanyDto dto);

	CompanyDto toProject(Company company);
}
