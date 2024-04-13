package com.thesis.projectopportunities.mapping;

import com.thesis.projectopportunities.dto.CompanyDto;
import com.thesis.projectopportunities.model.Company;
import org.mapstruct.InheritConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", uses = PositionMapping.class)
public interface CompanyMapping {

	Company toCompany(CompanyDto dto);

	CompanyDto toCompany(Company company);

	@InheritConfiguration
	void update(CompanyDto companyDto, @MappingTarget Company company);
}
