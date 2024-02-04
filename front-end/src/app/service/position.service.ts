import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Position } from "../model/job.model";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})
export class PositionService extends BaseService<Position> {
  constructor(http: HttpClient) {
    super("/positions", http);
  }

  public getPositions() {
    return this.getAllResource();
  }
}
