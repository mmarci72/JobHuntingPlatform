package com.thesis.projectopportunities.service;

import java.io.IOException;
import java.net.URI;
import java.util.concurrent.atomic.AtomicBoolean;

import com.thesis.projectopportunities.model.User;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
@RequiredArgsConstructor
public class KeycloakService {

	@Value("${keycloak.server.url}")
	private String server;

	private static final String REALM = "job-portal";

	private static final String ADMIN_CLIENT = """
		[
		    {
		        "id": "c86f7d3d-6d66-4baa-bddf-6a6bcc06f225",
		        "name": "ADMIN_CLIENT",
		        "description": "",
		        "composite": false,
		        "clientRole": true,
		        "containerId": "0273e652-3dfc-4a3e-bc00-8a1f53686397",
		        "attributes": {}
		    }
		]
		""";

	private static final String ADMIN = """
		[
		    {
		        "id": "31891c38-1d76-4e20-8b16-26af0976a2e6",
		        "name": "ADMIN",
		        "description": "",
		        "composite": false,
		        "clientRole": false,
		        "containerId": "c393aee6-e5af-4664-bac4-1f0986b0ba2a",
		        "attributes": {}
		    }
		]
		        """;

	private static final String PREFIX = "admin/realms/";

	private static final String USER_ENDPOINT = "/users/";

	private String accessToken;


	@Setter(onMethod_ = @Autowired)
	private RestTemplate restTemplate;

	public boolean isAdmin(User user) throws IOException {
		accessToken = authAdmin();

		HttpHeaders headers = setupHeaders();
		HttpEntity<Object> httpEntity = new HttpEntity<>("body", headers);

		String userId = getUserId(user.getUsername());
		String clientId = getClientId();

		ResponseEntity<String> responseEntity =
			restTemplate.exchange(server + PREFIX + REALM + USER_ENDPOINT + userId + "/role-mappings/clients/" + clientId,
				HttpMethod.GET,
				httpEntity,
				String.class);

		JsonNode jsonNode = new ObjectMapper().readTree(responseEntity.getBody());
		AtomicBoolean isAdmin = new AtomicBoolean(false);
		jsonNode.forEach(role -> {
			if (role.get("name").asText().equals("ADMIN_CLIENT")) {
				isAdmin.set(true);
			}
		});
		return isAdmin.get();
	}

	public void addAdminRole(User user) throws IOException {
		accessToken = authAdmin();
		HttpHeaders headers = setupHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<Object> httpEntity = new HttpEntity<>(ADMIN_CLIENT, headers);

		String userId = getUserId(user.getUsername());
		String clientId = getClientId();
		restTemplate.postForEntity(server + PREFIX + REALM + USER_ENDPOINT + userId +
			"/role-mappings/clients/" + clientId, httpEntity, String.class);

		httpEntity = new HttpEntity<>(ADMIN, headers);

		restTemplate.postForEntity(server + PREFIX + REALM + USER_ENDPOINT + userId +
			"/role-mappings/realm", httpEntity, String.class);
	}

	private String getClientId() throws IOException {
		HttpHeaders headers = setupHeaders();
		HttpEntity<Object> httpEntity = new HttpEntity<>("body", headers);

		ResponseEntity<String> responseEntity =
			restTemplate.exchange(server + PREFIX + REALM + "/clients?clientId=job-portal", HttpMethod.GET,
				httpEntity,
				String.class);
		JsonNode jsonNode = new ObjectMapper().readTree(responseEntity.getBody());
		return jsonNode.get(0).get("id").asText();
	}

	private String getUserId(String username) throws IOException, HttpClientErrorException {
		HttpHeaders headers = setupHeaders();
		HttpEntity<Object> httpEntity = new HttpEntity<>("body", headers);

		ResponseEntity<String> responseEntity =
			restTemplate.exchange(server + PREFIX + REALM + "/users?username=" + username, HttpMethod.GET,
				httpEntity,
				String.class);
		JsonNode jsonNode = new ObjectMapper().readTree(responseEntity.getBody());
		return jsonNode.get(0).get("id").asText();
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

	private HttpHeaders setupHeaders() {
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer " + accessToken);
		return headers;
	}
}
