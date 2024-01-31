import { Component, EventEmitter } from '@angular/core';

import { ProjectPosition } from '../../model/project-position.model';

@Component({
	selector: 'app-manage-positions',
	templateUrl: './manage-positions.component.html',
	styleUrls: ['./manage-positions.component.scss']
})
export class ManagePositionsComponent {
	positionToEdit!: ProjectPosition
	isEdit = false;

	refreshTable = new EventEmitter<void>;

	onEditPositionComplete() {
		this.isEdit = false;
		this.refreshTable.emit();
	}

	onEditPosition(position: ProjectPosition) {
		this.positionToEdit = position;
		this.isEdit = true;
	}
}
