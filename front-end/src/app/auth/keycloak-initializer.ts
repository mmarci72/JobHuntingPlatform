import { KeycloakOptions, KeycloakService } from 'keycloak-angular';
import { from } from 'rxjs';

import { AuthService } from '../services/authentication.service';

/**
 *
 * @param keycloak - The service for interacting with keycloak
 * @param authService
 * @returns Promise<boolean>
 */
export function initializer(keycloak: KeycloakService, authService: AuthService): () => Promise<boolean> {

	const AUTH_SUCCESS = 4;

	return async () => {
		from(keycloak.keycloakEvents$).subscribe(event => {
				if (event.type === AUTH_SUCCESS) {
					authService.login();
				}
				console.log(event)
			}
		)


		const options: KeycloakOptions = {
			config: {
				url: 'http://localhost:8090',
				realm: 'project-opportunities',
				clientId: 'project-opportunities'
			},
			initOptions: {
				checkLoginIframe: false
			}
		};
		return keycloak.init(options);
	}


}
