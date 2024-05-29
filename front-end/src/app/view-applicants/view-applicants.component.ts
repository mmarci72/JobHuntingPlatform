import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatIcon } from "@angular/material/icon";
import { MatPaginator } from "@angular/material/paginator";
import { MatOption, MatSelect } from "@angular/material/select";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort, MatSortHeader, Sort } from "@angular/material/sort";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from "@angular/material/table";
import { map } from "rxjs";

import { Application } from "../model/application.model";
import { ApplicationService } from "../service/application.service";
import { AssetService } from "../service/asset.service";

@Component({
  selector: "app-view-applicants",
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatSort,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatSortHeader,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatPaginator,
    MatHeaderRowDef,
    MatRowDef,
    MatIcon,
    MatSelect,
    FormsModule,
    MatOption,
    MatButton,
    MatCheckbox,
  ],
  templateUrl: "./view-applicants.component.html",
  styleUrl: "./view-applicants.component.scss",
})
export class ViewApplicantsComponent implements OnInit {
  @Input()
  public positionId?: number;

  dataSource = new MatTableDataSource<Application>();

  displayedColumns: string[] = ["name", "email", "phone", "resume", "approve"];

  protected isApplicationHistory = false;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private readonly applicationService: ApplicationService,
    private readonly assetService: AssetService,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    const sortState: Sort = { active: "postDate", direction: "desc" };
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
    this.dataSource.paginator = this.paginator;

    this.getApplications();
  }

  protected getApplications() {
    if (!this.positionId) {
      return;
    }

    this.applicationService
      .getApplications(this.positionId)
      .pipe(
        map(applications =>
          applications.filter(application =>
            this.isApplicationHistory
              ? application.reviewed
              : !application.reviewed
          )
        )
      )
      .subscribe(applications => {
        this.dataSource.data = applications;
      });
  }

  downloadResume(username: string) {
    this.assetService
      .getResume(username)
      .subscribe(resume => window.open(resume));
  }

  approveApplication(id: number, approved: boolean) {
    this.applicationService
      .approveApplication(id, approved)
      .subscribe(message => {
        this.getApplications();
        this.snackBar.open(message, "OK", { duration: 1500 });
      });
  }

  showHistory() {
    this.isApplicationHistory = !this.isApplicationHistory;

    this.getApplications();
  }
}
