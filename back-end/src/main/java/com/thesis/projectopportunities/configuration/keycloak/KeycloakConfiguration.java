package com.thesis.projectopportunities.configuration.keycloak;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Configuration
@Slf4j
@RequiredArgsConstructor
public class KeycloakConfiguration {

	@Value("${keycloak.server.url}")
	private String server;

	private static final String REALM = "job-portal";

	private String accessToken;


	@Setter(onMethod_ = @Autowired)
	private RestTemplate restTemplate;

	@PostConstruct
	public void setupKeycloak() throws IOException {
		accessToken = authAdmin();

		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer " + accessToken);
		HttpEntity<Object> httpEntity = new HttpEntity<>("body", headers);

		try {
			restTemplate.exchange(server + "admin/realms/" + REALM + "/clients?clientId=job-portal", HttpMethod.GET,
				httpEntity,
				String.class);
		} catch (HttpClientErrorException e) {
			createRealm();
		}
	}

	private void createRealm() throws IOException, NullPointerException {
		ClassLoader classLoader = getClass().getClassLoader();
		var resource = classLoader.getResource("static/realm.json");
		if (resource == null) {
			LOGGER.error("The realm.json file could not be found");
			throw new ResourceNotFoundException("realm.json could not be found");
		}
		ObjectMapper mapper = new ObjectMapper();
		JsonNode json;
		try (InputStream is = resource.openStream()) {
			json = mapper.readValue(is, JsonNode.class);
		}
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer " + accessToken);
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<Object> httpEntity = new HttpEntity<>(json.toPrettyString(), headers);

		restTemplate.postForEntity(server + "/admin/realms", httpEntity, String.class);
	}

	public String authAdmin() throws IOException {
		UriComponentsBuilder builder = UriComponentsBuilder.newInstance();
		builder.uri(URI.create(server));
		builder.path("realms/master/protocol/openid-connect/token");
		HttpHeaders headers = new HttpHeaders();

		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

		MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
		body.set("username", "user");
		body.set("password", "admin");
		body.set("client_id", "admin-cli");
		body.set("grant_type", "password");

		HttpEntity<Object> httpEntity = new HttpEntity<>(body, headers);
		ResponseEntity<String> responseEntity =
			restTemplate.postForEntity(builder.toUriString(), httpEntity,
				String.class);
		JsonNode jsonNode = new ObjectMapper().readTree(responseEntity.getBody());
		return jsonNode.get("access_token").asText();

	}
}
