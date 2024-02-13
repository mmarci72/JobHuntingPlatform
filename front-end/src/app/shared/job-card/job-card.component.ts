import { Component, Input, OnInit } from "@angular/core";

import { isCompanyWithLogo } from "../../model/company.model";
import { Position } from "../../model/job.model";

@Component({
  selector: "app-job-card",
  standalone: true,
  imports: [],
  templateUrl: "./job-card.component.html",
  styleUrl: "./job-card.component.scss",
})
export class JobCardComponent implements OnInit {
  @Input({ required: true })
  public position?: Position;

  ngOnInit() {
    if (!this.position) {
      throw new Error("Position must be defined");
    }
  }

  protected readonly isCompanyWithLogo = isCompanyWithLogo;
}
