import { NgIf } from "@angular/common";
import { Component, Input } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButton } from "@angular/material/button";
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from "@angular/material/expansion";
import { MatError, MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio";
import { MatSnackBar } from "@angular/material/snack-bar";
import { KeycloakService } from "keycloak-angular";

import { Position } from "../model/job.model";
import { PositionService } from "../service/position.service";
import { SeniorityService } from "../service/seniority.service";
import { MdEditorComponent } from "./md-editor/md-editor.component";
import { TagsComponent } from "./tags/tags.component";

@Component({
  selector: "app-new-position",
  standalone: true,
  imports: [
    MatExpansionPanelHeader,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    NgIf,
    ReactiveFormsModule,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatRadioGroup,
    MatRadioButton,
    FormsModule,
    TagsComponent,
    MdEditorComponent,
  ],
  templateUrl: "./new-position.component.html",
  styleUrl: "./new-position.component.scss",
})
export class NewPositionComponent {
  @Input()
  public companyId?: number;

  protected requirementsDescriptionControl = (): FormControl<string> =>
    this.positionFormGroup.get("requirementsDescription") as FormControl;

  protected responsibilitiesDescriptionControl = (): FormControl<string> =>
    this.positionFormGroup.get("responsibilitiesDescription") as FormControl;

  protected positionDescriptionControl = (): FormControl<string> =>
    this.positionFormGroup.get("positionDescription") as FormControl;

  protected technologiesControl = (): FormControl<string[]> =>
    this.positionFormGroup.get("technologies") as FormControl;

  protected languagesControl = (): FormControl<string[]> =>
    this.positionFormGroup.get("languages") as FormControl;

  protected positionFormGroup: FormGroup;

  protected selectedSeniority?: string;

  protected userName = this.keycloakService.getUsername();

  protected seniorities: string[] = [];

  constructor(
    readonly formBuilder: FormBuilder,
    private readonly positionService: PositionService,
    private readonly snackBar: MatSnackBar,
    private readonly keycloakService: KeycloakService,
    private readonly seniorityService: SeniorityService
  ) {
    this.positionFormGroup = formBuilder.group({
      name: ["", Validators.required],
      roleName: ["", Validators.required],
      seniorities: [""],
      requirementsDescription: ["", Validators.required],
      responsibilitiesDescription: ["", Validators.required],
      positionDescription: ["", Validators.required],
      salaryMin: [null, Validators.required],
      salaryMax: [null],
      technologies: [[], Validators.required],
      languages: [[], Validators.required],
    });

    this.populateSeniorities();

    this.positionFormGroup
      .get("seniorities")
      ?.valueChanges.subscribe(seniority => {
        if (!seniority) {
          return;
        }

        this.selectedSeniority = seniority;
      });
  }

  private populateSeniorities() {
    this.seniorityService.getSeniorities().subscribe(seniorities => {
      this.seniorities = seniorities;
    });
  }

  protected createPosition() {
    if (this.positionFormGroup.invalid) {
      this.snackBar.open("You must fill out every field", "Ok", {
        duration: 1000,
      });
      return;
    }

    if (!this.selectedSeniority) {
      this.snackBar.open("You must select a seniority", "Ok", {
        duration: 1300,
      });
      return;
    }

    if (!this.companyId) {
      this.snackBar.open("Can't upload company, try again later", "Ok", {
        duration: 1300,
      });
      throw new Error("Company id cannot be null");
    }

    const position: Position = {
      positionName: this.positionFormGroup.get("name")?.getRawValue(),
      seniorityName: this.selectedSeniority,
      positionDescription: this.positionDescriptionControl().getRawValue(),
      responsibilitiesDescription:
        this.responsibilitiesDescriptionControl().getRawValue(),
      requirementsDescription:
        this.requirementsDescriptionControl().getRawValue(),
      roleName: this.positionFormGroup.get("roleName")?.getRawValue(),
      salaryMax: this.positionFormGroup.get("salaryMax")?.getRawValue(),
      salaryMin: this.positionFormGroup.get("salaryMin")?.getRawValue(),
      companyId: this.companyId,
      languages: this.languagesControl().value,
      technologies: this.technologiesControl().value,
    };

    this.positionService.addPosition(position).subscribe(() => {
      this.showSnackbar();
    });
  }

  private showSnackbar() {
    this.snackBar.open("Position created successfully", "Ok", {
      duration: 1000,
    });
  }

  protected readonly String = String;
}
