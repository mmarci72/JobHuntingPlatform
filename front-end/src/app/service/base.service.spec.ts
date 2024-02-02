import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { BaseService } from "./base.service";

type MockModel = {
  id: number;
  name: string;
};

describe("BaseService", () => {
  const baseEndpoint = "/test";
  let httpTestingController: HttpTestingController;
  let service: BaseService<MockModel>;
  let fullUrl: string;
  let additionalEndpoint: string;
  let urlWithAdditionalEndpoint: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = new BaseService(baseEndpoint, TestBed.inject(HttpClient));
    httpTestingController = TestBed.inject(HttpTestingController);
    fullUrl = service.fullURL;
    additionalEndpoint = "/foo";
    urlWithAdditionalEndpoint = `${fullUrl}${additionalEndpoint}`;
  });

  describe("service initialization", () => {
    it("should be created", () => {
      expect(service).toBeTruthy();
    });
    it("should have it's url set", () => {
      expect(fullUrl.endsWith("/test")).toBeTrue();
    });
  });
  describe("http requests", () => {
    afterEach(() => {
      httpTestingController.verify();
    });
    const testData: MockModel = {
      id: 10,
      name: "test",
    };

    describe("get requests", () => {
      it("should return dummy data when using default parameter", () => {
        service
          .getResource("")
          .subscribe(data => expect(data).toEqual(testData));
        const request = httpTestingController.expectOne(`${fullUrl}`);

        expect(request.request.method).toEqual("GET");

        request.flush(testData);
      });
      it("should return dummy data when using additional endpoint", () => {
        service
          .getResource(additionalEndpoint)
          .subscribe(data => expect(data).toEqual(testData));
        const request = httpTestingController.expectOne(
          urlWithAdditionalEndpoint
        );

        expect(request.request.method).toEqual("GET");

        request.flush(testData);
      });
    });

    describe("post requests", () => {
      it("should return supplied resource with no additional endpoint", () => {
        service
          .postResource(testData)
          .subscribe(data => expect(data).toEqual(testData));
        const request = httpTestingController.expectOne(`${fullUrl}`);

        expect(request.request.method).toEqual("POST");

        request.flush(testData);
      });
      it("should return supplied resource with additional endpoint", () => {
        service
          .postResource(testData, additionalEndpoint)
          .subscribe(data => expect(data).toEqual(testData));

        const request = httpTestingController.expectOne(
          urlWithAdditionalEndpoint
        );

        expect(request.request.method).toEqual("POST");

        request.flush(testData);
      });
    });

    describe("delete requests", () => {
      it("should return the deleted resource's id when called with no additional endpoint", () => {
        service
          .deleteResource(testData.id)
          .subscribe(data => expect(data).toEqual(testData));
        const request = httpTestingController.expectOne(
          `${fullUrl}/${testData.id}`
        );

        expect(request.request.method).toEqual("DELETE");

        request.flush(testData);
      });
      it("should return supplied resourceId with additional endpoint", () => {
        service
          .deleteResource(testData.id, additionalEndpoint)
          .subscribe(data => expect(data).toEqual(testData));

        const request = httpTestingController.expectOne(
          `${urlWithAdditionalEndpoint}/${testData.id}`
        );

        expect(request.request.method).toEqual("DELETE");

        request.flush(testData);
      });
    });

    describe("update requests", () => {
      it("should return supplied resource with no additional endpoint", () => {
        service
          .updateResource(testData)
          .subscribe(data => expect(data).toEqual(testData));
        const request = httpTestingController.expectOne(`${fullUrl}`);

        expect(request.request.method).toEqual("PUT");

        request.flush(testData);
      });
      it("should return supplied resource with additional endpoint", () => {
        service
          .updateResource(testData, additionalEndpoint)
          .subscribe(data => expect(data).toEqual(testData));

        const request = httpTestingController.expectOne(
          urlWithAdditionalEndpoint
        );

        expect(request.request.method).toEqual("PUT");

        request.flush(testData);
      });
    });

    it("should fail with network error", done => {
      const mockError = new ProgressEvent("error");

      service.getResource().subscribe({
        next: () => fail("should have failed with the network error"),
        error: (error: HttpErrorResponse) => {
          expect(error.error).toBe(mockError);
          done();
        },
      });

      const req = httpTestingController.expectOne(`${fullUrl}`);

      // Respond with mock error
      req.error(mockError);
    });
  });
});
