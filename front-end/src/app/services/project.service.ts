import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable, ReplaySubject } from "rxjs";

import { Project } from "../model/project.model";
import { BaseService } from "./base.service";

@Injectable({
	providedIn: "root",
})
export class ProjectService extends BaseService {
	constructor(private readonly http: HttpClient) {
		super();
	}

	getProjects(): Observable<Project[]> {
		return this.http.get<Project[]>(`${this.baseUrl}`);
	}

	getProjectById(id: number): Observable<Project> {
		return this.http.get<Project>(`${this.baseUrl}/${id}`);
	}

	addProject(project: Project) {
		return this.http.post<Project>(`${this.baseUrl}`, project);
	}

	filterProjects(
		projects: Project[],
		filteredProjects: ReplaySubject<Project[]>,
		projectFilterCtrl: FormControl<string | null>,
	) {
		if (!projects) {
			return;
		}
		let search = projectFilterCtrl.value;
		if (!search) {
			filteredProjects.next(projects.slice());
			return;
		} else {
			search = search.toLowerCase();
		}

		filteredProjects.next(projects.filter((project) => project.name.toLowerCase().indexOf(search ?? "") > -1));
	}
}
