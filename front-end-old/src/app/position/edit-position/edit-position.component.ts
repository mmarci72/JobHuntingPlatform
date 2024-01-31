import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ProjectPosition } from '../../model/project-position.model';
import { PositionService } from '../../services/position.service';

@Component({
	selector: 'app-edit-position',
	templateUrl: './edit-position.component.html',
	styleUrls: ['./edit-position.component.scss']
})
export class EditPositionComponent {
	@Input() positionToEdit!: ProjectPosition
	@Output() positionEditComplete = new EventEmitter<void>;
	cancelForm = new EventEmitter<void>;


	submitButtonText = 'Update';

	constructor(private readonly positionService: PositionService) {
		this.cancelForm.subscribe(() => this.positionEditComplete.emit())
	}

	editPosition(position: ProjectPosition) {
		this.positionService.patchPosition(position).subscribe(() => this.positionEditComplete.emit());
	}
}
