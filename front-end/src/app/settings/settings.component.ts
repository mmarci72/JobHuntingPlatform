import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwPush } from '@angular/service-worker';
import { catchError, of } from 'rxjs';

import { User } from '../model/user.model';
import { UserNotification } from '../model/user-notification.model';
import { PushNotificationService } from '../services/push-notification.service';
import { SessionStorageService } from '../services/session-storage.service';
import { SubscriptionService } from '../services/subscription.service';
import { UserNotificationService } from '../services/user-notification.service';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
	userNotification: UserNotification = new UserNotification();
	user!: User

	readonly successString = 'Changes saved!'
	readonly errorString = 'Error saving changes!'

	constructor(
		private readonly userNotificationService: UserNotificationService, private readonly swPush: SwPush,
		private readonly pushNotificationService: PushNotificationService,
		private readonly subscriptionService: SubscriptionService, private readonly snackBar: MatSnackBar,
		private readonly sessionStorageService: SessionStorageService
	) {
	}

	async ngOnInit() {
		this.user = await this.sessionStorageService.getUser();
		this.userNotification.username = this.user.username;
		this.getPreferences();
	}

	private getPreferences() {
		this.userNotificationService.getPreferences(this.userNotification.username ?? '')
			.subscribe(result => {
				if (result) {
					this.userNotification = result;
				}
				else {
					this.userNotification.username = this.user.username;
				}
			})
	}

	emailNotificationChange() {
		this.userNotification.emailNotificationEnabled = !this.userNotification.emailNotificationEnabled;

		this.userNotificationService.changeNotification(this.userNotification).pipe(catchError((err) => {
			this.openSnackBar(this.errorString, 'Ok');
			console.error(err);
			return of(null);
		}))
			.subscribe(() => this.openSnackBar(this.successString, 'Ok')
			);
	}

	pushNotificationChange() {
		this.userNotification.pushNotificationEnabled = !this.userNotification.pushNotificationEnabled;

		this.userNotificationService.changeNotification(this.userNotification).subscribe(async () => {
			if (this.userNotification.pushNotificationEnabled) {

				try {
					const value = await this.pushNotificationService.generateSubscription();
					value.subscribe(() => this.openSnackBar('Changes saved!', 'Ok'))
				}
				catch (e) {
					this.openSnackBar(this.errorString, 'Ok');
				}
			}
			else if (this.user.username) {
				this.subscriptionService.deleteSubscription(this.user.username).pipe(catchError((err) => {
					this.openSnackBar(this.errorString, 'Ok');
					console.error(err);
					return of(null);
				}))
					.subscribe(() => this.openSnackBar(this.successString, 'Ok'));
			}
		});
	}

	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, { duration: 2000 })
	}
}
