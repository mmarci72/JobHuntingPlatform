import { Component, EventEmitter, Inject } from "@angular/core";
import { MatButton } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from "@angular/material/dialog";

import { PositionService } from "../../service/position.service";

@Component({
  selector: "app-delete-position-dialog",
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
  ],
  templateUrl: "./delete-position-dialog.component.html",
  styleUrl: "./delete-position-dialog.component.scss",
})
export class DeletePositionDialogComponent {
  constructor(
    private readonly positionService: PositionService,
    @Inject(MAT_DIALOG_DATA)
    public data: { positionId: number; deleteEvent: EventEmitter<void> }
  ) {}
  deletePosition() {
    this.positionService.deletePosition(this.data.positionId).subscribe(() => {
      debugger;
      this.data.deleteEvent.emit();
    });
  }
}
