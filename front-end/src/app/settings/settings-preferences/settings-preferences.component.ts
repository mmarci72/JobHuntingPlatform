import { NgForOf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatFormField } from "@angular/material/form-field";
import { MatOption, MatSelect } from "@angular/material/select";
import { MatSnackBar } from "@angular/material/snack-bar";
import { KeycloakService } from "keycloak-angular";
import { catchError, of } from "rxjs";

import { Preference } from "../../model/preference.model";
import { PreferenceService } from "../../service/preference.service";
import { SeniorityService } from "../../service/seniority.service";

@Component({
  selector: "app-settings-preferences",
  standalone: true,
  imports: [
    NgForOf,
    MatOption,
    MatSelect,
    MatFormField,
    MatButton,
    ReactiveFormsModule,
  ],
  templateUrl: "./settings-preferences.component.html",
  styleUrl: "./settings-preferences.component.scss",
})
export class SettingsPreferencesComponent implements OnInit {
  protected preferenceForm: FormGroup;

  private userId?: string;

  protected selectedSeniorities: string[] = [];

  protected preferences: Preference = {
    preferences: {
      seniorities: [],
    },
  };

  protected seniorities: string[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly seniorityService: SeniorityService,
    private readonly preferenceService: PreferenceService,
    private readonly keycloakService: KeycloakService,
    private readonly snackBar: MatSnackBar
  ) {
    this.preferenceForm = this.formBuilder.group({
      role: [""],
      seniority: [""],
      unit: [""],
    });

    this.keycloakService
      .loadUserProfile()
      .then(profile => (this.userId = profile.id));
  }

  private getSeniorities() {
    this.seniorityService.getSeniorities().subscribe(seniorities => {
      this.seniorities = seniorities.filter(seniority => seniority !== "Any");
    });
  }

  private getPreferences() {
    if (!this.userId) {
      return;
    }

    this.preferenceService
      .getPreferencesForUser(this.userId)
      .pipe(catchError(() => of(null)))
      .subscribe(data => {
        if (data === null) {
          this.selectedSeniorities = [];
        } else {
          this.selectedSeniorities = data.preferences.seniorities;
        }
      });
  }

  savePreferences() {
    if (!this.userId) {
      return;
    }

    this.preferences.preferences.seniorities =
      this.selectedSeniorities.length === 0
        ? this.seniorities
        : this.selectedSeniorities;

    this.preferenceService
      .updatePreference(this.preferences, this.userId)
      .pipe(
        catchError(() => {
          this.snackBar.open(`Couldn't save preferences`, "Ok", {
            duration: 2000,
          });
          return of(null);
        })
      )
      .subscribe(() =>
        this.snackBar.open("Preferences saved successfully", "Ok", {
          duration: 2000,
        })
      );
  }

  ngOnInit(): void {
    this.getSeniorities();
    this.getPreferences();
  }
}
