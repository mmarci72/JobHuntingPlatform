import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Preference} from '../model/preference.model';
import {BaseService} from "./base.service";

@Injectable({
	providedIn: 'root'
})
export class PreferenceService extends BaseService {

	constructor(private readonly http: HttpClient) {
		super()
	}

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
