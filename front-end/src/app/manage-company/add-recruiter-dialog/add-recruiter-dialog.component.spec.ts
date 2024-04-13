import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecruiterDialogComponent } from './add-recruiter-dialog.component';

describe('AddRecruiterDialogComponent', () => {
  let component: AddRecruiterDialogComponent;
  let fixture: ComponentFixture<AddRecruiterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRecruiterDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddRecruiterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
