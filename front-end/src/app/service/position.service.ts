import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, map, mergeMap, Observable, toArray } from "rxjs";

import { comparePositions, Position } from "../model/job.model";
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

  public getPositions(withLogo: boolean = false): Observable<Position[]> {
    return this.getAllResource().pipe(
      mergeMap(positions => from(positions)),
      mergeMap(position =>
        this.populatePositionWithCompany(position, withLogo)
      ),
      map(position => {
        position.postDate = new Date(position.postDate);
        return position;
      }),
      toArray(),
      map(positions =>
        [...positions].sort((p1, p2) => comparePositions(p1, p2))
      )
    );
  }

  private populatePositionWithCompany = (
    position: Position,
    withLogo: boolean
  ): Observable<Position> => {
    if (withLogo) {
      return this.companyService
        .getCompanyWithLogos(position.companyId)
        .pipe(map(company => ({ ...position, company })));
    } else {
      return this.companyService
        .getCompanyById(position.companyId)
        .pipe(map(company => ({ ...position, company })));
    }
  };
}
