import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { AngularMarkdownEditorModule } from "angular-markdown-editor";
import { KeycloakService } from "keycloak-angular";
import { MARKED_OPTIONS, provideMarkdown } from "ngx-markdown";

import { routes } from "./app.routes";
import { provideKeycloak } from "./auth/keycloak-initializer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideMarkdown({
      loader: HttpClient,
      markedOptions: {
        provide: MARKED_OPTIONS,
        useValue: {
          gfm: true,
          breaks: false,
          pedantic: false,
          smartLists: true,
          smartypants: false,
        },
      },
    }),
    provideKeycloak(),
    KeycloakService,
    importProvidersFrom(
      AngularMarkdownEditorModule.forRoot({
        iconlibrary: "fa",
      })
    ),
  ],
};
