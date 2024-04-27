import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, Observable } from "rxjs";

import { Application } from "../model/application.model";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})
export class ApplicationService extends BaseService<Application> {
  constructor(http: HttpClient) {
    super("/application", http);
  }

  public getApplications(positionId: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.fullURL}/${positionId}`);
  }
  public postApplication(application: Application): Observable<string> {
    return this.http.post(this.fullURL, application, {
      responseType: "text",
    });
  }

  public didApply(
    positionId: number | undefined,
    username: string | undefined
  ) {
    if (!positionId || !username) {
      return EMPTY;
    }

    let queryParams = new HttpParams();

    queryParams = queryParams.append("positionId", positionId);
    queryParams = queryParams.append("username", username);

    return this.http.get(this.fullURL + "/exists", { params: queryParams });
  }

  public approveApplication(
    applicationId: number,
    approved: boolean
  ): Observable<string> {
    return this.http.get(
      `${this.fullURL}/approve/${applicationId}/${approved}`,
      { responseType: "text" }
    );
  }
}
