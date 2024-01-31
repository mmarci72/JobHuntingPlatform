import {
	AfterViewInit,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Output,
	ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { ReplaySubject, Subject, take, takeUntil } from 'rxjs';

import { Project } from '../../model/project.model';
import { ProjectPosition } from '../../model/project-position.model';
import { ProjectService } from '../../services/project.service';
import { ClosePositionDialogComponent } from '../close-position-dialog/close-position-dialog.component';

@Component({
	selector: 'app-position-table',
	templateUrl: './position-table.component.html',
	styleUrls: ['./position-table.component.scss']
})
export class PositionTableComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {

	@Output() editPosition = new EventEmitter<ProjectPosition>;
	@Input() refreshTable!: EventEmitter<void>;


	positions!: ProjectPosition[]
	projects!: Project[]
	filteredProjects: ReplaySubject<Project[]> = new ReplaySubject<Project[]>(1);

	selectedProject!: Project | null;
	isProjectSelected = false;

	public projectFilterCtrl = new FormControl<string>('');
	protected _onDestroy = new Subject<void>();

	deleteEvent: EventEmitter<void> = new EventEmitter<void>()

	dataSource = new MatTableDataSource<ProjectPosition>()
	displayedColumns: string[] = ['postDate', 'startDate', 'seniority', 'role', 'number', 'farming', 'close', 'edit'];
	@ViewChild('projectSelect', { static: true }) projectSelect!: MatSelect;

	constructor(
		private readonly projectService: ProjectService, private readonly dialog: MatDialog
	) {
		this.deleteEvent.subscribe(async () => {
			await this.getAllProjects();
		})

	}

	ngOnChanges() {
		if (this.refreshTable) {
			this.refreshTable.subscribe(() => this.getAllProjects())
		}
	}

	ngOnInit() {
		this.getAllProjects().then();
	}

	ngAfterViewInit() {
		this.setInitialValue();
	}

	ngOnDestroy(): void {
		this._onDestroy.next();
		this._onDestroy.complete();
	}

	async getAllProjects() {
		this.projectService.getProjects().subscribe(projects => {
			this.projects = projects
			this.selectedProject = this.projects.find(project => project.id === this.selectedProject?.id) ?? null;
			this.filteredProjects.next(this.projects.slice());
			this.projectFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() =>
				this.projectService.filterProjects(this.projects, this.filteredProjects, this.projectFilterCtrl))
			this.projectChanged();
		});
	}

	projectChanged() {
		if (this.selectedProject) {
			this.isProjectSelected = true;
			this.positions = this.selectedProject.projectPositions;
			this.dataSource.data = this.positions
		}
	}

	private setInitialValue() {
		this.filteredProjects.pipe(take(1), takeUntil(this._onDestroy)).subscribe(() => {
			this.projectSelect.compareWith = (a: Project, b: Project) => a && b && a.id === b.id;
		})
	}

	closePositionDialog(positionId: number) {
		this.dialog.open(ClosePositionDialogComponent, {
			data: {
				positionId: positionId,
				deleteEvent: this.deleteEvent
			}
		});
	}
}
