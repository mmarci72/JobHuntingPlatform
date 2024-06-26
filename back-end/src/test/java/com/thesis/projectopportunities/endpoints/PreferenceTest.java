package com.thesis.projectopportunities.endpoints;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;

import java.util.List;

import com.thesis.projectopportunities.BaseSystemTest;
import com.thesis.projectopportunities.model.Preference;
import com.thesis.projectopportunities.model.SettingsPreference;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.apache.http.HttpStatus;
import org.flywaydb.test.junit5.annotation.FlywayTestExtension;
import org.junit.jupiter.api.Test;

@FlywayTestExtension
class PreferenceTest extends BaseSystemTest {

	@Test
	void TestGettingPreferencesForUser() {
		RestAssured.given()
			.body(constructPreference()).contentType(ContentType.JSON)
			.post("/preferences").then().statusCode(HttpStatus.SC_OK);

		RestAssured.given()
			.get("/preferences/ujvarim").then()
			.statusCode(HttpStatus.SC_OK).body("userId", is("ujvarim"));
	}

	@Test
	void TestPostNewPreference() {
		RestAssured.given().body(constructPreference())
			.contentType(ContentType.JSON)
			.post("/preferences").then().statusCode(HttpStatus.SC_OK);
	}

	@Test
	void TestPatchPreference() {
		var preference = constructPreference();
		RestAssured.given().body(constructPreference())
			.contentType(ContentType.JSON).then()
			.statusCode(HttpStatus.SC_OK);

		RestAssured.given().body(preference)
			.contentType(ContentType.JSON)
			.patch("/preferences/ujvarim").then()
			.body("preferences.seniorities", hasSize(2));
	}

	private Preference constructPreference() {
		Preference preference = new Preference();

		preference.setUserId("ujvarim");

		SettingsPreference settingsPreference = new SettingsPreference();

		settingsPreference.setSeniorities(List.of("Senior", "Intern"));

		preference.setPreferences(settingsPreference);

		return preference;
	}


}
