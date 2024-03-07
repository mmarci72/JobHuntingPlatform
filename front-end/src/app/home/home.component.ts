import { AfterViewInit, Component } from "@angular/core";

import { PositionService } from "../service/position.service";
import { JobCardComponent } from "../shared/job-card/job-card.component";
import { AsyncPipe, NgClass, NgOptimizedImage } from "@angular/common";
import { RecentJobsComponent } from "./recent-jobs/recent-jobs.component";
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import { NgxPaginationModule } from "ngx-pagination";
import { SearchInputComponent } from "../shared/search-input/search-input.component";
import { PaginatedPosition } from "../model/job.model";
import { AllJobsComponent } from "./all-jobs/all-jobs.component";

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
