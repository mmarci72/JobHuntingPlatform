import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Unit } from '../model/unit.model';

@Injectable({
	providedIn: 'root'
})
export class UnitService {

	constructor(private readonly http: HttpClient) { }

	getAllUnits() {
		return this.http.get<Unit[]>('http://localhost:8080/units')
	}

}
