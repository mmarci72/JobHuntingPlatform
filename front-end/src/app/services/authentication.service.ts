import { Injectable } from "@angular/core";
import { KeycloakService } from "keycloak-angular";
import { KeycloakProfile, KeycloakTokenParsed } from "keycloak-js";

import { PushNotificationService } from "./push-notification.service";
import { SessionStorageService } from "./session-storage.service";
import { UserNotificationService } from "./user-notification.service";
import { BaseService } from "./base.service";
import { ReplaySubject, Subject } from "rxjs";

@Injectable()
export class AuthService extends BaseService {
	private readonly loggedIn: Subject<boolean> = new ReplaySubject<boolean>(1);

	constructor(
		private readonly keycloakService: KeycloakService,
		private readonly sessionStorageService: SessionStorageService,
		private readonly userNotificationService: UserNotificationService,
		private readonly pushNotificationService: PushNotificationService,
	) {
		super();
	}

	public getLoggedUser(): KeycloakTokenParsed | undefined {
		try {
			return this.keycloakService.getKeycloakInstance().idTokenParsed;
		} catch (e) {
			console.error("Exception", e);
			return undefined;
		}
	}

	public isLoggedIn(): Promise<boolean> {
		return this.keycloakService.isLoggedIn();
	}

	public loadUserProfile(): Promise<KeycloakProfile> {
		return this.keycloakService.loadUserProfile(true);
	}

	public register(): void {
		this.loggedIn.next(true);
	}

	public async login(): Promise<void> {
		this.loggedIn.next(true);
		if (!this.loggedIn.observed) {
			await this.saveUser();
		}
	}

	public async saveUser() {
		let userProfile: KeycloakProfile = await this.loadUserProfile();

		this.sessionStorageService.setUser(userProfile);

		this.userNotificationService.getPreferences(userProfile.username ?? "").subscribe((preference) => {
			if (preference.pushNotificationEnabled) {
				this.pushNotificationService.generateSubscription().then((result) => result.subscribe());
			}
		});
	}

	public logout(): void {
		this.keycloakService.logout(window.location.origin).then(() => this.loggedIn.next(true));
	}

	public redirectToProfile(): void {
		this.keycloakService.getKeycloakInstance().accountManagement();
	}

	public getRoles(): string[] {
		return this.keycloakService.getUserRoles();
	}

	public loginStatusChange() {
		return this.loggedIn.asObservable();
	}
}
