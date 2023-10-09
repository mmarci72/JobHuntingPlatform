import { Component, EventEmitter, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ProjectPosition } from '../../model/project-position.model';
import { PositionService } from '../../services/position.service';


@Component({
	selector: 'app-new-position',
	templateUrl: './new-position.component.html',
	styleUrls: ['./new-position.component.scss']
})
export class NewPositionComponent {

	submitButtonText = 'Upload';
	@Input() refreshTable!: EventEmitter<void>;

	constructor(
		private readonly positionService: PositionService, private readonly snackBar: MatSnackBar) {

	}

	addPosition(position: ProjectPosition) {


		this.positionService.addPosition(position)
			.subscribe(() => {
				this.refreshTable.emit();
				this.snackBar.open('Position saved successfully', 'Ok', { duration: 2000 });
			});
	}

}
