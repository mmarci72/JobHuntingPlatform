package com.thesis.projectopportunities.endpoints;

import static org.hamcrest.Matchers.equalTo;

import com.thesis.projectopportunities.BaseSystemTest;
import com.thesis.projectopportunities.dto.UserNotificationDto;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.apache.http.HttpStatus;
import org.flywaydb.test.junit5.annotation.FlywayTestExtension;
import org.junit.jupiter.api.Test;

@FlywayTestExtension
class UserNotificationTest extends BaseSystemTest {

	@Test
	void test_get_notifications_for_user() {
		RestAssured.given().body(constructUserNotification()).contentType(ContentType.JSON)
			.post("/notifications").then()
			.statusCode(HttpStatus.SC_OK);

		RestAssured.given().get("/notifications/test").then()
			.statusCode(HttpStatus.SC_OK).body("userId", equalTo("test"))
			.body("emailNotificationEnabled", equalTo(true))
			.body("pushNotificationEnabled", equalTo(false));
	}

	@Test
	void test_get_non_existent_notifications_for_user() {
		RestAssured.given().get("/notifications/test").then()
			.statusCode(HttpStatus.SC_NOT_FOUND);
	}

	@Test
	void test_update_notification_by_id() {
		UserNotificationDto userNotification = constructUserNotification();

		RestAssured.given().body(userNotification).contentType(ContentType.JSON)
			.post("/notifications").then()
			.statusCode(HttpStatus.SC_OK);

		userNotification.setEmailNotificationEnabled(false);
		userNotification.setPushNotificationEnabled(true);

		RestAssured.given().body(userNotification).contentType(ContentType.JSON)
			.patch("/notifications/test").then()
			.statusCode(HttpStatus.SC_OK);

		RestAssured.given().get("/notifications/test").then()
			.statusCode(HttpStatus.SC_OK).body("userId", equalTo("test"))
			.body("emailNotificationEnabled", equalTo(false))
			.body("pushNotificationEnabled", equalTo(true));
	}

	@Test
	void test_add_new_notification() {
		RestAssured.given().get("/notifications/test").then()
			.statusCode(HttpStatus.SC_NOT_FOUND);


		RestAssured.given().body(constructUserNotification()).contentType(ContentType.JSON)
			.post("/notifications").then()
			.statusCode(HttpStatus.SC_OK);

		RestAssured.given().get("/notifications/test").then()
			.statusCode(HttpStatus.SC_OK)
			.body("userId", equalTo("test"))
			.body("emailNotificationEnabled", equalTo(true))
			.body("pushNotificationEnabled", equalTo(false));

	}

	private UserNotificationDto constructUserNotification() {
		UserNotificationDto userNotification = new UserNotificationDto();

		userNotification.setEmailNotificationEnabled(true);
		userNotification.setPushNotificationEnabled(false);
		userNotification.setUserId("test");

		return userNotification;
	}


}
