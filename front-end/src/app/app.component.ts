import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { KeycloakService } from "keycloak-angular";

import { HeaderComponent } from "./header/header.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NgbModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "Job Hunting Portal";

  protected isInRole = false;

  constructor(private readonly keycloakService: KeycloakService) {}

  checkForPermission() {
    this.isInRole = this.keycloakService.isUserInRole("RECRUITER");
  }
}
