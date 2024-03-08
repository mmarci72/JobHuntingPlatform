import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})
export class SeniorityService extends BaseService<string> {
  constructor(http: HttpClient) {
    super("/seniorities", http);
  }

  public getSeniorities(): Observable<string[]> {
    return this.getAllResource();
  }
}
