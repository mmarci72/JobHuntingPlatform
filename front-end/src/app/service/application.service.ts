import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Application } from "../model/application.model";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})
export class ApplicationService extends BaseService<Application> {
  constructor(http: HttpClient) {
    super("/application", http);
  }

  public postApplication(application: Application): Observable<Application> {
    return this.postResource(application);
  }
}
