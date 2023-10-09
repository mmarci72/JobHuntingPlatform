import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Preference } from '../model/preference.model';

@Injectable({
	providedIn: 'root'
})
export class PreferenceService {

	private readonly baseUrl = 'http://localhost:8080';

	constructor(private readonly http: HttpClient) { }

	getPreferencesForUser(username: string) {
		return this.http.get<Preference>(`${this.baseUrl}/preferences/${username}`)
	}

	postPreference(preference: Preference) {
		return this.http.post(`${this.baseUrl}/preferences`, preference)
	}

	updatePreference(preference: Preference, username: string) {
		return this.http.patch(`${this.baseUrl}/preferences/${username}`, preference);
	}
}
