package com.thesis.projectopportunities.endpoints;

import static org.hamcrest.Matchers.is;

import java.time.LocalDateTime;

import com.thesis.projectopportunities.BaseSystemTest;
import com.thesis.projectopportunities.dto.ProjectDto;
import com.thesis.projectopportunities.dto.ProjectPositionDto;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.apache.http.HttpStatus;
import org.flywaydb.test.junit5.annotation.FlywayTestExtension;
import org.junit.jupiter.api.Test;

@FlywayTestExtension
class PositionTest extends BaseSystemTest {

	@Test
	void test_add_new_position() {
		RestAssured.given().get("/projects/1").then()
			.statusCode(HttpStatus.SC_OK)
			.body("projectPositions.size()", is(2));


		RestAssured.given().header("role", "ROLE_ADMIN_CLIENT")
			.body(constructNewPosition()).contentType(ContentType.JSON)
			.post("/positions").then().statusCode(HttpStatus.SC_CREATED);

		RestAssured.given().get("/projects/1").then()
			.statusCode(HttpStatus.SC_OK)
			.body("projectPositions.size()", is(3));
	}

	@Test
	void test_add_new_position_forbidden() {
		RestAssured.given().body(constructNewPosition()).contentType(ContentType.JSON)
			.post("/positions").then()
			.statusCode(HttpStatus.SC_FORBIDDEN);
	}

	private ProjectPositionDto constructNewPosition() {
		ProjectPositionDto position = new ProjectPositionDto();

		position.setPositionId(100);
		position.setPostDate(LocalDateTime.now());
		position.setSeniorityName("INTERN");
		position.setRoleName("SOFTWARE_ENGINEER");
		position.setStartDate(LocalDateTime.now());
		position.setFarming(100);
		position.setNumberOfOpenPositions(2);

		ProjectDto project = RestAssured.given().get("/projects/1").then()
			.extract().jsonPath().getObject("$", ProjectDto.class);

		position.setProjectId(project.getId());
		return position;
	}
}
