import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

import { JobFilter } from "../home/job-filter";
import {
  comparePositions,
  PaginatedPosition,
  Position,
} from "../model/job.model";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})
export class PositionService extends BaseService<PaginatedPosition> {
  constructor(http: HttpClient) {
    super("/positions", http);
  }

  public getPositions(
    page: number,
    pageSize: number,
    filters?: JobFilter
  ): Observable<PaginatedPosition> {
    let queryParams = new HttpParams();

    queryParams = queryParams.append("page", page);
    queryParams = queryParams.append("size", pageSize);
    if (filters) {
      queryParams = queryParams.append("filter", filters.searchString);
      queryParams = queryParams.append("minSalary", filters.minSalary);
      queryParams = queryParams.append("maxSalary", filters.maxSalary);
      queryParams = queryParams.append(
        "seniorities",
        filters.seniorities.join(",")
      );
    }

    return this.http
      .get<PaginatedPosition>(this.fullURL, { params: queryParams })
      .pipe(
        map(positions => {
          positions.entities = positions.entities.map(position => {
            position.postDate = new Date(position.postDate);
            return position;
          });
          return positions;
        }),
        map(positions => {
          positions.entities = [...positions.entities].sort((p1, p2) =>
            comparePositions(p1, p2)
          );
          return positions;
        })
      );
  }

  public getPosition(positionId: number) {
    return this.http.get<Position>(`${this.fullURL}/${positionId}`);
  }
}
