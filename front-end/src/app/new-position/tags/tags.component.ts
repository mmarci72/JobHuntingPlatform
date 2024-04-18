import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, Input } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import {
  MatChipEditedEvent,
  MatChipGrid,
  MatChipInput,
  MatChipInputEvent,
  MatChipRow,
} from "@angular/material/chips";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: "app-tags",
  standalone: true,
  imports: [
    MatChipGrid,
    MatChipRow,
    MatLabel,
    MatFormField,
    ReactiveFormsModule,
    MatIcon,
    MatChipInput,
  ],
  templateUrl: "./tags.component.html",
  styleUrl: "./tags.component.scss",
})
export class TagsComponent {
  @Input()
  public label = "";

  @Input()
  public positionFormGroup?: FormGroup;

  @Input()
  public tagControlName = "";

  protected tagControl = (): FormControl<string[]> =>
    this.positionFormGroup?.get(this.tagControlName) as FormControl;

  protected readonly separatorKeysCodes = [ENTER, COMMA] as const;

  protected add(event: MatChipInputEvent) {
    const value: string = (event.value || "").trim();

    if (value) {
      this.tagControl().value.push(value);
    }

    event.chipInput.clear();
  }

  protected remove(toRemove: string) {
    const values: string[] = this.tagControl().value;

    const index = values.indexOf(toRemove);

    if (index >= 0) {
      values.splice(index, 1);
    }
  }

  protected edit(toEdit: string, event: MatChipEditedEvent) {
    const values: string[] = this.tagControl().value;

    const value: string = event.value.trim();

    if (!value) {
      this.remove(toEdit);
      return;
    }

    const index = values.indexOf(toEdit);
    if (index >= 0) {
      values[index] = value;
    }
  }
}
