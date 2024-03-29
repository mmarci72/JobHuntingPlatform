import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { KeycloakService } from "keycloak-angular";
import { provideMarkdown } from "ngx-markdown";

import { routes } from "./app.routes";
import { provideKeycloak } from "./auth/keycloak-initializer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideMarkdown(),
    provideKeycloak(),
    KeycloakService,
  ],
};
