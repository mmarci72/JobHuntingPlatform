import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Project } from '../../model/project.model';
import { Unit } from '../../model/unit.model';
import { ProjectService } from '../../services/project.service';
import { UnitService } from '../../services/unit.service';

@Component({
	selector: 'app-new-project-form',
	templateUrl: './new-project-form.component.html',
	styleUrls: ['./new-project-form.component.scss']
})
export class NewProjectFormComponent implements OnInit {
	projectName!: string;
	projectDescription!: string;
	projectCreationDate!: Date;
	projectTechnologies!: string;
	selectedUnit!: string;

	projectForm: FormGroup;

	units: Unit[] = [];

	constructor(
		private readonly projectService: ProjectService, private readonly router: Router,
		private readonly unitService: UnitService, private readonly formBuilder: FormBuilder
	) {
		this.projectForm = this.formBuilder.group({
			name: ['', Validators.required],
			description: ['', Validators.required],
			technologies: ['', Validators.required],
			unit: ['', Validators.required],
			date: ['', Validators.required],
		})
	}

	addProject() {
		const project = new Project();

		project.creationDate = this.projectCreationDate;
		project.name = this.projectName;
		project.technologies = this.projectTechnologies;
		project.description = this.projectDescription;
		project.unitName = this.selectedUnit

		console.log(typeof project.unitName)

		this.projectService.addProject(project).subscribe(() => this.router.navigate(['/projects']));


	}

	ngOnInit() {
		this.getUnits();
	}

	private getUnits() {
		this.unitService.getAllUnits().subscribe(value => this.units = value);
	}
}
