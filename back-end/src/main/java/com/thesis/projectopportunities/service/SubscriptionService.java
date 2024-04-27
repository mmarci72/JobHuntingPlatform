package com.thesis.projectopportunities.service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.security.Security;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.atomic.AtomicInteger;

import com.thesis.projectopportunities.configuration.VapidProperties;
import com.thesis.projectopportunities.model.Position;
import com.thesis.projectopportunities.repo.PreferenceRepo;
import com.thesis.projectopportunities.repo.SubscriptionRepo;
import com.thesis.projectopportunities.repo.UserNotificationRepo;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityNotFoundException;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.PushService;
import nl.martijndwars.webpush.Subscription;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.jose4j.lang.JoseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Data
@Slf4j
public class SubscriptionService {

	private static final String MESSAGE_FOR_ONE_POSITION = """
		{
		             "notification": {
		                 "title": "A new position has been posted!",
		                 "body": "1 new position have been posted to the website, go check it out!"
		             }
		}
		            \s""";

	private static final String MESSAGE_FOR_MULTIPLE_POSITIONS = """
		{
		             "notification": {
		                 "title": "New positions have been posted!",
		                 "body": "%s new positions have been posted to the website, go check it out!"
		             }
		}
		            \s""";

	@Setter(onMethod_ = @Autowired)
	private VapidProperties properties;

	private PushService pushService;

	private final SubscriptionRepo subscriptionRepo;

	private final PreferenceRepo preferenceRepo;

	private final UserNotificationRepo userNotificationRepo;

	public void addNewSubscription(com.thesis.projectopportunities.model.Subscription subscription) {
		String userId = subscription.getUserId();
		boolean isPushNotificationEnabled =
			userNotificationRepo.getByUserId(userId).orElseThrow(EntityNotFoundException::new).getPushNotificationEnabled();
		if (isPushNotificationEnabled) {
			subscriptionRepo.save(subscription);
		}
	}

	public void sendNotifications(List<Position> positions) {
		var subscriptions = subscriptionRepo.findAll();

		if (positions.size() == 1) {
			sendNotificationsForOnePosition(subscriptions, positions.get(0));
		} else {
			sendNotificationsForMultiplePositions(subscriptions, positions);
		}

	}

	@PostConstruct
	private void init() throws GeneralSecurityException {
		Security.addProvider(new BouncyCastleProvider());
		pushService = new PushService(properties.publicKey(), properties.privateKey());
	}

	private void sendNotification(Subscription subscription, String messageJson) {
		try {
			pushService.send(new Notification(subscription, messageJson));
		} catch (GeneralSecurityException | IOException | JoseException | ExecutionException | InterruptedException e) {
			LOGGER.error(e.getMessage());

			Thread.currentThread().interrupt();
		}
	}

	private void sendNotificationsForOnePosition(List<com.thesis.projectopportunities.model.Subscription> subscriptions,
												 Position position) {
		subscriptions.forEach(subscription -> {
			var preference = preferenceRepo.findById(subscription.getUserId());
			if (preference.isEmpty() || PreferenceService.checkPreferences(position, preference.get())) {
				var sub = setupSubscription(subscription);
				sendNotification(sub, MESSAGE_FOR_ONE_POSITION);
			}
		});
	}

	private void sendNotificationsForMultiplePositions(List<com.thesis.projectopportunities.model.Subscription> subscriptions,
													   List<Position> positions) {

		subscriptions.forEach(subscription -> {
			int counter = numberOfPositionsToSend(positions, subscription);
			var sub = setupSubscription(subscription);
			if (counter != 0) {
				sendNotification(sub, String.format(MESSAGE_FOR_MULTIPLE_POSITIONS, counter));
			}
		});
	}

	private static Subscription setupSubscription(com.thesis.projectopportunities.model.Subscription subscription) {
		var newSubscription = new Subscription();
		newSubscription.endpoint = subscription.getPushSubscription().getEndpoint();
		newSubscription.keys = new Subscription.Keys();
		newSubscription.keys.auth = subscription.getPushSubscription().getKeys().getAuth();
		newSubscription.keys.p256dh = subscription.getPushSubscription().getKeys().getP256dh();

		return newSubscription;
	}

	private int numberOfPositionsToSend(List<Position> positions,
										com.thesis.projectopportunities.model.Subscription subscription) {
		AtomicInteger counter = new AtomicInteger(0);

		positions.forEach(position -> {
			var preference = preferenceRepo.findById(subscription.getUserId());
			if (preference.isEmpty() || PreferenceService.checkPreferences(position, preference.get())) {
				counter.getAndIncrement();
			}
		});

		return counter.get();
	}
}

