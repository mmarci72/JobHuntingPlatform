import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SeniorityService {

	constructor(private readonly http: HttpClient) { }

	getSeniorities() {
		return this.http.get<string[]>(`http://localhost:8080/seniorities`)
	}
}
