package com.thesis.projectopportunities.endpoints;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import com.thesis.projectopportunities.BaseSystemTest;
import com.thesis.projectopportunities.dto.ProjectDto;
import com.thesis.projectopportunities.dto.ProjectPositionDto;
import com.thesis.projectopportunities.enums.RoleEnum;
import com.thesis.projectopportunities.enums.SeniorityEnum;
import com.thesis.projectopportunities.enums.UnitEnum;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.apache.http.HttpStatus;
import org.flywaydb.test.junit5.annotation.FlywayTestExtension;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

@FlywayTestExtension
class ProjectTest extends BaseSystemTest {

	@Test
	void test_getting_all_projects() {
		List<ProjectDto> values = RestAssured.given().get("/projects").then()
			.statusCode(HttpStatus.SC_OK).extract().jsonPath().getList("$", ProjectDto.class);


		Assertions.assertEquals(3, values.size());
		//TODO: FIX TEST
		Assertions.assertTrue(values.stream().anyMatch(value -> value.getName().equals("test")));
	}

	@Test
	void test_get_project_by_id() {
		//TODO: CHANGE PROJECT NAME FROM TEST
		RestAssured.given().get("/projects/1").then()
			.statusCode(HttpStatus.SC_OK)
			.body("id", equalTo(1))
			.body("name", equalTo("test"))
			.body("technologies", equalTo("Java, Angular"))
			.body("projectPositions.size()", is(2));
	}

	@Test
	void test_get_non_existent_project_by_id() {
		RestAssured.given().get("/projects/100").then()
			.statusCode(HttpStatus.SC_NOT_FOUND);
	}

	@Test
	void test_add_new_project() {
		RestAssured.given().get("/projects").then().body("size()", is(3));

		RestAssured.given().header("role", "ROLE_ADMIN_CLIENT")
			.body(constructNewProject()).contentType(ContentType.JSON)
			.post("/projects").then()
			.statusCode(HttpStatus.SC_CREATED);

		RestAssured.given().get("/projects").then().body("size()", is(4));

	}

	@Test
	void test_add_new_project_forbidden() {
		RestAssured.given().body(constructNewProject()).contentType(ContentType.JSON)
			.post("/projects").then()
			.statusCode(HttpStatus.SC_FORBIDDEN);
	}

	private ProjectDto constructNewProject() {
		ProjectDto newProject = new ProjectDto();

		newProject.setName("test");
		newProject.setDescription("test");
		newProject.setTechnologies("test, test2");
		newProject.setId((long) 10);
		newProject.setCreationDate(LocalDateTime.now());
		newProject.setUnitName(UnitEnum.GROWTH_MARKETS.getLiteral());

		ProjectPositionDto position = new ProjectPositionDto();

		position.setPositionId(1);
		position.setPostDate(LocalDateTime.now());
		position.setRoleName(RoleEnum.PROJECT_MANAGER.toString());
		position.setSeniorityName(SeniorityEnum.JUNIOR.toString());

		newProject.setProjectPositions(Set.of(position));

		return newProject;
	}
}
