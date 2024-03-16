import { Injectable } from "@angular/core";
import { KeycloakService } from "keycloak-angular";
import { ReplaySubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly loggedIn: Subject<boolean> = new ReplaySubject<boolean>(1);

  constructor(private readonly keycloakService: KeycloakService) {}

  public logout(): void {
    this.keycloakService
      .logout(window.location.origin)
      .then(() => this.loggedIn.next(true));
  }
}
