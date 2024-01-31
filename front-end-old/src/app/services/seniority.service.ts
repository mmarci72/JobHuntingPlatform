import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";

@Injectable({
	providedIn: "root",
})
export class SeniorityService extends BaseService {
	constructor(private readonly http: HttpClient) {
		super("seniorities");
	}

	getSeniorities() {
		return this.http.get<string[]>(`${this.baseUrl}`);
	}
}
