import { NgIf } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from "@angular/material/expansion";
import { MatError, MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio";

import { PositionFormComponent } from "../shared/position-form/position-form.component";
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
    PositionFormComponent,
  ],
  templateUrl: "./new-position.component.html",
  styleUrl: "./new-position.component.scss",
})
export class NewPositionComponent {
  @Input()
  public companyId?: number;
}
