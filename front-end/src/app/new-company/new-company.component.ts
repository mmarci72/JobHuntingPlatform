import { NgIf } from "@angular/common";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatSnackBar } from "@angular/material/snack-bar";
import { KeycloakService } from "keycloak-angular";

import { Company } from "../model/company.model";
import { AssetService } from "../service/asset.service";
import { CompanyService } from "../service/company.service";

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
  ],
  templateUrl: "./new-company.component.html",
  styleUrl: "./new-company.component.scss",
})
export class NewCompanyComponent {
  protected companyFormGroup: FormGroup;

  protected userName = this.keycloakService.getUsername();

  protected logoFileName?: string;
  protected logo?: Blob;
  constructor(
    readonly formBuilder: FormBuilder,
    private readonly companyService: CompanyService,
    private readonly assetService: AssetService,
    private readonly snackBar: MatSnackBar,
    private readonly keycloakService: KeycloakService
  ) {
    this.companyFormGroup = formBuilder.group({
      name: ["", Validators.required],
      location: ["", Validators.required],
      companyLogo: [null, Validators.required],
      founded: [null, Validators.required],
      sizeMin: [null, Validators.required],
      sizeMax: [null, Validators.required],
    });
  }

  createCompany() {
    if (this.companyFormGroup.invalid) {
      this.snackBar.open("You must fill out every field", "Ok", {
        duration: 1000,
      });
    }

    if (!this.logoFileName || !this.logo) {
      throw new Error("Logo must be selected");
    }

    const company: Company = {
      name: this.companyFormGroup.get("name")?.getRawValue(),
      founded: new Date(
        this.companyFormGroup.get("founded")?.getRawValue(),
        0,
        1
      ),
      logoFileName: this.logoFileName,
      location: this.companyFormGroup.get("location")?.getRawValue(),
      sizeMax: this.companyFormGroup.get("sizeMax")?.getRawValue(),
      sizeMin: this.companyFormGroup.get("sizeMin")?.getRawValue(),
      positions: [],
    };
    this.companyService.postCompany(company, this.userName).subscribe(() =>
      this.snackBar.open("Company created successfully", "Ok", {
        duration: 1000,
      })
    );

    this.assetService.postCompanyLogo(this.logo);
  }

  onFilePicked(e: Event) {
    const target = e.target as HTMLInputElement;

    const files = target?.files;

    if (!files) {
      return;
    }
    const file = files[0];

    this.logoFileName = file.name;
    this.logoFileName += "." + file.type.split("/")[1];

    this.logo = file;
  }
}
