import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";

@Injectable({
	providedIn: "root",
})
export class RoleService extends BaseService {
	constructor(private readonly http: HttpClient) {
		super("roles");
	}

	getAllRoles() {
		return this.http.get<string[]>(`${this.baseUrl}`);
	}
}
