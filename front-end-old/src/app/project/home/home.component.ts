import { Component, EventEmitter } from '@angular/core';

import { Project } from '../../model/project.model';


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {

	filterEvent: EventEmitter<Project> = new EventEmitter<Project>();


	send(project: Project) {
		this.filterEvent.emit(project);
	}
}
