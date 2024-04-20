import { Routes } from "@angular/router";

import { AuthGuard } from "./auth/auth-guard";
import { HomeComponent } from "./home/home.component";
import { JobDetailsComponent } from "./job-details/job-details.component";
import { ManageCompanyComponent } from "./manage-company/manage-company.component";
import { ManagePositionsComponent } from "./manage-positions/manage-positions.component";
import { NewCompanyComponent } from "./new-company/new-company.component";
import { NewPositionComponent } from "./new-position/new-position.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { SettingsComponent } from "./settings/settings.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "details",
    component: JobDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "settings",
    component: SettingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "newCompany",
    component: NewCompanyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "manageCompany",
    component: ManageCompanyComponent,
    canActivate: [AuthGuard],
    data: { roles: ["RECRUITER"] },
  },
  {
    path: "managePositions",
    component: ManagePositionsComponent,
    canActivate: [AuthGuard],
    data: { roles: ["RECRUITER"] },
  },
  {
    path: "newPosition/:companyId",
    component: NewPositionComponent,
    canActivate: [AuthGuard],
    data: { roles: ["RECRUITER"] },
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];
