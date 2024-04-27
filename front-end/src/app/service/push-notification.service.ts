import { EventEmitter, Injectable } from "@angular/core";
import { SwPush } from "@angular/service-worker";
import { KeycloakService } from "keycloak-angular";
import { catchError } from "rxjs";

import { Subscription } from "../model/subscription.model";
import { SubscriptionService } from "./subscription.service";

@Injectable({
  providedIn: "root",
})
export class PushNotificationService {
  protected readonly VAPID_PUBLIC_KEY =
    "BHeDXkKmD2vvuwhARdOSJroq0JDkzBxqhUifg6cKNd35uQfhY7FxygPxU82R17nOtcqYua9k4M_flWnQMbIcYZg";

  private userId?: string;

  constructor(
    private readonly swPush: SwPush,
    private readonly subscriptionService: SubscriptionService,
    private readonly keycloakService: KeycloakService
  ) {}

  public generateSubscription(): EventEmitter<void> {
    const subscriptionEvent: EventEmitter<void> = new EventEmitter<void>();
    this.keycloakService.loadUserProfile().then(profile => {
      this.userId = profile.id;
      Notification.requestPermission().then(result => {
        if (result !== "granted") {
          return;
        }
        this.swPush
          .requestSubscription({ serverPublicKey: this.VAPID_PUBLIC_KEY })
          .then(sub => {
            if (!this.userId) {
              return;
            }
            const subscription: Subscription = {
              userId: this.userId,
              pushSubscription: sub,
            };

            this.subscriptionService
              .addSubscription(subscription)
              .pipe(
                catchError(err => {
                  console.log(err);
                  throw new Error("Saving the subscription was unsuccessful");
                })
              )
              .subscribe(() => {
                subscriptionEvent.next();
              });
          })
          .catch(err => {
            console.error(err);
            throw new Error("Error while generating new subscription");
          });
      });
    });

    return subscriptionEvent;
  }
}
