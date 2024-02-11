import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { BaseService } from "./base.service";
@Injectable({
  providedIn: "root",
})
export class AssetService extends BaseService<Blob, string> {
  constructor(http: HttpClient) {
    super("/assets", http);
  }

  public getCompanyLogo(fileName: string) {
    return this.http
      .get(`${this.fullURL}/company-logo/${fileName}`, {
        responseType: "blob",
      })
      .pipe(map(image => URL.createObjectURL(image)));
  }
}
