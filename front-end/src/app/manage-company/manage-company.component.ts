import { NgIf, NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from "@angular/material/expansion";
import { MatError, MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { KeycloakService } from "keycloak-angular";

import { Company } from "../model/company.model";
import { NewCompanyComponent } from "../new-company/new-company.component";
import { CompanyService } from "../service/company.service";
import { CompanyFormComponent } from "../shared/company-form/company-form.component";
import { AddRecruiterDialogComponent } from "./add-recruiter-dialog/add-recruiter-dialog.component";

@Component({
  selector: "app-manage-company",
  standalone: true,
  imports: [
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    NgIf,
    ReactiveFormsModule,
    NewCompanyComponent,
    CompanyFormComponent,
    NgOptimizedImage,
  ],
  templateUrl: "./manage-company.component.html",
  styleUrl: "./manage-company.component.scss",
})
export class ManageCompanyComponent {
  protected companies: Company[] = [];

  protected username: string = this.keycloakService.getUsername();

  constructor(
    readonly companyService: CompanyService,
    private readonly keycloakService: KeycloakService,
    private readonly addRecruiterDialog: MatDialog
  ) {
    companyService
      .getAccessibleCompanies(this.username)
      .subscribe(companies => (this.companies = companies));
  }

  protected companyChanged(newCompany: Company) {
    const oldCompanyIndex = this.companies.findIndex(
      company => company.id === newCompany.id
    );

    if (oldCompanyIndex === -1) {
      return;
    }

    this.companies[oldCompanyIndex] = newCompany;
  }

  addNewRecruiter(e: Event, companyId: number | undefined) {
    e.stopPropagation();

    if (!companyId) {
      return;
    }

    this.addRecruiterDialog.open(AddRecruiterDialogComponent, {
      data: { companyId },
      panelClass: "add-recruiter-dialog",
    });
  }
}
