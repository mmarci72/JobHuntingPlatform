import { Component } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MatCheckbox } from "@angular/material/checkbox";

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
  constructor(private assetService: AssetService) {}

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
      const upload$ = this.assetService.postResume(file);

      upload$.subscribe(() => console.log("FILE UPLOAD SUCCESS"));
    }
  }
}
