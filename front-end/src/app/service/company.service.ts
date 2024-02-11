import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, mergeMap } from "rxjs";

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

  public getCompanyById(companyId: number) {
    return this.getResource(companyId);
  }

  public getCompanyWithLogos(companyId: number) {
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
}
