package com.thesis.projectopportunities.service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

import com.thesis.projectopportunities.dto.UserNotificationDto;
import com.thesis.projectopportunities.exception.EmailNotSentException;
import com.thesis.projectopportunities.mapping.UserNotificationMapper;
import com.thesis.projectopportunities.model.NotificationQueue;
import com.thesis.projectopportunities.model.Preference;
import com.thesis.projectopportunities.model.Position;
import com.thesis.projectopportunities.repo.NotificationQueueRepo;
import com.thesis.projectopportunities.repo.PositionRepo;
import com.thesis.projectopportunities.repo.PreferenceRepo;
import com.thesis.projectopportunities.repo.UserNotificationRepo;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.KeycloakPrincipal;
import org.keycloak.representations.idm.UserRepresentation;
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

	private final PreferenceRepo preferenceRepo;

	private final NotificationQueueRepo notificationQueueRepo;

	private final PositionRepo positionRepo;
	private final KeycloakService keycloakService;

	public void update(UserNotificationDto userNotificationDto, String id) {
		var userNotification =
			userNotificationRepo.findById(id);

		if (userNotification.isPresent()) {
			userNotificationMapper.update(userNotificationDto, userNotification.get());
			userNotificationRepo.save(userNotification.get());

		} else {
			userNotificationRepo.save(userNotificationMapper.toUserNotification(userNotificationDto));
		}
	}

	public void newNotification(Position position) {
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

		sendSummaryEmails(positions);
		notificationQueueRepo.deleteAll();
		messageService.sendNotifications(positions);
	}

	private void sendSummaryEmails(List<Position> positions) {
		var users = userNotificationRepo.findByEmailNotificationEnabledTrue();
		String subject = "New jobs posted";
		AtomicInteger successfulEmailCount = new AtomicInteger(0);

		users.forEach(user -> {
			try {
				emailService.sendNewSummaryJobsEmail(subject, positions,
					this.keycloakService.getUserDetails(user.getUserId()));
				successfulEmailCount.getAndIncrement();
			} catch (EmailNotSentException e) {
				LOGGER.error(e.getMessage(), e.getCause());

			}
		});

		LOGGER.debug(successfulEmailCount + " out of the " + users.size() + " email messages could be successfully sent");
	}
}
