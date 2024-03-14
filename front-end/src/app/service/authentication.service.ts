import { Injectable } from "@angular/core";
import { KeycloakService } from "keycloak-angular";
import { KeycloakProfile, KeycloakTokenParsed } from "keycloak-js";
import { ReplaySubject, Subject } from "rxjs";

import { SessionStorageService } from "./session-storage.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly loggedIn: Subject<boolean> = new ReplaySubject<boolean>(1);

  constructor(
    private readonly keycloakService: KeycloakService,
    private readonly sessionStorageService: SessionStorageService
  ) {}

  public getLoggedUser(): KeycloakTokenParsed | undefined {
    try {
      return this.keycloakService.getKeycloakInstance().idTokenParsed;
    } catch (e) {
      console.error("Exception", e);
      return undefined;
    }
  }

  public isLoggedIn(): boolean {
    return this.keycloakService.isLoggedIn();
  }

  public loadUserProfile(): Promise<KeycloakProfile> {
    return this.keycloakService.loadUserProfile(true);
  }

  public register(): void {
    this.loggedIn.next(true);
  }

  public async login(): Promise<void> {
    this.loggedIn.next(true);
    if (!this.loggedIn.observed) {
      await this.saveUser();
    }
  }

  public async saveUser() {
    const userProfile: KeycloakProfile = await this.loadUserProfile();

    this.sessionStorageService.setUser(userProfile);
  }

  public logout(): void {
    this.keycloakService
      .logout(window.location.origin)
      .then(() => this.loggedIn.next(true));
  }

  public redirectToProfile(): void {
    this.keycloakService.getKeycloakInstance().accountManagement();
  }

  public getRoles(): string[] {
    return this.keycloakService.getUserRoles();
  }

  public loginStatusChange() {
    return this.loggedIn.asObservable();
  }
}
