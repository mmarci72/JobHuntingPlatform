import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Interests } from "../model/interests.model";
import { BaseService } from "./base.service";

@Injectable({
	providedIn: "root",
})
export class InterestsService extends BaseService {
	constructor(private readonly http: HttpClient) {
		super();
	}

	getInterests() {
		return this.http.get<Interests[]>(`${this.baseUrl}`);
	}

	getInterestsByUsername(username: string) {
		return this.http.get<Interests[]>(`${this.baseUrl}/${username}`);
	}

	addNewInterest(interests: Interests) {
		return this.http.post<Interests>(`${this.baseUrl}`, interests);
	}
}
