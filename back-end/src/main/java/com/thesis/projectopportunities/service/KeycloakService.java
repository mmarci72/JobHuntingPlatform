package com.thesis.projectopportunities.service;

import java.util.List;

import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.ClientRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KeycloakService {

	@Value("${keycloak.server.url}")
	private String server;

	private static final String REALM = "job-portal";

	private static final String CLIENT_ID = "job-portal";

	private static final String CLIENT_ROLE = "RECRUITER_CLIENT";
	private static final String REALM_ROLE = "RECRUITER";

	public boolean isRecruiter(String username) {
		try (Keycloak keycloak = getKeycloakBuilder()) {

			var keycloakRealm = keycloak.realm(REALM);

			String userId = getUserId(keycloakRealm, username);
			var userResource = keycloakRealm.users().get(userId);

			var roleToFind = keycloakRealm.roles().get(REALM_ROLE).toRepresentation();

			return userResource.roles().realmLevel().listAll().stream().anyMatch(roleToFind::equals);
		}
	}

	public boolean addRecruiterRole(String username) {
		try (Keycloak keycloak = getKeycloakBuilder()) {

			var keycloakRealm = keycloak.realm(REALM);

			addClientRole(keycloakRealm, username);
			addRealmRole(keycloakRealm, username);

			return true;
		}

	}

	private Keycloak getKeycloakBuilder() {
		return KeycloakBuilder.builder()
			.serverUrl("http://localhost:8090")
			.realm("master")
			.username("user")
			.password("admin")
			.clientId("admin-cli")
			.build();
	}

	private void addClientRole(RealmResource keycloakRealm, String username) {
		String userId = getUserId(keycloakRealm, username);
		String clientUuid = getClientUUID(keycloakRealm);
		UsersResource usersResource = keycloakRealm.users();

		var userResource = usersResource.get(userId);

		var role = keycloakRealm
			.clients()
			.get(clientUuid)
			.roles()
			.get(CLIENT_ROLE)
			.toRepresentation();


		userResource.roles()
			.clientLevel(clientUuid)
			.add(List.of(role));
	}

	private void addRealmRole(RealmResource keycloakRealm, String username) {
		String userId = getUserId(keycloakRealm, username);

		UsersResource usersResource = keycloakRealm.users();

		var role = keycloakRealm.roles().get(REALM_ROLE).toRepresentation();

		var userResource = usersResource.get(userId);

		userResource.roles().realmLevel().add(List.of(role));
	}

	private String getClientUUID(RealmResource keycloakRealm) {
		ClientRepresentation client = keycloakRealm
			.clients()
			.findByClientId(CLIENT_ID)
			.get(0);

		return client.getId();
	}

	private String getUserId(RealmResource keycloakRealm, String username) {
		UsersResource usersResource = keycloakRealm.users();

		List<UserRepresentation> searchResults = usersResource.search(username);

		if (searchResults.isEmpty()) {
			return null;
		}

		return searchResults.get(0).getId();
	}
}
