package com.thesis.projectopportunities.mapping;

import com.thesis.projectopportunities.dto.UserNotificationDto;
import com.thesis.projectopportunities.model.UserNotification;
import org.mapstruct.InheritConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
	nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface UserNotificationMapper {

	UserNotification toUserNotification(UserNotificationDto userNotificationDto);


	UserNotificationDto toUserNotification(UserNotification userNotification);

	@InheritConfiguration
	void update(UserNotificationDto update, @MappingTarget UserNotification destination);
}
