import { NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";

import { CompanyFormComponent } from "../shared/company-form/company-form.component";

@Component({
  selector: "app-new-company",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatFormFieldModule,
    NgIf,
    CompanyFormComponent,
  ],
  templateUrl: "./new-company.component.html",
  styleUrl: "./new-company.component.scss",
})
export class NewCompanyComponent {}
