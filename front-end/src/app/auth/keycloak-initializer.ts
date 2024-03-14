import { KeycloakOptions, KeycloakService } from "keycloak-angular";
import { from } from "rxjs";

import { AuthService } from "../service/authentication.service";

/**
 *
 * @param keycloak - The service for interacting with keycloak
 * @param authService @description the service that handles authentication
 * @returns Promise<boolean>
 */
export function keycloakInitializer(
  keycloak: KeycloakService,
  authService: AuthService
): () => Promise<boolean> {
  const AUTH_SUCCESS = 4;

  return async () => {
    from(keycloak.keycloakEvents$).subscribe(event => {
      if (event.type === AUTH_SUCCESS) {
        authService.login();
      }
      console.log(event);
    });

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
