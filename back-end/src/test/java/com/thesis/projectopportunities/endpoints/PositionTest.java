package com.thesis.projectopportunities.endpoints;

import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;

import java.time.LocalDateTime;
import java.util.List;

import com.thesis.projectopportunities.BaseSystemTest;
import com.thesis.projectopportunities.dto.CompanyDto;
import com.thesis.projectopportunities.dto.PositionDto;
import com.thesis.projectopportunities.enums.SeniorityEnum;
import com.thesis.projectopportunities.model.CompanyPermission;
import com.thesis.projectopportunities.repo.CompanyPermissionRepo;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.apache.http.HttpStatus;
import org.flywaydb.test.junit5.annotation.FlywayTestExtension;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.context.support.WithSecurityContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@FlywayTestExtension
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
class PositionTest extends BaseSystemTest {

	@MockBean
	CompanyPermissionRepo companyPermissionRepo;

	@Test
	@WithMockUser(username = "test")
	void test_add_new_position() {
		Mockito.when(companyPermissionRepo.existsByCompanyIdAndUsername(any(), any())).thenReturn(true);
		RestAssured.given().get("/companies/1").then()
			.statusCode(HttpStatus.SC_OK)
			.body("positions.size()", is(3));


		RestAssured.given().header("role", "ROLE_RECRUITER_CLIENT")
			.body(constructNewPosition()).contentType(ContentType.JSON)
			.post("/positions").then().statusCode(HttpStatus.SC_CREATED);

		RestAssured.given().get("/companies/1").then()
			.statusCode(HttpStatus.SC_OK)
			.body("positions.size()", is(4));
	}

	@Test
	void test_add_new_position_forbidden() {
		RestAssured.given().body(constructNewPosition()).contentType(ContentType.JSON)
			.post("/positions").then()
			.statusCode(HttpStatus.SC_FORBIDDEN);
	}

	private void addPermissions() {
		CompanyDto company = RestAssured.given().get("/companies/1").then()
			.extract().jsonPath().getObject("$", CompanyDto.class);

		CompanyPermission permission = new CompanyPermission();
		permission.setCompanyId(company.getId());
		permission.setUsername("test");


		RestAssured.given().body(permission).contentType(ContentType.JSON)
			.post("/permissions").then()
			.statusCode(HttpStatus.SC_OK);
	}

	private PositionDto constructNewPosition() {
		PositionDto position = new PositionDto();

		position.setPositionId(4);
		position.setPostDate(LocalDateTime.now());
		position.setRoleName("Software Engineer");
		position.setPositionName("Junior Software Engineering");
		position.setSalaryMin(10000000);
		position.setSalaryMax(11000000);
		position.setRequirementsDescription("test");
		position.setPositionDescription("test");
		position.setResponsibilitiesDescription("test");
		position.setSeniorityName(SeniorityEnum.JUNIOR.toString());
		position.setTechnologies(List.of("Spring", "Angular"));
		position.setLanguages(List.of("English", "Hungarian"));
		position.setStartDate(LocalDateTime.now());

		CompanyDto company = RestAssured.given().get("/companies/1").then()
			.extract().jsonPath().getObject("$", CompanyDto.class);

		position.setCompanyId(company.getId());
		return position;
	}
}
