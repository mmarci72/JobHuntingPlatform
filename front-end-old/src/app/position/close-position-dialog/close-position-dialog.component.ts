import { Component, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PositionService } from '../../services/position.service';

@Component({
	selector: 'app-close-position-dialog',
	templateUrl: './close-position-dialog.component.html',
	styleUrls: ['./close-position-dialog.component.scss']
})
export class ClosePositionDialogComponent {
	constructor(
		private readonly positionService: PositionService,
		@Inject(MAT_DIALOG_DATA) public data: { positionId: number, deleteEvent: EventEmitter<void> }
	) {
	}


	closePosition(): void {
		this.positionService.deletePosition(this.data.positionId).subscribe(() => this.data.deleteEvent.emit());
	}

	protected readonly close = close;
}
