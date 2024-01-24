import { EventEmitter, Injectable } from "@angular/core";
import { SwPush } from "@angular/service-worker";
import { catchError } from "rxjs";

import { Subscription } from "../model/subscription.model";
import { User } from "../model/user.model";
import { SessionStorageService } from "./session-storage.service";
import { SubscriptionService } from "./subscription.service";

@Injectable({
	providedIn: "root",
})
export class PushNotificationService {
	readonly VAPID_PUBLIC_KEY = "BIBNay01p51hwUeeGIwIhvQhQS_J9t1eP4iiFMjTyCTFdo1PwgikZ6JxJydpHaXXQ9MntT_K6eLJx2nOd6Bkb-4";
	user!: User;

	constructor(
		private readonly swPush: SwPush,
		private readonly subscriptionService: SubscriptionService,
		private readonly sessionStorageService: SessionStorageService,
	) {}

	async generateSubscription() {
		this.user = await this.sessionStorageService.getUser();

		const subscription = new Subscription();

		const subscriptionEvent: EventEmitter<void> = new EventEmitter<void>();

		console.log(this.user);

		this.swPush
			.requestSubscription({ serverPublicKey: this.VAPID_PUBLIC_KEY })
			.then((sub) => {
				subscription.username = this.user.username;

				subscription.pushSubscription = sub;

				this.subscriptionService
					.addSubscription(subscription)
					.pipe(
						catchError((err) => {
							console.error(err);
							throw new Error("Saving the subscription was unsuccessful");
						}),
					)
					.subscribe(() => subscriptionEvent.next());
			})
			.catch((err) => {
				console.error(err);
				throw new Error("Error while generating new subscription");
			});

		return subscriptionEvent;
	}
}
