import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProjectFormComponent } from './new-project-form.component';

describe('NewProjectFormComponent', () => {
  let component: NewProjectFormComponent;
  let fixture: ComponentFixture<NewProjectFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewProjectFormComponent]
    });
    fixture = TestBed.createComponent(NewProjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
