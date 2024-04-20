import { AsyncPipe, NgIf, NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from "@angular/material/expansion";
import { MatError, MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { RouterLink } from "@angular/router";
import { KeycloakService } from "keycloak-angular";
import { Observable } from "rxjs";

import { Company } from "../model/company.model";
import { Position } from "../model/job.model";
import { NewCompanyComponent } from "../new-company/new-company.component";
import { CompanyService } from "../service/company.service";
import { PositionService } from "../service/position.service";
import { CompanyFormComponent } from "../shared/company-form/company-form.component";

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

  constructor(
    private readonly companyService: CompanyService,
    private readonly positionService: PositionService,
    private readonly keycloakService: KeycloakService
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
  }
}
