import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Subscription } from '../model/subscription.model';

@Injectable({
	providedIn: 'root'
})
export class SubscriptionService {

	private readonly baseUrl = 'http://localhost:8080/subscriptions';

	constructor(private readonly http: HttpClient) { }

	addSubscription(subscription: Subscription) {
		return this.http.post<Subscription>(`${this.baseUrl}`, subscription)
	}

	deleteSubscription(username: string) {
		return this.http.delete<Subscription>(`${this.baseUrl}/${username}`)
	}


}
