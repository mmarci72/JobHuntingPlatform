package com.thesis.projectopportunities.service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

import com.thesis.projectopportunities.dto.UserNotificationDto;
import com.thesis.projectopportunities.exception.EmailNotSentException;
import com.thesis.projectopportunities.mapping.UserNotificationMapper;
import com.thesis.projectopportunities.model.NotificationQueue;
import com.thesis.projectopportunities.model.Preference;
import com.thesis.projectopportunities.model.ProjectPosition;
import com.thesis.projectopportunities.repo.NotificationQueueRepo;
import com.thesis.projectopportunities.repo.PositionRepo;
import com.thesis.projectopportunities.repo.PreferenceRepo;
import com.thesis.projectopportunities.repo.UserNotificationRepo;
import com.thesis.projectopportunities.repo.UserRepo;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserNotificationService {

	private final UserNotificationRepo userNotificationRepo;

	private final UserNotificationMapper userNotificationMapper;

	private final EmailService emailService;

	private final SubscriptionService messageService;

	private final UserRepo userRepo;

	private final PreferenceRepo preferenceRepo;

	private final NotificationQueueRepo notificationQueueRepo;

	private final PositionRepo positionRepo;

	public void update(UserNotificationDto userNotificationDto, String id) {
		var userNotification =
			userNotificationRepo.findById(id);

		if (userNotification.isPresent()) {
			userNotificationMapper.update(userNotificationDto, userNotification.get());
			userNotificationRepo.save(userNotification.get());

		}
		else {
			userNotificationRepo.save(userNotificationMapper.toUserNotification(userNotificationDto));
		}
	}

	public void newNotification(ProjectPosition position) {
		notificationQueueRepo.save(new NotificationQueue(position.getPositionId()));
	}

	@Scheduled(fixedDelay = 30000)
	private void sendNotifications() {
		var queue = notificationQueueRepo.findAll();

		if (queue.isEmpty()) {
			return;
		}

		var positions =
			queue.stream().map(notification -> positionRepo.findById(notification.getPositionId())
				.orElseThrow(EntityNotFoundException::new)).toList();
		if (positions.size() == 1) {
			sendDetailedEmail(positions.get(0));
		}
		else {
			sendSummaryEmails(positions);
		}
		notificationQueueRepo.deleteAll();
		messageService.sendNotifications(positions);
	}

	private void sendDetailedEmail(ProjectPosition position) {
		var users = userNotificationRepo.findByEmailNotificationEnabledTrue();
		String subject = "New position posted";
		AtomicInteger successfulEmailCount = new AtomicInteger(0);
		AtomicInteger emailsToSend = new AtomicInteger(0);

		users.forEach(user ->
			{
				try {
					var preference = preferenceRepo.findById(user.getUsername());
					if (checkPreference(preference, position)) {
						emailsToSend.getAndIncrement();
						emailService.sendNewDetailedPositionEmail(subject, position,
							userRepo.findByUsername(user.getUsername()));
						successfulEmailCount.getAndIncrement();
					}
				}
				catch (EmailNotSentException e) {
					LOGGER.error(e.getMessage(), e.getCause());
				}
			}
		);

		LOGGER.debug(successfulEmailCount + " out of the " + emailsToSend + " email messages could be successfully sent");
	}

	private void sendSummaryEmails(List<ProjectPosition> positions) {
		var users = userNotificationRepo.findByEmailNotificationEnabledTrue();
		String subject = "New positions posted";
		AtomicInteger successfulEmailCount = new AtomicInteger(0);

		users.forEach(user -> {
			var preference = preferenceRepo.findById(user.getUsername());
			List<ProjectPosition> filteredPositions = positions.stream()
				.filter(position -> checkPreference(preference, position)).toList();
			if (!filteredPositions.isEmpty()) {
				try {
					emailService.sendNewSummaryPositionEmail(subject, filteredPositions.size(),
						userRepo.findByUsername(user.getUsername()));
					successfulEmailCount.getAndIncrement();
				}
				catch (EmailNotSentException e) {
					LOGGER.error(e.getMessage(), e.getCause());
				}
			}
		});

		LOGGER.debug(successfulEmailCount + " out of the " + users.size() + " email messages could be successfully sent");
	}

	private static boolean checkPreference(Optional<Preference> preference, ProjectPosition position) {
		return preference.isEmpty() || PreferenceService.checkPreferences(position, preference.get());
	}
}
