import { AsyncPipe, DatePipe, NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { MarkdownComponent } from "ngx-markdown";
import { catchError, EMPTY, Observable, Subject, switchMap } from "rxjs";

import { CompanyWithLogo, isCompanyWithLogo } from "../model/company.model";
import { Position } from "../model/job.model";
import { SalaryPipe } from "../pipe/salary.pipe";
import { CompanyService } from "../service/company.service";
import { PositionService } from "../service/position.service";
import { LocationSvgComponent } from "../shared/location-svg/location-svg.component";

@Component({
  selector: "app-job-details",
  standalone: true,
  imports: [
    AsyncPipe,
    MarkdownComponent,
    RouterLink,
    SalaryPipe,
    DatePipe,
    NgOptimizedImage,
    LocationSvgComponent,
  ],
  templateUrl: "./job-details.component.html",
  styleUrl: "./job-details.component.scss",
})
export class JobDetailsComponent {
  protected position?: Position;

  protected position$ = this.route.paramMap.pipe(
    switchMap(params =>
      this.positionService.getPosition(Number(params.get("positionId")))
    )
  );

  private positionChange: Subject<Position> = new Subject<Position>();
  private updateCompanyInfo$: Observable<CompanyWithLogo> =
    this.positionChange.pipe(
      switchMap(position => {
        return this.companyService.getCompanyWithLogos(position.companyId);
      }),
      catchError(error => {
        console.error("Error fetching company info", error);
        return EMPTY;
      })
    );

  protected readonly isCompanyWithLogo = isCompanyWithLogo;

  constructor(
    private route: ActivatedRoute,
    private positionService: PositionService,
    private companyService: CompanyService
  ) {
    this.position$.subscribe(position => {
      this.position = position;
      this.positionChange.next(position);
    });
    this.updateCompanyInfo$.subscribe(company => {
      if (this.position) {
        this.position.company = company;
      }
    });
  }

  apply() {
    console.log("WORK IN PROGRESS");
  }
}
