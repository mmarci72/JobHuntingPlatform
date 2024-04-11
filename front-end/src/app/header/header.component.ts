import { NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";
import { MatTabLink } from "@angular/material/tabs";
import { RouterLink } from "@angular/router";
import { KeycloakService } from "keycloak-angular";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, MatTabLink],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  protected username;
  protected isInRole = false;

  constructor(private readonly keycloakService: KeycloakService) {
    this.username = keycloakService.getUsername();
    this.isInRole = keycloakService.isUserInRole("RECRUITER");
  }

  logout() {
    this.keycloakService.logout(window.location.origin).then();
  }
}
