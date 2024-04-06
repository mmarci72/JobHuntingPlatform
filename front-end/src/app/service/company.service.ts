import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, mergeMap, Observable } from "rxjs";

import { Company, CompanyWithLogo } from "../model/company.model";
import { AssetService } from "./asset.service";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})
export class CompanyService extends BaseService<Company> {
  constructor(
    http: HttpClient,
    private assetService: AssetService
  ) {
    super("/companies", http);
  }

  public getCompanyById(companyId: number): Observable<Company> {
    return this.getResource(companyId);
  }

  public getCompanyWithLogos(companyId: number): Observable<CompanyWithLogo> {
    return this.getResource(companyId).pipe(
      mergeMap(company =>
        this.assetService.getCompanyLogo(company.logoFileName).pipe(
          map<string, CompanyWithLogo>(logo => {
            return { ...company, logo };
          })
        )
      )
    );
  }

  public postCompany(company: Company, username: string) {
    let queryParams = new HttpParams();

    queryParams = queryParams.append("username", username);

    return this.http.post(this.fullURL, company, {
      params: queryParams,
    });
  }
}
