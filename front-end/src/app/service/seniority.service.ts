import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

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
