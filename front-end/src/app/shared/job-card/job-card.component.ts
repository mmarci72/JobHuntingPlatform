import { Component, Input, OnInit } from "@angular/core";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from "@angular/material/card";

import { Position } from "../../model/job.model";

@Component({
  selector: "app-job-card",
  standalone: true,
  imports: [MatCard, MatCardTitle, MatCardHeader, MatCardContent],
  templateUrl: "./job-card.component.html",
  styleUrl: "./job-card.component.scss",
})
export class JobCardComponent implements OnInit {
  @Input({ required: true })
  protected position: Position | undefined;

  ngOnInit() {
    if (!this.position) {
      throw new Error("Position must be defined");
    }
  }
}
