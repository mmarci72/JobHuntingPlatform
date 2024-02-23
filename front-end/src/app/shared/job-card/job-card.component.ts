import { Component, Input, OnInit } from "@angular/core";

import { isCompanyWithLogo } from "../../model/company.model";
import { Position } from "../../model/job.model";
import { CompanyService } from "../../service/company.service";

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

  constructor(private readonly companyService: CompanyService) {}

  ngOnInit() {
    if (this.position === undefined) {
      throw new Error("Position must be defined");
    } else {
      this.companyService
        .getCompanyWithLogos(this.position.companyId)
        .subscribe(company => {
          if (this.position) {
            this.position.company = company;
          }
        });
    }
  }

  protected readonly isCompanyWithLogo = isCompanyWithLogo;
}
