import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    loadComponent: () =>
      import("./home/home.component").then(home => home.HomeComponent),
  },
  {
    path: "details",
    loadComponent: () =>
      import("./job-details/job-details.component").then(
        details => details.JobDetailsComponent
      ),
  },
  {
    path: "**",
    loadComponent: () =>
      import("./page-not-found/page-not-found.component").then(
        notFound => notFound.PageNotFoundComponent
      ),
  },
];
