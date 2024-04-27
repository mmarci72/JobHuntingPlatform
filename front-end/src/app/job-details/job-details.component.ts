import { AsyncPipe, DatePipe, NgOptimizedImage } from "@angular/common";
import { AfterViewInit, Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { KeycloakService } from "keycloak-angular";
import { MarkdownComponent } from "ngx-markdown";
import {
  catchError,
  EMPTY,
  from,
  mergeMap,
  Observable,
  ReplaySubject,
  Subject,
  switchMap,
} from "rxjs";

import { Application } from "../model/application.model";
import { CompanyWithLogo, isCompanyWithLogo } from "../model/company.model";
import { Position } from "../model/job.model";
import { SalaryPipe } from "../pipe/salary.pipe";
import { ApplicationService } from "../service/application.service";
import { AssetService } from "../service/asset.service";
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
export class JobDetailsComponent implements AfterViewInit {
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

  private newApplication = new ReplaySubject<Application>();
  private newApplication$ = this.newApplication.pipe(
    mergeMap(application =>
      this.applicationService.postApplication(application)
    )
  );

  protected isResumeUploaded: boolean = true;
  private userName = this.keycloakService.getUsername();
  private resumeExists$ = this.assetService.doesResumeExist(this.userName);

  protected didApply = new ReplaySubject<void>();

  protected didApply$ = this.didApply.pipe(
    mergeMap(() =>
      this.applicationService.didApply(
        this.position?.positionId,
        this?.userName
      )
    )
  );

  protected readonly isCompanyWithLogo = isCompanyWithLogo;

  constructor(
    private route: ActivatedRoute,
    private positionService: PositionService,
    private companyService: CompanyService,
    private assetService: AssetService,
    private keycloakService: KeycloakService,
    private applicationService: ApplicationService,
    private snackBar: MatSnackBar
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
    this.resumeExists$.subscribe(isResume => {
      this.isResumeUploaded = isResume;
    });

    this.newApplication$.subscribe(() => {
      this.snackBar.open("Application submitted", "OK", { duration: 3000 });
      this.didApply.next();
    });
  }

  apply() {
    this.getApplication().subscribe(application => {
      if (!application) {
        return;
      }
      this.newApplication.next(application);
    });
    this.didApply.next();
  }

  private getApplication(): Observable<Application | undefined> {
    return from(
      this.keycloakService.loadUserProfile().then(userProfile => {
        if (!this.position?.positionId) {
          return;
        }

        const application: Application = {
          approved: false,
          reviewed: false,
          email: userProfile.email ?? "",
          username: userProfile.username ?? "",
          firstName: userProfile.firstName ?? "",
          lastName: userProfile.lastName ?? "",
          positionId: this.position.positionId,
          // @ts-expect-error The library does not support this, but it works :)
          phoneNumber: userProfile["attributes"].phone[0],
        };

        return application;
      })
    );
  }

  ngAfterViewInit(): void {
    this.didApply.next();
  }
}
