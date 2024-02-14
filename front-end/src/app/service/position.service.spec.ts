import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { PositionService } from "./position.service";

describe("PositionService", () => {
  let service: PositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Correctly import HttpClientTestingModule here
      providers: [PositionService],
    });
    service = TestBed.inject(PositionService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
