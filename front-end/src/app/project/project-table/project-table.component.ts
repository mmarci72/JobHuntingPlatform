import { Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { bind, omit } from 'lodash';
import * as moment from 'moment';

import { Project } from '../../model/project.model';
import { InterestsService } from '../../services/interests.service';
import { ProjectService } from '../../services/project.service';
import { RoleService } from '../../services/role.service';
import { SeniorityService } from '../../services/seniority.service';
import { SessionStorageService } from '../../services/session-storage.service';
import { UnitService } from '../../services/unit.service';
import { InterestDialogComponent } from '../interest-dialog/interest-dialog.component';

type FlatProject = {
	id: number;
	positionId: number;
	name: string;
	description: string;
	technologies: string;
	creationDate: Date;
	seniorityName: string;
	roleName: string;
	unitName: string;
	numberOfOpenPositions: number;
	farming: number;
	positionStarDate: Date;
	positionPostDate: Date;
	signedUp: boolean;
};


@Component({
	selector: 'app-project-table',
	templateUrl: './project-table.component.html',
	styleUrls: ['./project-table.component.scss']
})
export class ProjectTableComponent implements OnInit {

	@Input() filterEvent: EventEmitter<Project> = new EventEmitter<Project>();

	projects: Project[];
	mappedProjects: FlatProject[] = [];

	seniorities: string[] = [];
	roles: string[] = [];
	units: string[] = [];

	selectedSeniorities: string[] = [];
	selectedRoles: string[] = [];
	selectedUnits: string[] = [];


	filteredProjects: Project[]
	searchText = '';
	dataSource = new MatTableDataSource<FlatProject>()
	displayedColumns: string[] = ['name', 'description', 'postDate', 'startDate', 'technologies', 'seniority', 'role', 'unit',
		'number',
		'farming', 'comments', 'interested'];
	@ViewChild(MatSort, { static: true }) sort!: MatSort;
	@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

	constructor(
		private readonly dialog: MatDialog, readonly interestsService: InterestsService,
		private readonly projectService: ProjectService, private readonly seniorityService: SeniorityService,
		private readonly roleService: RoleService, private readonly unitService: UnitService,
		private readonly sessionStorageService: SessionStorageService
	) {
		this.projects = [];
		this.filteredProjects = this.projects;
		this.getSeniorities();
		this.getRoles();
		this.getUnits();
	}

	private fillMappedProject() {
		this.projects.forEach(project =>
			project.projectPositions.forEach(position => {
				const newObject = omit(project, ['projectPositions']);

				this.mappedProjects.push({
					...newObject,
					seniorityName: position.seniorityName,
					roleName: position.roleName,
					positionPostDate: position.postDate,
					positionStarDate: position.startDate,
					positionId: position.positionId,
					signedUp: false,
					numberOfOpenPositions: position.numberOfOpenPositions,
					farming: position.farming
				})

			})
		);
	}

	ngOnInit() {
		this.getProjects();
		this.dataSource.sort = this.sort;
		const sortState: Sort = { active: 'postDate', direction: 'desc' }
		this.sort.active = sortState.active;
		this.sort.direction = sortState.direction;
		this.sort.sortChange.emit(sortState);
		this.dataSource.paginator = this.paginator;
		this.filter();

		this.dataSource.sortingDataAccessor = (item, property): number | string => {
			switch (property) {
				case 'postDate':
					return item.positionPostDate.valueOf();
				case 'startDate':
					return item.positionStarDate.valueOf();
				case 'name':
					return item.name;
				case 'description':
					return item.description;
				case 'technologies':
					return item.technologies;
				case 'role':
					return item.roleName;
				case 'seniority':
					return item.seniorityName;
				case 'unit':
					return item.unitName;
				case 'number':
					return item.numberOfOpenPositions;
				case 'farming':
					return item.farming;
				default:
					return property;
			}
		};
	}

	filter() {
		this.filterEvent.subscribe(project => {
			this.clearFilters();
			this.dataSource.filter = project.name.toLowerCase().trim()
			this.searchText = project.name;
		});

	}

	async getUserInterests() {
		const username = (await this.sessionStorageService.getUser()).username;

		this.interestsService.getInterestsByUsername(username).subscribe(interests => {
			this.mappedProjects.forEach(project => {
				const mappedProject = interests.find(
					interest => project.positionId === interest.positionId)
				if (mappedProject) {
					project.signedUp = true;
				}
			});
		})

	}


	private getSeniorities() {
		this.seniorityService.getSeniorities()
			.subscribe(seniorities => this.seniorities = seniorities);
	}

	private getRoles() {
		this.roleService.getAllRoles().subscribe(roles => this.roles = roles);
	}

	private getUnits() {
		this.unitService.getAllUnits().subscribe(units => this.units = units.map(unit => unit.name));
	}

	private getProjects() {
		return this.projectService.getProjects().subscribe(data => {
			data.sort((prevProject, curProject) =>
				prevProject.creationDate.valueOf() - curProject.creationDate.valueOf())
			this.filteredProjects = data;
			this.projects = data;
			this.fillMappedProject();
			this.dataSource.data = this.mappedProjects;
			this.getUserInterests().then();
		});
	}

	public searchKey(event: Event) {
		this.searchText = (event.target as HTMLInputElement).value;
		this.dataSource.filter = this.searchText.trim().toLowerCase();
	}

	signUpDialog(positionId: number) {
		this.dialog.open(InterestDialogComponent, {
			data: {
				positionId: positionId,
				refresh: bind(this.getUserInterests, this)
			}
		});
	}

	applySeniorityFilter() {
		if (this.selectedSeniorities.length === 0) {
			this.dataSource.data = this.mappedProjects;
		}
		else {
			this.dataSource.data = this.mappedProjects.filter(project =>
				this.selectedSeniorities.some(seniority =>
					seniority.toUpperCase().replaceAll('_', ' ') === project.seniorityName
				)
			)
		}
	}

	applyUnitFilter() {
		if (this.selectedUnits.length === 0) {
			this.dataSource.data = this.mappedProjects;
		}
		else {
			this.dataSource.data = this.mappedProjects.filter(project =>
				this.selectedUnits.includes(project.unitName)
			)
		}
	}

	applyRoleFilter() {
		if (this.selectedRoles.length === 0) {
			this.dataSource.data = this.mappedProjects;
		}
		else {
			this.dataSource.data = this.mappedProjects.filter(project =>
				this.selectedRoles.some(
					role => role.toUpperCase().replaceAll(' ', '_') === project.roleName
				)
			)
		}

	}

	clearFilters() {
		this.searchText = '';
		this.dataSource.filter = '';
		this.dataSource.data = this.mappedProjects;
		this.selectedUnits = [];
		this.selectedSeniorities = [];
		this.selectedRoles = [];

		const sortState: Sort = { active: 'postDate', direction: 'desc' }
		this.sort.active = sortState.active;
		this.sort.direction = sortState.direction;
		this.sort.sortChange.emit(sortState);

	}

	isNewPosition(project: FlatProject) {
		return moment(project.positionPostDate).isAfter(moment().subtract(24, 'hours'))
	}

	getProjectNameById(project: FlatProject) {
		return this.projects.find(curProject => curProject.id === project.positionId)?.name
	}
}
