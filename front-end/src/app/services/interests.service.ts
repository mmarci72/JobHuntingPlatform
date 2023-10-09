import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Interests } from '../model/interests.model';

@Injectable({
	providedIn: 'root'
})
export class InterestsService {

	private readonly baseUrl = 'http://localhost:8080/interests'

	constructor(private readonly http: HttpClient) { }

	getInterests() {
		return this.http.get<Interests[]>(`${this.baseUrl}`)
	}

	getInterestsByUsername(username: string) {
		return this.http.get<Interests[]>(`${this.baseUrl}/${username}`)
	}

	addNewInterest(interests: Interests) {
		return this.http.post<Interests>(`${this.baseUrl}`, interests)
	}
}
