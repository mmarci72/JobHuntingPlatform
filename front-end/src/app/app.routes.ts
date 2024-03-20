import { Routes } from "@angular/router";

import { AuthGuard } from "./auth/auth-guard";
import { HomeComponent } from "./home/home.component";
import { JobDetailsComponent } from "./job-details/job-details.component";
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
    path: "**",
    component: PageNotFoundComponent,
  },
];
