import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { KeycloakService } from "keycloak-angular";
import { map, Observable } from "rxjs";

import { BaseService } from "./base.service";
@Injectable({
  providedIn: "root",
})
export class AssetService extends BaseService<Blob, string> {
  private resumeEndpoint = "resume";
  private resumeExistsEndpoint = this.resumeEndpoint + "/exists";
  private companyLogoEndpoint = "company-logo";

  constructor(
    http: HttpClient,
    private keycloakService: KeycloakService
  ) {
    super("/assets", http);
  }

  public getCompanyLogo(fileName: string): Observable<string> {
    return this.http
      .get(`${this.fullURL}/${this.companyLogoEndpoint}/${fileName}`, {
        responseType: "blob",
      })
      .pipe(map(image => URL.createObjectURL(image)));
  }

  public postCompanyLogo(file: Blob) {
    return this.http.post(`${this.fullURL}/${this.companyLogoEndpoint}`, file, {
      responseType: "text",
    });
  }

  public getResume(userName: string): Observable<string> {
    return this.http
      .get(`${this.fullURL}/${this.resumeEndpoint}/${userName}`, {
        responseType: "blob",
      })
      .pipe(map(image => URL.createObjectURL(image)));
  }
  public doesResumeExist(userName: string) {
    return this.http.get<boolean>(
      `${this.fullURL}/${this.resumeExistsEndpoint}/${userName}`
    );
  }

  public postResume(file: Blob) {
    let queryParams = new HttpParams();

    const userName = this.keycloakService.getUsername();

    queryParams = queryParams.append("userName", userName);

    return this.http.post(`${this.fullURL}/${this.resumeEndpoint}`, file, {
      params: queryParams,
      responseType: "text",
    });
  }
}
