import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Subscription } from "../model/subscription.model";
import { BaseService } from "./base.service";

@Injectable({
	providedIn: "root",
})
export class SubscriptionService extends BaseService {
	constructor(private readonly http: HttpClient) {
		super("subscriptions");
	}

	addSubscription(subscription: Subscription) {
		return this.http.post<Subscription>(`${this.baseUrl}`, subscription);
	}

	deleteSubscription(username: string) {
		return this.http.delete<Subscription>(`${this.baseUrl}/${username}`);
	}
}
