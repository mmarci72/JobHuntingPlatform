import { Component, OnInit } from "@angular/core";

import { Position } from "../model/job.model";
import { PositionService } from "../service/position.service";
import { JobCardComponent } from "../shared/job-card/job-card.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [JobCardComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit {
  protected positions: Position[] = [];

  constructor(private readonly positionService: PositionService) {}

  ngOnInit() {
    this.positionService.getPositionsWithCompanyLogo().subscribe(positions => {
      this.positions = positions;
    });
  }
}
