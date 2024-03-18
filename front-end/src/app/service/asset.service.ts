import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { KeycloakService } from "keycloak-angular";
import { map, Observable } from "rxjs";

import { BaseService } from "./base.service";
@Injectable({
  providedIn: "root",
})
export class AssetService extends BaseService<Blob, string> {
  constructor(
    http: HttpClient,
    private keycloakService: KeycloakService
  ) {
    super("/assets", http);
  }

  public getCompanyLogo(fileName: string): Observable<string> {
    return this.http
      .get(`${this.fullURL}/company-logo/${fileName}`, {
        responseType: "blob",
      })
      .pipe(map(image => URL.createObjectURL(image)));
  }

  public postResume(file: Blob) {
    let queryParams = new HttpParams();

    const userName = this.keycloakService.getUsername();

    queryParams = queryParams.append("userName", userName);

    return this.http.post(`${this.fullURL}/resume`, file, {
      params: queryParams,
      responseType: "text",
    });
  }
}
