import { Component, Input, OnInit } from "@angular/core";

import { CompanyWithLogo, isCompanyWithLogo } from "../../model/company.model";
import { Position } from "../../model/job.model";
import { CompanyService } from "../../service/company.service";
import { catchError, EMPTY, Observable, Subject, switchMap } from "rxjs";

@Component({
  selector: "app-job-card",
  standalone: true,
  imports: [],
  templateUrl: "./job-card.component.html",
  styleUrl: "./job-card.component.scss",
})
export class JobCardComponent implements OnInit {
  protected _position?: Position;

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

  @Input({ required: true })
  public set position(position: Position | undefined) {
    if (position) {
      this._position = position;
      this.positionChange.next(position);
    }
  }

  constructor(private readonly companyService: CompanyService) {}

  ngOnInit() {
    this.updateCompanyInfo$.subscribe(company => {
      if (this._position) {
        this._position.company = company;
      }
    });
    if (this._position) {
      this.positionChange.next(this._position);
    }
  }

  protected readonly isCompanyWithLogo = isCompanyWithLogo;
}
