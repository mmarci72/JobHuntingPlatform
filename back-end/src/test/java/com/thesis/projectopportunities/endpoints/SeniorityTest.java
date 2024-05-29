package com.thesis.projectopportunities.endpoints;

import java.util.List;

import com.thesis.projectopportunities.BaseSystemTest;
import io.restassured.RestAssured;
import org.apache.http.HttpStatus;
import org.flywaydb.test.junit5.annotation.FlywayTestExtension;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

@FlywayTestExtension
class SeniorityTest extends BaseSystemTest {

	@Test
	void test_get_all_seniority() {
		List<String> seniorities = RestAssured.given().get("/seniorities").then()
			.statusCode(HttpStatus.SC_OK)
			.extract().jsonPath().getList("$", String.class);

		Assertions.assertEquals(5, seniorities.size());

		Assertions.assertTrue(seniorities.containsAll(List.of("Intern", "Junior", "Expert", "Senior")));
	}
}
