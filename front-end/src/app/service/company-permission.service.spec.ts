import { TestBed } from "@angular/core/testing";

import { CompanyPermissionService } from "./company-permission.service";

describe("CompanyPermissionService", () => {
  let service: CompanyPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyPermissionService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
