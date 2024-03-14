import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { HeaderComponent } from "./header/header.component";
import { AuthService } from "./service/authentication.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NgbModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "Job Hunting Portal";

  constructor(private readonly authService: AuthService) {}

  public async saveUser() {
    await this.authService.saveUser();
  }

  public async login() {
    await this.authService.login();
  }

  public logout(): void {
    this.authService.logout();
  }
}
