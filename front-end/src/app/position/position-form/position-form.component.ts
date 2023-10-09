import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject, take, takeUntil } from 'rxjs';

import { Project } from '../../model/project.model';
import { ProjectPosition } from '../../model/project-position.model';
import { ProjectService } from '../../services/project.service';
import { RoleService } from '../../services/role.service';
import { SeniorityService } from '../../services/seniority.service';
import { UnderscorePipe } from '../../util/underscore.pipe';

@Component({
	selector: 'app-position-form',
	templateUrl: './position-form.component.html',
	styleUrls: ['./position-form.component.scss']
})
export class PositionFormComponent implements OnInit, AfterViewInit, OnDestroy {
	@Input() submitButtonText = 'Submit';
	@Output() submitForm = new EventEmitter<ProjectPosition>;
	@Input() cancelForm!: EventEmitter<void>;

	@Input()
	get defaultPosition(): ProjectPosition | null {return this._defaultPosition ?? null}

	set defaultPosition(position: ProjectPosition) {
		this._defaultPosition = position;
		this.updateForm();
	}

	private _defaultPosition!: ProjectPosition;


	protected projects: Project[] = [];
	public projectFilterCtrl = new FormControl<string>('');
	public filteredProjects: ReplaySubject<Project[]> = new ReplaySubject<Project[]>(1);
	@ViewChild('projectSelect', { static: true }) projectSelect!: MatSelect;
	selectedProject!: Project;

	protected _onDestroy = new Subject<void>();

	public roles: string[] = []
	selectedRole!: string;

	public seniorities: string[] = [];
	selectedSeniority!: string;

	public numberOfOpenPositions!: number;

	public farming!: number;

	positionStartDate!: Date;
	positionForm: FormGroup;

	constructor(
		private readonly projectService: ProjectService, private readonly seniorityService: SeniorityService,
		private readonly roleService: RoleService, private readonly formBuilder: FormBuilder,
		private readonly pipe: UnderscorePipe
	) {
		this.positionForm = this.formBuilder.group({
			project: ['', Validators.required],
			role: [this.defaultPosition?.roleName ?? '', Validators.required],
			seniority: [this.defaultPosition?.seniorityName ?? '', Validators.required],
			date: [this.defaultPosition?.startDate ?? '', Validators.required],
			number: [this.defaultPosition?.numberOfOpenPositions ?? '', Validators.required],
			farming: [this.defaultPosition?.farming ?? '', Validators.required]
		})

		this.setProject(this.defaultPosition?.projectId ?? -1);
	}

	ngAfterViewInit(): void {
		this.setInitialValue();
		this.updateForm();
	}

	updateForm() {
		if (this._defaultPosition) {
			this.positionForm.setValue({
				project: ['', Validators.required],
				role: this.pipe.transform(this._defaultPosition.roleName),
				seniority: this.pipe.transform(this._defaultPosition.seniorityName),
				date: this._defaultPosition.startDate,
				number: this._defaultPosition.numberOfOpenPositions,
				farming: this._defaultPosition.farming
			})

			this.setProject(this._defaultPosition.projectId)
		}
	}

	ngOnDestroy(): void {
		this._onDestroy.next();
		this._onDestroy.complete();
	}

	ngOnInit(): void {
		this.getRoles();
		this.getSeniorities();
		this.projectService.getProjects().subscribe(value => {
			this.projects = value;
			this.filteredProjects.next(this.projects.slice());
			this.projectFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() =>
				this.projectService.filterProjects(this.projects, this.filteredProjects, this.projectFilterCtrl))
		})

	}

	private setInitialValue() {
		this.filteredProjects.pipe(take(1), takeUntil(this._onDestroy)).subscribe(() => {
			this.projectSelect.compareWith = (a: Project, b: Project) => a && b && a.id === b.id;
		})
	}

	private getSeniorities() {
		this.seniorityService.getSeniorities().subscribe(value => this.seniorities = value);
	}

	private getRoles() {
		this.roleService.getAllRoles().subscribe(value => this.roles = value);
	}

	private setProject(id: number) {
		if (id === -1) {
			this.positionForm.controls['project'].setValue('');
		}
		else {
			this.projectService.getProjectById(id).subscribe(
				result => this.positionForm.controls['project'].setValue(result));
		}

	}

	submit() {
		const position = new ProjectPosition();

		this.defaultPosition?.positionId && (position.positionId = this.defaultPosition.positionId)
		position.postDate = new Date();
		position.seniorityName = this.selectedSeniority.toUpperCase();
		position.roleName = this.selectedRole.toUpperCase().replaceAll(' ', '_');
		position.projectId = this.selectedProject.id;
		position.startDate = this.positionStartDate;
		position.numberOfOpenPositions = this.numberOfOpenPositions;
		position.farming = this.farming;

		this.submitForm.next(position);
	}

}
