import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, map, mergeMap, toArray } from "rxjs";

import { Position } from "../model/job.model";
import { BaseService } from "./base.service";
import { CompanyService } from "./company.service";

@Injectable({
  providedIn: "root",
})
export class PositionService extends BaseService<Position> {
  constructor(
    http: HttpClient,
    private companyService: CompanyService
  ) {
    super("/positions", http);
  }

  public getPositions() {
    return this.getAllResource().pipe(
      mergeMap(positions => from(positions)),
      mergeMap(position => this.populatePositionWithCompany(position)),
      toArray()
    );
  }
  private populatePositionWithCompanyAndLogo = (position: Position) =>
    this.companyService
      .getCompanyWithLogos(position.companyId)
      .pipe(map(company => ({ ...position, company })));
}
