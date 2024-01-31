import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Project } from '../../model/project.model';
import { ProjectService } from '../../services/project.service';

@Component({
	selector: 'app-project-card',
	templateUrl: './project-card.component.html',
	styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {
	projects: Project[] | undefined;

	projectsWithNumberOfPosition: { project: Project, count: number }[] = [];

	@Output() filterEvent: EventEmitter<Project> = new EventEmitter<Project>();
	includeProjectWithoutPositions = false;

	constructor(private readonly projectService: ProjectService) {
	}

	ngOnInit() {
		this.getProjects();
	}

	private getProjects() {
		return this.projectService.getProjects().subscribe(data => {

			const projects = [...data]
				.sort((a, b) => b.projectPositions.length - a.projectPositions.length);

			projects.forEach(project =>
				this.projectsWithNumberOfPosition.push({ project: project, count: this.countPositions(project) }))
		});
	}

	private countPositions(project: Project) {
		let count = 0;

		project.projectPositions.forEach(position => count += position.numberOfOpenPositions);

		return count;
	}

	filterProject(project: Project) {
		this.filterEvent.emit(project);
	}

	changePreference() {
		this.includeProjectWithoutPositions = !this.includeProjectWithoutPositions
	}
}
