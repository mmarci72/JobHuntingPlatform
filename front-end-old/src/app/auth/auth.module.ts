import { APP_INITIALIZER, NgModule } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { AuthService } from '../services/authentication.service';
import { AuthGuard } from './auth.guard';
import { initializer } from './keycloak-initializer';

@NgModule({
	declarations: [],
	imports: [KeycloakAngularModule],
	providers: [
		{
			provide: APP_INITIALIZER,
			useFactory: initializer,
			multi: true,
			deps: [KeycloakService, AuthService]
		},
		AuthGuard,
		AuthService
	]
})
export class AuthModule {}
