package com.thesis.projectopportunities.endpoints;

import static org.hamcrest.Matchers.hasSize;

import java.util.List;

import com.thesis.projectopportunities.BaseSystemTest;
import io.restassured.RestAssured;
import org.apache.http.HttpStatus;
import org.flywaydb.test.junit5.annotation.FlywayTestExtension;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

@FlywayTestExtension
class RoleTest extends BaseSystemTest {

	@Test
	void test_get_all_roles() {
		List<String> roles = RestAssured.given().get("/roles").then()
				.statusCode(HttpStatus.SC_OK)
				.body("$", hasSize(5)).extract().jsonPath()
				.getList("$", String.class);

		Assertions.assertTrue(roles.containsAll(List.of("Tester", "Solution Architect", "Software Engineer")));
	}
}
