import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
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

import { Position } from "../../model/job.model";
import { MdEditorComponent } from "../../new-position/md-editor/md-editor.component";
import { TagsComponent } from "../../new-position/tags/tags.component";
import { PositionService } from "../../service/position.service";
import { SeniorityService } from "../../service/seniority.service";

@Component({
  selector: "app-position-form",
  standalone: true,
  imports: [
    MatButton,
    MatError,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatRadioGroup,
    MatRadioButton,
    MdEditorComponent,
    TagsComponent,
  ],
  templateUrl: "./position-form.component.html",
  styleUrl: "./position-form.component.scss",
})
export class PositionFormComponent implements OnInit {
  @Input()
  public positionId?: number;

  protected position?: Position;

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

  protected seniorities: { name: string; isChecked: boolean }[] = [];

  protected buttonLabel = "Create";

  constructor(
    readonly formBuilder: FormBuilder,
    private readonly positionService: PositionService,
    private readonly snackBar: MatSnackBar,
    private readonly keycloakService: KeycloakService,
    private readonly seniorityService: SeniorityService,
    private readonly cd: ChangeDetectorRef
  ) {
    this.positionFormGroup = formBuilder.group({
      positionName: [this.position?.positionName ?? "", Validators.required],
      roleName: [this.position?.roleName ?? "", Validators.required],
      seniorities: [""],
      requirementsDescription: [
        this.position?.requirementsDescription ?? "",
        Validators.required,
      ],
      responsibilitiesDescription: [
        this.position?.responsibilitiesDescription ?? "",
        Validators.required,
      ],
      positionDescription: [
        this.position?.positionDescription ?? "",
        Validators.required,
      ],
      salaryMin: [
        this.position?.salaryMin ?? null,
        [Validators.required, Validators.min(0), Validators.max(10000000)],
      ],
      salaryMax: [
        this.position?.salaryMax ?? null,
        [Validators.min(0), Validators.max(10000000)],
      ],
      technologies: [this.position?.technologies ?? [], Validators.required],
      languages: [this.position?.languages ?? [], Validators.required],
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
      this.seniorities = seniorities.map(seniority => {
        return {
          name: seniority,
          isChecked: false,
        };
      });
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
      positionId: this.position?.positionId ?? undefined,
      positionName: this.positionFormGroup.get("positionName")?.getRawValue(),
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

    if (this.position) {
      this.positionService.patchPosition(position).subscribe(() => {
        this.showSnackbar("Position updated successfully");
      });
    } else {
      this.positionService.addPosition(position).subscribe(() => {
        this.showSnackbar("Position created successfully");
      });
    }
  }

  private showSnackbar(message: string) {
    this.snackBar.open(message, "Ok", {
      duration: 1000,
    });
  }

  protected readonly String = String;

  ngOnInit(): void {
    if (this.positionId) {
      this.positionService.getPosition(this.positionId).subscribe(position => {
        this.positionFormGroup.patchValue(position);
        this.position = position;
        this.buttonLabel = "Edit";
        this.selectedSeniority = position.seniorityName;
        const seniority = this.seniorities.find(
          seniority =>
            seniority.name.toLowerCase() ===
            this.selectedSeniority?.toLowerCase()
        );
        if (seniority) {
          seniority.isChecked = true;
          this.cd.detectChanges();
        }
      });
    }
  }
}
