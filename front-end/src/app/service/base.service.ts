import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export class BaseService<ServiceType, IdType = number> {
  get fullURL() {
    return this._fullURL;
  }

  private readonly PORT = 8081;
  private readonly BASE_ADDRESS = "http://localhost";
  private readonly BASE_URL = `${this.BASE_ADDRESS}:${this.PORT}`;
  private readonly _fullURL;

  protected readonly http: HttpClient;

  constructor(baseEndpoint: string, http: HttpClient) {
    this._fullURL = `${this.BASE_URL}${baseEndpoint}`;
    this.http = http;
  }

  public getAllResource(
    additionalEndpoint: string = ""
  ): Observable<ServiceType[]> {
    return this.http.get<ServiceType[]>(
      `${this._fullURL}${additionalEndpoint}`
    );
  }

  public getResource(
    resourceId: IdType,
    additionalEndpoint: string = ""
  ): Observable<ServiceType> {
    return this.http.get<ServiceType>(
      `${this._fullURL}${additionalEndpoint}/${resourceId}`
    );
  }

  public postResource(
    resource: ServiceType,
    additionalEndpoint: string = ""
  ): Observable<ServiceType> {
    return this.http.post<ServiceType>(
      `${this._fullURL}${additionalEndpoint}`,
      resource
    );
  }
  public updateResource(
    resource: ServiceType,
    additionalEndpoint: string = ""
  ): Observable<ServiceType> {
    return this.http.put<ServiceType>(
      `${this._fullURL}${additionalEndpoint}`,
      resource
    );
  }
  public deleteResource(
    resourceId: IdType,
    additionalEndpoint: string = ""
  ): Observable<ServiceType> {
    return this.http.delete<ServiceType>(
      `${this._fullURL}${additionalEndpoint}/${resourceId}`
    );
  }
}
