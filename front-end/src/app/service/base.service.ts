import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class BaseService<ServiceType, IdType = number> {
  get fullURL() {
    return this._fullURL;
  }

  private readonly PORT = 8081;
  private readonly BASE_ADDRESS = "http://localhost";
  private readonly BASE_URL = `${this.BASE_ADDRESS}:${this.PORT}`;
  private readonly _fullURL;

  constructor(
    baseEndpoint: string,
    private http: HttpClient
  ) {
    this._fullURL = `${this.BASE_URL}${baseEndpoint}`;
  }
  public getResource(additionalEndpoint: string = "") {
    return this.http.get<ServiceType>(`${this._fullURL}${additionalEndpoint}`);
  }

  public postResource(resource: ServiceType, additionalEndpoint: string = "") {
    return this.http.post<ServiceType>(
      `${this._fullURL}${additionalEndpoint}`,
      resource
    );
  }
  public updateResource(
    resource: ServiceType,
    additionalEndpoint: string = ""
  ) {
    return this.http.put<ServiceType>(
      `${this._fullURL}${additionalEndpoint}`,
      resource
    );
  }
  public deleteResource(resourceId: IdType, additionalEndpoint: string = "") {
    return this.http.delete<ServiceType>(
      `${this._fullURL}${additionalEndpoint}/${resourceId}`
    );
  }
}
