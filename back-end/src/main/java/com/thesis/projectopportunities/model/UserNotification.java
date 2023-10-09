package com.thesis.projectopportunities.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class UserNotification {

	@Id
	private String username;

	private Boolean emailNotificationEnabled = false;

	private Boolean pushNotificationEnabled = false;
}
