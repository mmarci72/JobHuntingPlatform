import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { UserNotification } from "../model/user-notification.model";
import { BaseService } from "./base.service";

@Injectable({
	providedIn: "root",
})
export class UserNotificationService extends BaseService {
	constructor(private readonly http: HttpClient) {
		super();
	}

	changeNotification(userNotification: UserNotification) {
		return this.http.patch<UserNotification>(`${this.baseUrl}/${userNotification.username}`, userNotification);
	}

	getPreferences(username: string) {
		return this.http.get<UserNotification>(`${this.baseUrl}/${username}`);
	}
}
