import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Unit } from "../model/unit.model";
import { BaseService } from "./base.service";

@Injectable({
	providedIn: "root",
})
export class UnitService extends BaseService {
	constructor(private readonly http: HttpClient) {
		super();
	}

	getAllUnits() {
		return this.http.get<Unit[]>(`${this.baseUrl}/units`);
	}
}
