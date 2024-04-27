import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { UserNotification } from "../model/user-notification.model";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})
export class UserNotificationService extends BaseService<UserNotification> {
  constructor(http: HttpClient) {
    super("/notifications", http);
  }

  public changeNotification(
    userNotification: UserNotification
  ): Observable<UserNotification> {
    return this.http.patch<UserNotification>(
      `${this.fullURL}/${userNotification.userId}`,
      userNotification
    );
  }

  public getPreferences(userId: string): Observable<UserNotification> {
    return this.http.get<UserNotification>(`${this.fullURL}/${userId}`);
  }
}
