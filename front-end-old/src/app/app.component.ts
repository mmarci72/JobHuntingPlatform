import { Component } from '@angular/core';

import { AuthService } from './services/authentication.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'ProjectOpportunities';

	constructor(
		private readonly authService: AuthService
	) {
	}

	public async saveUser() {
		await this.authService.saveUser();
	}


	public async login() {
		await this.authService.login();
	}

	public logout(): void {
		this.authService.logout();
	}
}
