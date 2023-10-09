package com.thesis.projectopportunities.endpoints;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;

import java.time.LocalDateTime;
import java.util.List;

import com.thesis.projectopportunities.BaseSystemTest;
import com.thesis.projectopportunities.dto.CommentDto;
import com.thesis.projectopportunities.dto.ProjectPositionDto;
import com.thesis.projectopportunities.model.Project;
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
class CommentTest extends BaseSystemTest {

	@BeforeEach
	void setUpUserRepo() {
		User user = new User();
		//TODO: Replace with real values
		user.setCareerCoach("un=Test User,ou=contacts,o=company,c=ch");
		user.setFullName("Marcell Újvári");

		User careerCoach = new User();
		careerCoach.setEmail("test@asd.com");
		careerCoach.setFullName("Test User");

		Mockito.when(userRepo.findByUsername("ujvarim")).thenReturn(user);
		Mockito.when(userRepo.findByFullName("Test User")).thenReturn(careerCoach);
	}


	@Test
	void test_getting_all_comments() {
		List<CommentDto> comments = RestAssured.given().get("/comments").then()
			.statusCode(HttpStatus.SC_OK).extract().jsonPath()
			.getList("$", CommentDto.class);

		Assertions.assertEquals(3, comments.size());
		Assertions.assertTrue(comments.stream().anyMatch(comment -> comment.getData()
			.equals("I really enjoy working on this project")));

	}

	@Test
	void test_getting_comment_by_comment_id() {
		RestAssured.given().get("/comments/1").then()
			.statusCode(HttpStatus.SC_OK)
			.body("id", equalTo(1))
			.body("data", equalTo("I can only recommend this project"));
	}

	@Test
	void test_getting_non_existent_comment_by_id() {
		RestAssured.given().get("/comments/100").then()
			.statusCode(HttpStatus.SC_NOT_FOUND);
	}

	@Test
	void test_getting_comments_by_position_id() {
		List<CommentDto> comments =
			RestAssured.given().get("/positions/1/comments").then()
				.statusCode(HttpStatus.SC_OK)
				.extract().jsonPath().getList("$", CommentDto.class);

		Assertions.assertEquals(1, comments.size());
		Assertions.assertTrue(
			comments.stream().anyMatch(comment -> comment.getData().equals("I can only recommend this project")));
	}

	@Test
	void test_getting_comments_non_existent_project_id() {
		RestAssured.given().get("/positions/100/comments").then()
			.statusCode(HttpStatus.SC_OK)
			.body("size()", is(0));
	}

	@Test
	void test_adding_new_comment() {
		RestAssured.given().body(constructNewComment()).contentType(ContentType.JSON)
			.post("/comments").then()
			.statusCode(HttpStatus.SC_OK);
	}

	private CommentDto constructNewComment() {
		CommentDto comment = new CommentDto();

		comment.setData("test");
		comment.setId(10);

		ProjectPositionDto position = new ProjectPositionDto();
		position.setPositionId(1);
		position.setStartDate(LocalDateTime.now());
		position.setSeniorityName("test");
		position.setRoleName("test");
		position.setFarming(100);
		position.setNumberOfOpenPositions(1);

		Project project = new Project();

		project.setId((long) 1);
		project.setName("test");


		comment.setPosition(position);
		comment.setUsername("ujvarim");
		comment.setCreationDate(LocalDateTime.now());

		return comment;
	}
}
