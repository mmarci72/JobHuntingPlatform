import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { CompanyPermission } from "../model/company-permission.model";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})
export class CompanyPermissionService extends BaseService<CompanyPermission> {
  constructor(http: HttpClient) {
    super("/permissions", http);
  }

  public postPermission(
    companyPermission: CompanyPermission
  ): Observable<CompanyPermission> {
    return this.postResource(companyPermission);
  }
}
