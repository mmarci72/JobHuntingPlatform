import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { ProjectPosition } from "../model/project-position.model";
import { BaseService } from "./base.service";

@Injectable({
	providedIn: "root",
})
export class PositionService extends BaseService {
	constructor(private readonly http: HttpClient) {
		super();
	}

	addPosition(position: ProjectPosition) {
		return this.http.post<ProjectPosition>(this.baseUrl, position);
	}

	getPositionById(id: number) {
		return this.http.get<ProjectPosition>(`${this.baseUrl}/${id}`);
	}

	deletePosition(id: number) {
		return this.http.delete(`${this.baseUrl}/${id}`);
	}

	patchPosition(position: ProjectPosition) {
		return this.http.patch(`${this.baseUrl}/${position.positionId}`, position);
	}
}
