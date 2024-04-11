import { Component, Inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { MatFormField, MatInput, MatLabel } from "@angular/material/input";
import { MatSnackBar } from "@angular/material/snack-bar";

import { JobFiltersComponent } from "../../home/job-filters/job-filters.component";
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
    @Inject(MAT_DIALOG_DATA) public data: { companyId: number },
    public dialogRef: MatDialogRef<JobFiltersComponent>
  ) {}

  protected addRecruiter() {
    const permission: CompanyPermission = {
      companyId: this.data.companyId,
      username: this.username,
    };
    this.companyPermissionService.postPermission(permission).subscribe(() => {
      this.snackBar.open("User added as a recruiter", "OK", { duration: 400 });
      this.dialogRef.close();
    });
  }
}
