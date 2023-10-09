import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserNotification } from '../model/user-notification.model';

@Injectable({
	providedIn: 'root'
})
export class UserNotificationService {

	private readonly baseUrl = 'http://localhost:8080/notifications'

	constructor(private readonly http: HttpClient) { }

	changeNotification(userNotification: UserNotification) {
		return this.http.patch<UserNotification>(`${this.baseUrl}/${userNotification.username}`, userNotification)
	}

	getPreferences(username: string) {
		return this.http.get<UserNotification>(`${this.baseUrl}/${username}`)
	}
}
