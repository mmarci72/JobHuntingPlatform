import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestDialogComponent } from './interest-dialog.component';

describe('InterestDialogComponent', () => {
  let component: InterestDialogComponent;
  let fixture: ComponentFixture<InterestDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterestDialogComponent]
    });
    fixture = TestBed.createComponent(InterestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
