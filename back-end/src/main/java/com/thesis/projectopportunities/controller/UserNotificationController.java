package com.thesis.projectopportunities.controller;

import com.thesis.projectopportunities.dto.UserNotificationDto;
import com.thesis.projectopportunities.mapping.UserNotificationMapper;
import com.thesis.projectopportunities.repo.UserNotificationRepo;
import com.thesis.projectopportunities.service.UserNotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost")
public class UserNotificationController {

	private final UserNotificationRepo userNotificationRepo;

	private final UserNotificationMapper userNotificationMapper;

	private final UserNotificationService userNotificationService;

	@GetMapping("/notifications/{userId}")
	public ResponseEntity<UserNotificationDto> getByUserId(@PathVariable String userId) {
		return ResponseEntity.ok(
			userNotificationMapper.toUserNotification(
				userNotificationRepo.getByUserId(userId).orElseThrow(ResourceNotFoundException::new)));
	}

	@PostMapping("/notifications")
	public UserNotificationDto addNotification(@RequestBody UserNotificationDto userNotificationDto) {
		return userNotificationMapper.toUserNotification(
			userNotificationRepo.save(userNotificationMapper.toUserNotification(userNotificationDto)));
	}

	@PatchMapping("notifications/{id}")
	public void patchNotification(@PathVariable String id, @RequestBody UserNotificationDto userNotificationDto) {
		userNotificationService.update(userNotificationDto, id);
	}
}
