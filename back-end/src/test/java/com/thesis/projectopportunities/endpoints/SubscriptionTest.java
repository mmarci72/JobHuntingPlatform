package com.thesis.projectopportunities.endpoints;

import com.thesis.projectopportunities.BaseSystemTest;
import com.thesis.projectopportunities.dto.UserNotificationDto;
import com.thesis.projectopportunities.model.Keys;
import com.thesis.projectopportunities.model.PushSubscription;
import com.thesis.projectopportunities.model.Subscription;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.apache.http.HttpStatus;
import org.flywaydb.test.junit5.annotation.FlywayTestExtension;
import org.junit.jupiter.api.Test;

@FlywayTestExtension
class SubscriptionTest extends BaseSystemTest {

	@Test
	void test_add_new_subscription() {
		RestAssured.given().body(constructNewSubscription()).contentType(ContentType.JSON)
			.post("/subscriptions").then()
			.statusCode(HttpStatus.SC_OK);
	}

	@Test
	void test_delete_subscription() {
		RestAssured.given().body(constructUserNotification()).contentType(ContentType.JSON)
			.post("/notifications").then()
			.statusCode(HttpStatus.SC_OK);
		RestAssured.given().body(constructNewSubscription()).contentType(ContentType.JSON)
			.post("/subscriptions").then()
			.statusCode(HttpStatus.SC_OK);
		RestAssured.given().delete("/subscriptions/ujvarim").then()
			.statusCode(HttpStatus.SC_OK);
	}

	private Subscription constructNewSubscription() {
		Subscription subscription = new Subscription();

		subscription.setUsername("ujvarim");

		PushSubscription pushSubscription = new PushSubscription();
		pushSubscription.setEndpoint("test");

		Keys keys = new Keys();
		keys.setAuth("test");
		keys.setP256dh("test");

		pushSubscription.setKeys(keys);
		pushSubscription.setExpirationTime(30000);

		subscription.setPushSubscription(pushSubscription);

		return subscription;
	}

	private UserNotificationDto constructUserNotification() {
		UserNotificationDto userNotification = new UserNotificationDto();

		userNotification.setEmailNotificationEnabled(true);
		userNotification.setPushNotificationEnabled(true);
		userNotification.setUsername("ujvarim");

		return userNotification;
	}
}
