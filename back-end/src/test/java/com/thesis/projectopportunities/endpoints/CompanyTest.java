package com.thesis.projectopportunities.endpoints;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;

import java.time.LocalDateTime;
import java.util.List;

import com.thesis.projectopportunities.BaseSystemTest;
import com.thesis.projectopportunities.dto.CompanyDto;
import com.thesis.projectopportunities.dto.PositionDto;
import com.thesis.projectopportunities.enums.SeniorityEnum;
import com.thesis.projectopportunities.enums.IndustryDomainEnum;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.apache.http.HttpStatus;
import org.flywaydb.test.junit5.annotation.FlywayTestExtension;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

@FlywayTestExtension
class CompanyTest extends BaseSystemTest {

	@Test
	void test_getting_all_companies() {
		addCompany();

		List<CompanyDto> values = RestAssured.given().get("/companies").then()
			.statusCode(HttpStatus.SC_OK).extract().jsonPath().getList("$", CompanyDto.class);


		Assertions.assertEquals(4, values.size());
		Assertions.assertTrue(values.stream().anyMatch(value -> value.getName().equals("test")));
	}

	@Test
	void test_get_company_by_id() {
		addCompany();
		RestAssured.given().get("/companies/4").then()
			.statusCode(HttpStatus.SC_OK)
			.body("id", equalTo(4))
			.body("name", equalTo("test"));
	}

	@Test
	void test_get_non_existent_company_by_id() {
		RestAssured.given().get("/companies/100").then()
			.statusCode(HttpStatus.SC_NOT_FOUND);
	}

	@Test
	void test_add_new_company() {
		RestAssured.given().get("/companies").then().body("size()", is(3));

		addCompany();

		RestAssured.given().get("/companies").then().body("size()", is(4));

	}

	@Test
	void test_add_new_company_forbidden() {
		Mockito.when(keycloakService.addRecruiterRole(any())).thenReturn(true);
		RestAssured.given().body(constructNewCompany()).contentType(ContentType.JSON)
			.queryParam("username", "test")
			.post("/companies").then()
			.statusCode(HttpStatus.SC_FORBIDDEN);
	}

	private void addCompany() {
		Mockito.when(keycloakService.addRecruiterRole(any())).thenReturn(true);

		RestAssured.given().header("role", "ROLE_RECRUITER_CLIENT")
			.queryParam("username", "test")
			.body(constructNewCompany()).contentType(ContentType.JSON)
			.post("/companies").then()
			.statusCode(HttpStatus.SC_CREATED);
	}

	private CompanyDto constructNewCompany() {
		CompanyDto newCompany = new CompanyDto();

		newCompany.setName("test");
		newCompany.setId((long) 4);
		newCompany.setCreationDate(LocalDateTime.now());
		newCompany.setIndustryDomain(IndustryDomainEnum.GROWTH_MARKETS);
		newCompany.setFounded(2002);
		newCompany.setSizeMin(50);
		newCompany.setSizeMax(100);
		newCompany.setLogoFileName("test.jpg");

		PositionDto position = new PositionDto();

		position.setPositionId(1);
		position.setPostDate(LocalDateTime.now());
		position.setRoleName("Software Engineer");
		position.setPositionName("Junior Software Engineering");
		position.setSalaryMin(10000000);
		position.setSalaryMax(11000000);
		position.setRequirementsDescription("test");
		position.setPositionDescription("test");
		position.setPositionDescription("test");
		position.setSeniorityName(SeniorityEnum.JUNIOR.toString());
		position.setTechnologies(List.of("Spring", "Angular"));
		position.setLanguages(List.of("English", "Hungarian"));

		newCompany.setPositions(List.of(position));

		return newCompany;
	}
}
