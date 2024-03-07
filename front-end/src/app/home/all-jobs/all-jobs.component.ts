import { AfterViewInit, Component, Input } from "@angular/core";
import { JobFiltersComponent } from "../job-filters/job-filters.component";
import { JobFilter } from "../job-filter";
import { Subject, switchMap } from "rxjs";
import { PositionService } from "../../service/position.service";
import { MatDialog } from "@angular/material/dialog";
import { SearchInputComponent } from "../../shared/search-input/search-input.component";
import { MatButton } from "@angular/material/button";
import { AsyncPipe } from "@angular/common";
import { NgxPaginationModule } from "ngx-pagination";
import { JobCardComponent } from "../../shared/job-card/job-card.component";

@Component({
  selector: "app-all-jobs",
  standalone: true,
  imports: [
    SearchInputComponent,
    MatButton,
    AsyncPipe,
    NgxPaginationModule,
    JobCardComponent,
  ],
  templateUrl: "./all-jobs.component.html",
  styleUrl: "./all-jobs.component.scss",
})
export class AllJobsComponent implements AfterViewInit {
  @Input({ required: true }) page_size?: number;
  protected current_job_page = 1;

  private filterJobs = new Subject<void>();
  protected positions$ = this.filterJobs.pipe(
    switchMap(searchTerm => {
      return this.positionService.getPositions(
        this.current_job_page - 1,
        this.page_size ?? 12,
        this.filters
      );
    })
  );

  private filters: JobFilter = {
    searchString: "",
    seniorities: [],
    minSalary: 0,
    maxSalary: 0,
  };

  constructor(
    private readonly positionService: PositionService,
    private jobFiltersDialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.filterJobs.next();
  }

  protected handlePageChange(event: number) {
    this.current_job_page = event;

    this.filterJobs.next();
  }

  protected onInputChange(text: string) {
    this.filters.searchString = text;
    this.current_job_page = 1;
    this.filterJobs.next();
  }

  protected showFilters() {
    let jobFiltersDialogRef = this.jobFiltersDialog.open(JobFiltersComponent, {
      width: "40rem",
      data: {
        filters: this.filters,
      },
    });

    jobFiltersDialogRef.afterClosed().subscribe(() => {
      this.current_job_page = 1;
      this.filterJobs.next();
    });
  }
}
