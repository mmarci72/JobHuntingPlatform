import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, map, mergeMap, Observable, toArray } from "rxjs";

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

  public getPositions(): Observable<Position[]> {
    return this.getAllResource().pipe(
      mergeMap(positions => from(positions)),
      mergeMap(position => this.populatePositionWithCompany(position)),
      toArray()
    );
  }

  public getPositionsWithCompanyLogo(): Observable<Position[]> {
    return this.getAllResource().pipe(
      mergeMap(positions => from(positions)),
      mergeMap(position => this.populatePositionWithCompanyAndLogo(position)),
      toArray()
    );
  }

  private populatePositionWithCompany = (
    position: Position
  ): Observable<Position> =>
    this.companyService
      .getCompanyById(position.companyId)
      .pipe(map(company => ({ ...position, company })));

  private populatePositionWithCompanyAndLogo = (
    position: Position
  ): Observable<Position> =>
    this.companyService
      .getCompanyWithLogos(position.companyId)
      .pipe(map(company => ({ ...position, company })));
}
