import { NgIf } from "@angular/common";
import { Component, Inject } from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
} from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatCheckbox, MatCheckboxChange } from "@angular/material/checkbox";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from "@angular/material/expansion";
import { MatError } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";

import { SeniorityService } from "../../service/seniority.service";
import { JobFilter } from "../job-filter";

type SeniorityControl = { isChecked: boolean; seniority: string };

@Component({
  selector: "app-job-filters",
  standalone: true,
  imports: [
    MatExpansionPanelHeader,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    ReactiveFormsModule,
    MatCheckbox,
    MatButton,
    MatError,
    NgIf,
    MatInput,
  ],
  templateUrl: "./job-filters.component.html",
  styleUrl: "./job-filters.component.scss",
})
export class JobFiltersComponent {
  protected jobFilters: FormGroup;
  protected get seniorities(): FormArray<FormControl<SeniorityControl | null>> {
    return this.jobFilters.get("seniorities") as FormArray;
  }

  private get filters() {
    return this.data.filters;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { filters: JobFilter },
    private fb: FormBuilder,
    private seniorityService: SeniorityService,
    public dialogRef: MatDialogRef<JobFiltersComponent>
  ) {
    this.jobFilters = fb.group(
      {
        minSalary: this.filters.minSalary,
        maxSalary: this.filters.maxSalary,
        seniorities: fb.array<SeniorityControl>([]),
      },
      { validators: this.salaryValidator }
    );

    this.populateSeniorityFilters();
    this.dialogRef.backdropClick().subscribe(() => this.applyFilters());
  }

  private populateSeniorityFilters() {
    this.seniorityService.getSeniorities().subscribe(seniorities => {
      seniorities.forEach(seniority => {
        this.seniorities.push(
          this.fb.control<SeniorityControl>({
            isChecked:
              this.filters.seniorities.find(
                filteredSeniority => filteredSeniority === seniority
              ) !== undefined,
            seniority: seniority,
          })
        );
      });
      this.filters.seniorities = [];
    });
  }

  private salaryValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const minSalary: number = control.get("minSalary")?.getRawValue() ?? 0;
    const maxSalary: number = control.get("maxSalary")?.getRawValue() ?? 0;

    if (minSalary > maxSalary && maxSalary !== 0 && minSalary !== 0) {
      return { salary: true };
    }

    return null;
  };

  applyFilters() {
    this.seniorities.controls
      .map(seniorityControl => seniorityControl.getRawValue())
      .filter(seniorityControl => seniorityControl?.isChecked)
      .forEach(seniorityControl => {
        if (!seniorityControl) {
          return;
        }
        if (seniorityControl.isChecked) {
          this.filters.seniorities.push(seniorityControl.seniority);
        }
      });
    this.filters.minSalary =
      this.jobFilters.controls["minSalary"]?.getRawValue() ?? 0;
    this.filters.maxSalary =
      this.jobFilters.controls["maxSalary"]?.getRawValue() ?? 0;

    this.dialogRef.close();
  }

  onSeniorityChange(e: MatCheckboxChange) {
    const seniorityControl: SeniorityControl = this.seniorities
      .get(e.source.id)
      ?.getRawValue();

    seniorityControl.isChecked = !seniorityControl.isChecked;
  }

  protected readonly String = String;
}
