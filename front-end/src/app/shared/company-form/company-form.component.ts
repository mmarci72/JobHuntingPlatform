import { NgIf } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatError, MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatSnackBar } from "@angular/material/snack-bar";
import { KeycloakService } from "keycloak-angular";

import { Company } from "../../model/company.model";
import { AssetService } from "../../service/asset.service";
import { CompanyService } from "../../service/company.service";

@Component({
  selector: "app-company-form",
  standalone: true,
  imports: [
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: "./company-form.component.html",
  styleUrl: "./company-form.component.scss",
})
export class CompanyFormComponent implements OnInit {
  @Input()
  public company?: Company;

  @Output()
  public companyChanged = new EventEmitter<Company>();

  protected companyFormGroup: FormGroup;

  protected userName = this.keycloakService.getUsername();

  protected logoFileName?: string;
  protected logo?: Blob;

  protected doesCompanyExist = false;

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
      founded: [null, Validators.required],
      sizeMin: [null, Validators.required],
      sizeMax: [null, Validators.required],
    });
  }

  protected createCompany() {
    if (this.companyFormGroup.invalid) {
      this.snackBar.open("You must fill out every field", "Ok", {
        duration: 1000,
      });
      return;
    }

    if (!this.logoFileName || !this.logo) {
      this.snackBar.open("You must upload a logo", "Ok", {
        duration: 1000,
      });
      return;
    }

    const company: Company = {
      id: this.company?.id,
      name: this.companyFormGroup.get("name")?.getRawValue(),
      founded: this.companyFormGroup.get("founded")?.getRawValue(),
      logoFileName: this.logoFileName,
      location: this.companyFormGroup.get("location")?.getRawValue(),
      sizeMax: this.companyFormGroup.get("sizeMax")?.getRawValue(),
      sizeMin: this.companyFormGroup.get("sizeMin")?.getRawValue(),
      positions: [],
    };

    if (this.company?.id) {
      this.companyService
        .updateCompany(company, this.userName)
        .subscribe(() => {
          this.showSnackbar();
          if (!this.logoFileName || !this.logo) {
            throw new Error("Logo must be selected");
          }
          if (!company.id) {
            throw new Error("Company id is null");
          }
          this.assetService
            .replaceCompanyLogo(this.logo, company.id)
            .subscribe(() => this.companyChanged.emit(company));
        });
    } else {
      this.companyService
        .postCompany(company, this.userName)
        .subscribe(company => {
          this.showSnackbar();
          if (!this.logoFileName || !this.logo) {
            throw new Error("Logo must be selected");
          }
          if (!company.id) {
            throw new Error("Company id is null");
          }
          this.assetService.postCompanyLogo(this.logo, company.id).subscribe();
        });
    }
  }

  protected onFilePicked(e: Event) {
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

  private showSnackbar() {
    this.snackBar.open("Company created successfully", "Ok", {
      duration: 1000,
    });
  }

  ngOnInit(): void {
    if (!this.company) {
      return;
    }

    this.assetService
      .getCompanyLogo(this.company.logoFileName)
      .subscribe(logo => (this.logo = logo));

    this.logoFileName = this.company.logoFileName;
    this.doesCompanyExist = true;
    this.companyFormGroup.patchValue(this.company);
  }
}
