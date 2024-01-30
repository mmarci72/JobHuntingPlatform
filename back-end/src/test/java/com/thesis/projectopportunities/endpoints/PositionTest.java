package com.thesis.projectopportunities.endpoints;

import static org.hamcrest.Matchers.is;

import java.time.LocalDateTime;

import com.thesis.projectopportunities.BaseSystemTest;
import com.thesis.projectopportunities.dto.CompanyDto;
import com.thesis.projectopportunities.dto.PositionDto;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.apache.http.HttpStatus;
import org.flywaydb.test.junit5.annotation.FlywayTestExtension;
import org.junit.jupiter.api.Test;

@FlywayTestExtension
class PositionTest extends BaseSystemTest {

	@Test
	void test_add_new_position() {
		RestAssured.given().get("/companies/1").then()
			.statusCode(HttpStatus.SC_OK)
			.body("positions.size()", is(2));


		RestAssured.given().header("role", "ROLE_ADMIN_CLIENT")
			.body(constructNewPosition()).contentType(ContentType.JSON)
			.post("/positions").then().statusCode(HttpStatus.SC_CREATED);

		RestAssured.given().get("/companies/1").then()
			.statusCode(HttpStatus.SC_OK)
			.body("positions.size()", is(3));
	}

	@Test
	void test_add_new_position_forbidden() {
		RestAssured.given().body(constructNewPosition()).contentType(ContentType.JSON)
			.post("/positions").then()
			.statusCode(HttpStatus.SC_FORBIDDEN);
	}

	private PositionDto constructNewPosition() {
		PositionDto position = new PositionDto();

		position.setPositionId(100);
		position.setPostDate(LocalDateTime.now());
		position.setSeniorityName("INTERN");
		position.setRoleName("SOFTWARE_ENGINEER");
		position.setStartDate(LocalDateTime.now());

		CompanyDto project = RestAssured.given().get("/companies/1").then()
			.extract().jsonPath().getObject("$", CompanyDto.class);

		position.setCompanyId(project.getId());
		return position;
	}
}
