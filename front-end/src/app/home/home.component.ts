import { AsyncPipe, NgClass, NgOptimizedImage } from "@angular/common";
import { AfterViewInit, Component } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { RouterLink } from "@angular/router";
import { NgxPaginationModule } from "ngx-pagination";

import { PaginatedPosition } from "../model/job.model";
import { PositionService } from "../service/position.service";
import { JobCardComponent } from "../shared/job-card/job-card.component";
import { SearchInputComponent } from "../shared/search-input/search-input.component";
import { AllJobsComponent } from "./all-jobs/all-jobs.component";
import { RecentJobsComponent } from "./recent-jobs/recent-jobs.component";

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
    SearchInputComponent,
    AsyncPipe,
    AllJobsComponent,
    RouterLink,
  ],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent implements AfterViewInit {
  protected readonly PAGE_SIZE = 8;

  protected newPositions?: PaginatedPosition;

  constructor(private readonly positionService: PositionService) {}

  ngAfterViewInit() {
    this.positionService
      .getPositions(0, this.PAGE_SIZE)
      .subscribe(positions => {
        this.newPositions = positions;
      });
  }
}
