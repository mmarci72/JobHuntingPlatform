import { EventEmitter, Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";

import { KeycloakProfile } from "keycloak-js";

@Injectable({
	providedIn: "root",
})
export class SessionStorageService {
	userSetEvent = new EventEmitter<void>();

	setUser(user: KeycloakProfile) {
		sessionStorage.setItem("user", JSON.stringify(user));
		this.userSetEvent.emit();
	}

	getUserSetEvent() {
		return this.userSetEvent;
	}

	async getUser(): Promise<KeycloakProfile> {
		if (!sessionStorage.getItem("user")) {
			await firstValueFrom(this.userSetEvent);

			const userStr = sessionStorage.getItem("user");
			if (userStr) {
				return JSON.parse(userStr);
			} else {
				throw new Error(`User can't be retrieved`);
			}
		} else {
			const userStr = sessionStorage.getItem("user");
			if (userStr) {
				return JSON.parse(userStr);
			} else {
				throw new Error(`User can't be retrieved`);
			}
		}
	}
}
