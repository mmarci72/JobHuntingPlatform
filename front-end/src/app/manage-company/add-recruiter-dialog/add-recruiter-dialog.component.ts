import { HttpErrorResponse } from "@angular/common/http";
import { Component, Inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogTitle,
} from "@angular/material/dialog";
import { MatFormField, MatInput, MatLabel } from "@angular/material/input";
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError, EMPTY } from "rxjs";

import { CompanyPermission } from "../../model/company-permission.model";
import { CompanyPermissionService } from "../../service/company-permission.service";

@Component({
  selector: "app-add-recruiter-dialog",
  standalone: true,
  imports: [
    MatInput,
    FormsModule,
    MatButton,
    MatDialogContent,
    MatLabel,
    MatFormField,
    MatDialogTitle,
  ],
  templateUrl: "./add-recruiter-dialog.component.html",
  styleUrl: "./add-recruiter-dialog.component.scss",
})
export class AddRecruiterDialogComponent {
  protected username: string = "";

  constructor(
    private readonly companyPermissionService: CompanyPermissionService,
    private readonly snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { companyId: number }
  ) {}

  protected addRecruiter() {
    if (!this.username) {
      this.openSnackbar("Username cannot be empty");
      return;
    }
    const permission: CompanyPermission = {
      companyId: this.data.companyId,
      username: this.username,
    };
    this.companyPermissionService
      .postPermission(permission)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.openSnackbar("User does not exist");
          } else if (error.status === 409) {
            this.openSnackbar("User already added as a recruiter");
          } else {
            this.openSnackbar(
              "Error occurred while adding the user as a recruiter"
            );
          }
          return EMPTY;
        })
      )
      .subscribe(() => this.openSnackbar("User added as a recruiter"));
  }

  protected openSnackbar(message: string) {
    this.snackBar.open(message, "OK", { duration: 1500 });
  }
}
