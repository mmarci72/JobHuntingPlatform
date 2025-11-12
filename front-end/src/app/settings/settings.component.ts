import { AsyncPipe } from "@angular/common";
import { Component, EventEmitter } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatIcon } from "@angular/material/icon";
import { MatSnackBar } from "@angular/material/snack-bar";
import { KeycloakService } from "keycloak-angular";
import { catchError, EMPTY, mergeMap, of } from "rxjs";

import { UserNotification } from "../model/user-notification.model";
import { AssetService } from "../service/asset.service";
import { PushNotificationService } from "../service/push-notification.service";
import { SubscriptionService } from "../service/subscription.service";
import { UserNotificationService } from "../service/user-notification.service";
import { SettingsPreferencesComponent } from "./settings-preferences/settings-preferences.component";

@Component({
  selector: "app-settings",
  standalone: true,
  imports: [
    SettingsPreferencesComponent,
    MatCheckbox,
    MatButton,
    MatIcon,
    AsyncPipe,
  ],
  templateUrl: "./settings.component.html",
  styleUrl: "./settings.component.scss",
})
export class SettingsComponent {
  userNotification: UserNotification = {
    userId: undefined,
    emailNotificationEnabled: false,
    pushNotificationEnabled: false,
  };

  private readonly snackbarMessage = "Resume uploaded successfully";
  private readonly errorSnackbarMessage = "Error uploading the resume";

  private readonly successString = "Changes saved!";
  private readonly errorString = "Error saving changes!";

  private username = this.keycloakService.getUsername();

  protected resumeExists = false;

  protected checkResumeExists = new EventEmitter<void>();
  protected resumeExists$ = this.checkResumeExists.pipe(
    mergeMap(() => this.assetService.doesResumeExist(this.username))
  );

  constructor(
    private readonly keycloakService: KeycloakService,
    private readonly assetService: AssetService,
    private readonly snackBar: MatSnackBar,
    private readonly userNotificationService: UserNotificationService,
    private readonly pushNotificationService: PushNotificationService,
    private readonly subscriptionService: SubscriptionService
  ) {
    this.keycloakService.loadUserProfile().then(keycloakProfile => {
      if (!keycloakProfile.id) {
        return;
      }
      this.userNotification = {
        userId: keycloakProfile.id,
        emailNotificationEnabled: false,
        pushNotificationEnabled: false,
      };
      this.userNotificationService
        .getPreferences(keycloakProfile.id)
        .subscribe(preference => {
          this.userNotification.pushNotificationEnabled =
            preference.pushNotificationEnabled;
          this.userNotification.emailNotificationEnabled =
            preference.emailNotificationEnabled;
        });
    });

    this.resumeExists$.subscribe(
      doesResumeExist => (this.resumeExists = doesResumeExist)
    );

    this.checkResumeExists.next();
  }

  protected emailNotificationChange() {
    this.userNotification.emailNotificationEnabled =
      !this.userNotification.emailNotificationEnabled;

    this.userNotificationService
      .changeNotification(this.userNotification)
      .pipe(
        catchError(err => {
          this.openSnackBar(this.errorString);
          console.error(err);
          return of(null);
        })
      )
      .subscribe(() => this.openSnackBar(this.successString));
  }

  protected uploadResume(event: Event) {
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

      upload$.subscribe(() => {
        this.openSnackBar(this.snackbarMessage);
        this.checkResumeExists.next();
      });
    }
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, "OK", { duration: 3000 });
  }

  protected pushNotificationChange() {
    this.userNotification.pushNotificationEnabled =
      !this.userNotification.pushNotificationEnabled;

    this.userNotificationService
      .changeNotification(this.userNotification)
      .subscribe(async () => {
        if (this.userNotification.pushNotificationEnabled) {
          try {
            const value = this.pushNotificationService.generateSubscription();
            value.subscribe(() => this.openSnackBar("Changes saved!"));
          } catch (e) {
            this.openSnackBar(this.errorString);
          }
        } else if (this.userNotification?.userId) {
          this.subscriptionService
            .deleteSubscription(this.userNotification.userId)
            .pipe(
              catchError(err => {
                this.openSnackBar(this.errorString);
                console.error(err);
                return of(null);
              })
            )
            .subscribe(() => this.openSnackBar(this.successString));
        }
      });
  }

  downloadResume() {
    this.assetService
      .getResume(this.username)
      .subscribe(resume => window.open(resume));
  }

  deleteResume() {
    this.assetService.deleteResume(this.username).subscribe(() => {
      this.checkResumeExists.next();
      this.openSnackBar(this.successString);
    });
  }
}
