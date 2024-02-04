import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
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
      expect(fullUrl.endsWith(baseEndpoint)).toBeTrue();
    });
  });
  describe("successful http requests", () => {
    const testData: MockModel = {
      id: 10,
      name: "test",
    };

    let request: TestRequest;

    afterEach(() => {
      request.flush(testData);
      httpTestingController.verify();
    });

    describe("get requests", () => {
      beforeEach(() => {});
      afterEach(() => {
        expect(request.request.method).toEqual("GET");
      });
      it("should return dummy data when using default parameter", () => {
        service
          .getResource(testData.id, "")
          .subscribe(data => expect(data).toEqual(testData));
        request = httpTestingController.expectOne(`${fullUrl}`);
      });
      it("should return dummy data when using additional endpoint", () => {
        service
          .getResource(testData.id, additionalEndpoint)
          .subscribe(data => expect(data).toEqual(testData));
        request = httpTestingController.expectOne(urlWithAdditionalEndpoint);
      });
    });

    describe("post requests", () => {
      afterEach(() => {
        expect(request.request.method).toEqual("POST");
      });
      it("should return supplied resource with no additional endpoint", () => {
        service
          .postResource(testData)
          .subscribe(data => expect(data).toEqual(testData));
        request = httpTestingController.expectOne(`${fullUrl}`);
      });
      it("should return supplied resource with additional endpoint", () => {
        service
          .postResource(testData, additionalEndpoint)
          .subscribe(data => expect(data).toEqual(testData));

        request = httpTestingController.expectOne(urlWithAdditionalEndpoint);
      });
    });

    describe("delete requests", () => {
      afterEach(() => {
        expect(request.request.method).toEqual("DELETE");
      });
      it("should return the deleted resource's id when called with no additional endpoint", () => {
        service
          .deleteResource(testData.id)
          .subscribe(data => expect(data).toEqual(testData));
        request = httpTestingController.expectOne(`${fullUrl}/${testData.id}`);
      });
      it("should return supplied resourceId with additional endpoint", () => {
        service
          .deleteResource(testData.id, additionalEndpoint)
          .subscribe(data => expect(data).toEqual(testData));

        request = httpTestingController.expectOne(
          `${urlWithAdditionalEndpoint}/${testData.id}`
        );
      });
    });

    describe("update requests", () => {
      afterEach(() => {
        expect(request.request.method).toEqual("PUT");
      });
      it("should return supplied resource with no additional endpoint", () => {
        service
          .updateResource(testData)
          .subscribe(data => expect(data).toEqual(testData));
        request = httpTestingController.expectOne(`${fullUrl}`);
      });
      it("should return supplied resource with additional endpoint", () => {
        service
          .updateResource(testData, additionalEndpoint)
          .subscribe(data => expect(data).toEqual(testData));

        request = httpTestingController.expectOne(urlWithAdditionalEndpoint);
      });
    });
  });
  describe("unsuccessful http request", () => {
    it("should fail with network error", done => {
      const mockError = new ProgressEvent("error");

      service.getAllResource().subscribe({
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
