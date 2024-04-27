import { AsyncPipe, NgIf, NgOptimizedImage } from "@angular/common";
import { Component, EventEmitter } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from "@angular/material/expansion";
import { MatError, MatFormField } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatSnackBar } from "@angular/material/snack-bar";
import { RouterLink } from "@angular/router";
import { KeycloakService } from "keycloak-angular";
import { Observable } from "rxjs";

import { Company } from "../model/company.model";
import { Position } from "../model/job.model";
import { NewCompanyComponent } from "../new-company/new-company.component";
import { CompanyService } from "../service/company.service";
import { PositionService } from "../service/position.service";
import { CompanyFormComponent } from "../shared/company-form/company-form.component";
import { DeletePositionDialogComponent } from "./delete-position-dialog/delete-position-dialog.component";

@Component({
  selector: "app-manage-positions",
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
    RouterLink,
    AsyncPipe,
    MatIcon,
  ],
  templateUrl: "./manage-positions.component.html",
  styleUrl: "./manage-positions.component.scss",
})
export class ManagePositionsComponent {
  protected companies: Company[] = [];

  protected positionsByCompany: {
    [companyId: number]: Observable<Position[]>;
  } = {};

  protected username: string = this.keycloakService.getUsername();
  protected deleteEvent = new EventEmitter<void>();

  constructor(
    private readonly companyService: CompanyService,
    private readonly positionService: PositionService,
    private readonly keycloakService: KeycloakService,
    private readonly snackBar: MatSnackBar,
    private readonly matDialog: MatDialog
  ) {
    this.getAccessibleCompanies();
  }

  private getAccessibleCompanies(): void {
    this.companyService
      .getAccessibleCompanies(this.username)
      .subscribe(companies => {
        this.companies = companies;
        companies.forEach(company => {
          if (!company.id) {
            throw new Error("Company id cannot be undefined");
          }
          this.positionsByCompany[company.id] =
            this.positionService.getPositionsByCompanyId(company.id);
        });
      });

    this.deleteEvent.subscribe(() => {
      this.companies.forEach(company => {
        if (!company.id) {
          throw new Error("Company id cannot be undefined");
        }
        this.positionsByCompany[company.id] =
          this.positionService.getPositionsByCompanyId(company.id);
      });
      this.snackBar.open("Position deleted successfully", "OK", {
        duration: 1500,
      });
    });
  }

  deletePosition(positionId: number | undefined) {
    if (!positionId) {
      return;
    }

    this.matDialog.open(DeletePositionDialogComponent, {
      data: { positionId, deleteEvent: this.deleteEvent },
    });
  }
}
