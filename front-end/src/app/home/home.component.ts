import { AfterViewInit, ChangeDetectorRef, Component } from "@angular/core";

import { PositionService } from "../service/position.service";
import { JobCardComponent } from "../shared/job-card/job-card.component";
import { AsyncPipe, NgClass, NgOptimizedImage } from "@angular/common";
import { RecentJobsComponent } from "./recent-jobs/recent-jobs.component";
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import { NgxPaginationModule } from "ngx-pagination";
import { Subject, switchMap } from "rxjs";
import { SearchInputComponent } from "../shared/search-input/search-input.component";
import { PaginatedPosition } from "../model/job.model";

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
  ],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent implements AfterViewInit {
  protected readonly PAGE_SIZE = 8;
  protected current_job_page = 1;

  protected newPositions?: PaginatedPosition;

  private filterJobs = new Subject<string>();
  protected positions$ = this.filterJobs.pipe(
    switchMap(searchTerm => {
      return this.positionService.getPositions(
        this.current_job_page - 1,
        this.PAGE_SIZE,
        searchTerm
      );
    })
  );

  constructor(
    private readonly positionService: PositionService,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    let newPositions$ = this.positions$.subscribe(positions => {
      this.newPositions = positions;
      newPositions$.unsubscribe();
    });

    this.filterJobs.next("");
  }

  protected handlePageChange(event: number) {
    this.current_job_page = event;

    this.filterJobs.next("");
  }

  protected onInputChange(text: string) {
    debugger;
    this.current_job_page = 1;
    this.filterJobs.next(text);
  }
}
