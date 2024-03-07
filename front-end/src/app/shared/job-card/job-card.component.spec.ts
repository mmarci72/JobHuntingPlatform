import { ComponentFixture, TestBed } from "@angular/core/testing";

import { Position } from "../../model/job.model";
import { JobCardComponent } from "./job-card.component";

describe("JobCardComponent", () => {
  let component: JobCardComponent;
  let fixture: ComponentFixture<JobCardComponent>;
  const testPosition: Position = {
    id: 10,
    name: "test",
  } as unknown as Position;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JobCardComponent);
    component = fixture.componentInstance;
    component.position = testPosition;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
