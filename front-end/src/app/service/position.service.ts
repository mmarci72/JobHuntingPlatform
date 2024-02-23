import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

import { comparePositions, PaginatedPosition } from "../model/job.model";
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
    pageSize: number
  ): Observable<PaginatedPosition> {
    let queryParams = new HttpParams();

    queryParams = queryParams.append("page", page);
    queryParams = queryParams.append("size", pageSize);

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
}
