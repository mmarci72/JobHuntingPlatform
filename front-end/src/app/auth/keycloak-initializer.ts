import { KeycloakOptions, KeycloakService } from "keycloak-angular";

/**
 *
 * @param keycloak - The service for interacting with keycloak
 * @returns Promise<boolean>
 */
export function keycloakInitializer(
  keycloak: KeycloakService
): () => Promise<boolean> {
  return async () => {
    const options: KeycloakOptions = {
      config: {
        url: "http://localhost:8090",
        realm: "job-portal",
        clientId: "job-portal",
      },
      initOptions: {
        onLoad: "check-sso",
        silentCheckSsoRedirectUri:
          window.location.origin + "/assets/silent-check-sso.html",
      },
    };
    return keycloak.init(options);
  };
}
