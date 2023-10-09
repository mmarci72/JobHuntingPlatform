import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePositionsComponent } from './manage-positions.component';

describe('ManagePositionsComponent', () => {
  let component: ManagePositionsComponent;
  let fixture: ComponentFixture<ManagePositionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagePositionsComponent]
    });
    fixture = TestBed.createComponent(ManagePositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
