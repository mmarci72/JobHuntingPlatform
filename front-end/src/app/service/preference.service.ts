import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Preference } from "../model/preference.model";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})
export class PreferenceService extends BaseService<Preference> {
  constructor(http: HttpClient) {
    super("/preferences", http);
  }

  getPreferencesForUser(userId: string) {
    return this.http.get<Preference>(`${this.fullURL}/${userId}`);
  }

  postPreference(preference: Preference) {
    return this.http.post(`${this.fullURL}`, preference);
  }

  updatePreference(preference: Preference, userId: string) {
    return this.http.patch(`${this.fullURL}/${userId}`, preference);
  }
}
