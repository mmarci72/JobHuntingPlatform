package com.thesis.projectopportunities.mapping;

import com.thesis.projectopportunities.dto.InterestsDto;
import com.thesis.projectopportunities.model.Interests;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface InterestsMapping {

	Interests toInterests(InterestsDto interestsDto);

	InterestsDto toInterests(Interests interests);
}
