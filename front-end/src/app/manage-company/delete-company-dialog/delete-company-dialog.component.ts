import { Component, EventEmitter, Inject } from "@angular/core";
import { MatButton } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from "@angular/material/dialog";

import { CompanyService } from "../../service/company.service";

@Component({
  selector: "app-delete-company-dialog",
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatDialogClose,
    MatButton,
  ],
  templateUrl: "./delete-company-dialog.component.html",
  styleUrl: "./delete-company-dialog.component.scss",
})
export class DeleteCompanyDialogComponent {
  constructor(
    private readonly companyService: CompanyService,
    @Inject(MAT_DIALOG_DATA)
    public data: { companyId: number; deleteEvent: EventEmitter<void> }
  ) {}
  deleteCompany() {
    this.companyService
      .deleteCompany(this.data.companyId)
      .subscribe(() => this.data.deleteEvent.emit());
  }
}
