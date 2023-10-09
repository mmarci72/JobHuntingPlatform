import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class RoleService {

	constructor(private readonly http: HttpClient) { }

	getAllRoles() {
		return this.http.get<string[]>('http://localhost:8080/roles');
	}
}
