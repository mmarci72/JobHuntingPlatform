package com.thesis.projectopportunities.endpoints;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;

import java.util.List;

import com.thesis.projectopportunities.BaseSystemTest;
import com.thesis.projectopportunities.model.Interests;
import com.thesis.projectopportunities.model.User;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.apache.http.HttpStatus;
import org.flywaydb.test.junit5.annotation.FlywayTestExtension;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

@FlywayTestExtension
class InterestsTest extends BaseSystemTest {

	@Test
	void test_get_all_interests() {
		List<Interests> interests = RestAssured.given().get("/interests").then()
			.statusCode(HttpStatus.SC_OK).extract().jsonPath()
			.getList("$", Interests.class);

		Assertions.assertEquals(1, interests.size());
		Assertions.assertTrue(interests.stream()
			.anyMatch(interest -> interest.getUsername()
				.equals("ujvarim") && interest.getPositionId() == 1));

	}

	@Test
	void test_get_all_interest_by_username() {
		RestAssured.given().get("/interests/ujvarim").then()
			.statusCode(HttpStatus.SC_OK)
			.body("size()", is(1))
			.body("[0].username", equalTo("ujvarim"));
	}

	@Test
	void test_adding_new_interest() {
		RestAssured.given().body(constructNewInterest()).contentType(ContentType.JSON)
			.post("/interests").then()
			.statusCode(HttpStatus.SC_OK);
	}

	private Interests constructNewInterest() {
		Interests interest = new Interests();

		interest.setPositionId(3);
		interest.setId(10);
		interest.setUsername("ujvarim");

		return interest;
	}
}
