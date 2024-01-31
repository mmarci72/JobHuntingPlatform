import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Preference} from '../model/preference.model';
import {BaseService} from "./base.service";

@Injectable({
	providedIn: 'root'
})
export class PreferenceService extends BaseService {

	constructor(private readonly http: HttpClient) {
		super("preferences");
	}

	getPreferencesForUser(username: string) {
		return this.http.get<Preference>(`${this.baseUrl}/${username}`);
	}

	postPreference(preference: Preference) {
		return this.http.post(`${this.baseUrl}`, preference);
	}

	updatePreference(preference: Preference, username: string) {
		return this.http.patch(`${this.baseUrl}/${username}`, preference);
	}
}
