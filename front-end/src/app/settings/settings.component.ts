import { Component } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError, EMPTY } from "rxjs";

import { AssetService } from "../service/asset.service";
import { SettingsPreferencesComponent } from "./settings-preferences/settings-preferences.component";

@Component({
  selector: "app-settings",
  standalone: true,
  imports: [SettingsPreferencesComponent, MatCheckbox, MatButton],
  templateUrl: "./settings.component.html",
  styleUrl: "./settings.component.scss",
})
export class SettingsComponent {
  private readonly snackbarMessage = "Resume uploaded successfully";
  private readonly errorSnackbarMessage = "Error uploading the resume";

  constructor(
    private assetService: AssetService,
    private snackBar: MatSnackBar
  ) {}

  uploadResume(event: Event) {
    if (!event.target) {
      return;
    }

    const target = event.target as HTMLInputElement;

    if (!target.files) {
      return;
    }

    const file: File = target.files[0];

    if (file) {
      const upload$ = this.assetService.postResume(file).pipe(
        catchError(() => {
          this.openSnackBar(this.errorSnackbarMessage);
          return EMPTY;
        })
      );

      upload$.subscribe(() => this.openSnackBar(this.snackbarMessage));
    }
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, "OK", { duration: 3000 });
  }
}
