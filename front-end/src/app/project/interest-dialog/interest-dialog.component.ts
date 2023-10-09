import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Interests } from '../../model/interests.model';
import { InterestsService } from '../../services/interests.service';
import { SessionStorageService } from '../../services/session-storage.service';


@Component({
	selector: 'app-interest-dialog',
	templateUrl: './interest-dialog.component.html',
	styleUrls: ['./interest-dialog.component.scss']
})
export class InterestDialogComponent {
	constructor(
		private readonly interestsService: InterestsService,
		private readonly sessionStorageService: SessionStorageService,
		@Inject(MAT_DIALOG_DATA) public data: { positionId: number, refresh: () => void },
	) {
	}


	async sendInterest(): Promise<void> {
		const interest = new Interests();
		const user = await this.sessionStorageService.getUser();
		interest.username = user.username;
		interest.positionId = this.data.positionId;
		this.interestsService.addNewInterest(interest).subscribe(() => this.data.refresh());
	}
}
