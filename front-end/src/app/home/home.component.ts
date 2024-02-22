import { ChangeDetectorRef, Component, OnInit } from "@angular/core";

import { Position } from "../model/job.model";
import { PositionService } from "../service/position.service";
import { JobCardComponent } from "../shared/job-card/job-card.component";
import { NgClass, NgOptimizedImage } from "@angular/common";
import { RecentJobsComponent } from "./recent-jobs/recent-jobs.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [JobCardComponent, NgOptimizedImage, NgClass, RecentJobsComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit {
  protected positions: Position[] = [];
  protected newPositions: Position[] = [];

  private readonly MAX_RECENT_JOBS = 10;

  constructor(
    private readonly positionService: PositionService,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.positionService.getPositionsWithCompanyLogo().subscribe(positions => {
      this.positions = positions;
      this.newPositions = positions.slice(0, this.MAX_RECENT_JOBS);

      this.cd.detach();
      this.cd.detectChanges();
      this.cd.reattach();
    });
  }
}
