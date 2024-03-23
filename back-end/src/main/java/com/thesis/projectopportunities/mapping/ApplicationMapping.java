package com.thesis.projectopportunities.mapping;

import com.thesis.projectopportunities.dto.ApplicationDto;
import com.thesis.projectopportunities.model.Application;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = PositionMapping.class)
public interface ApplicationMapping {

	Application toApplication(ApplicationDto applicationDto);

	ApplicationDto toApplication(Application application);
}
