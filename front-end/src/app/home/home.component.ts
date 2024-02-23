import { ChangeDetectorRef, Component, OnInit } from "@angular/core";

import { PaginatedPosition } from "../model/job.model";
import { PositionService } from "../service/position.service";
import { JobCardComponent } from "../shared/job-card/job-card.component";
import { NgClass, NgOptimizedImage } from "@angular/common";
import { RecentJobsComponent } from "./recent-jobs/recent-jobs.component";
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import { NgxPaginationModule } from "ngx-pagination";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    JobCardComponent,
    NgOptimizedImage,
    NgClass,
    RecentJobsComponent,
    MatFormField,
    MatInput,
    MatButton,
    NgxPaginationModule,
  ],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit {
  protected positions?: PaginatedPosition;
  protected newPositions?: PaginatedPosition;

  protected readonly PAGE_SIZE = 8;
  protected current_job_page = 0;

  constructor(
    private readonly positionService: PositionService,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.positionService
      .getPositions(true, this.current_job_page, this.PAGE_SIZE)
      .subscribe(positions => {
        this.positions = positions;
        this.newPositions = positions;

        this.cd.detach();
        this.cd.detectChanges();
        this.cd.reattach();
      });
  }

  protected handlePageChange(event: number) {
    this.current_job_page = event;
  }
}
