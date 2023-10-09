import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPreferencesComponent } from './settings-preferences.component';

describe('SettingsPreferencesComponent', () => {
  let component: SettingsPreferencesComponent;
  let fixture: ComponentFixture<SettingsPreferencesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsPreferencesComponent]
    });
    fixture = TestBed.createComponent(SettingsPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
