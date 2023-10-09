import { EventEmitter, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { User } from '../model/user.model';

@Injectable({
	providedIn: 'root'
})
export class SessionStorageService {

	userSetEvent = new EventEmitter<void>

	setUser(user: User) {
		sessionStorage.setItem('user', JSON.stringify(user));
		this.userSetEvent.emit();
	}

	getUserSetEvent() {
		return this.userSetEvent;
	}

	async getUser(): Promise<User> {
		if (!sessionStorage.getItem('user')) {
			await firstValueFrom(this.userSetEvent)

			const userStr = sessionStorage.getItem('user');
			if (userStr) {
				return JSON.parse(userStr);
			}
			else {
				throw new Error(`User can't be retrieved`)
			}
		}
		else {
			const userStr = sessionStorage.getItem('user');
			if (userStr) {
				return JSON.parse(userStr);
			}
			else {
				throw new Error(`User can't be retrieved`)
			}
		}
	}
}
