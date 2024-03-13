import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LocationSvgComponent } from "./location-svg.component";

describe("LocationSvgComponent", () => {
  let component: LocationSvgComponent;
  let fixture: ComponentFixture<LocationSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationSvgComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LocationSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
