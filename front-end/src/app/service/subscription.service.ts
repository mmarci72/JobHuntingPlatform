import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Subscription } from "../model/subscription.model";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})
export class SubscriptionService extends BaseService<Subscription> {
  constructor(http: HttpClient) {
    super("/subscriptions", http);
  }

  addSubscription(subscription: Subscription) {
    return this.http.post(`${this.fullURL}`, subscription, {
      responseType: "text",
    });
  }

  deleteSubscription(userId: string) {
    return this.http.delete<void>(`${this.fullURL}/${userId}`);
  }
}
