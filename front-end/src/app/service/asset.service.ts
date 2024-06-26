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

  public getCompanyLogoURL(fileName: string): Observable<string> {
    return this.getCompanyLogo(fileName).pipe(
      map(image => URL.createObjectURL(image))
    );
  }

  public getCompanyLogo(fileName: string): Observable<Blob> {
    return this.http.get(
      `${this.fullURL}/${this.companyLogoEndpoint}/${fileName}`,
      {
        responseType: "blob",
      }
    );
  }

  public postCompanyLogo(file: Blob, companyId: number): Observable<string> {
    return this.http.post(`${this.fullURL}/${this.companyLogoEndpoint}`, file, {
      responseType: "text",
      params: new HttpParams().append("companyId", companyId),
    });
  }

  public replaceCompanyLogo(file: Blob, companyId: number): Observable<string> {
    return this.http.post(
      `${this.fullURL}/${this.companyLogoEndpoint}/replace`,
      file,
      {
        responseType: "text",
        params: new HttpParams().append("companyId", companyId),
      }
    );
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
