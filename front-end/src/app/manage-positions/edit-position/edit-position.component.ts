import { Component, Input } from "@angular/core";

import { PositionFormComponent } from "../../shared/position-form/position-form.component";

@Component({
  selector: "app-edit-position",
  standalone: true,
  imports: [PositionFormComponent],
  templateUrl: "./edit-position.component.html",
  styleUrl: "./edit-position.component.scss",
})
export class EditPositionComponent {
  @Input()
  public companyId?: number;

  @Input()
  public positionId?: number;
}
