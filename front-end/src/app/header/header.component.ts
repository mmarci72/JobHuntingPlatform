import { HttpClient } from "@angular/common/http";
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from "@angular/core";
import { KeycloakService } from "keycloak-angular";

import { AppComponent } from "../app.component";
import { AuthService } from "../services/authentication.service";
import { SessionStorageService } from "../services/session-storage.service";
import { KeycloakProfile } from "keycloak-js";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements AfterViewInit {
	user?: KeycloakProfile;
	isInRole = false;

	@ViewChild("welcome") welcome!: ElementRef;

	constructor(
		private readonly keycloakService: KeycloakService,
		private readonly authService: AuthService,
		private readonly app: AppComponent,
		private readonly cd: ChangeDetectorRef,
		private readonly http: HttpClient,
		private readonly sessionStorageService: SessionStorageService,
	) {}

	async ngAfterViewInit() {
		this.user = await this.sessionStorageService.getUser();
		this.isInRole = this.keycloakService.isUserInRole("ADMIN_CLIENT");

		this.welcome.nativeElement.textContent = `Welcome, ${this.user.firstName} ${this.user.lastName}`;
		this.authService.loginStatusChange().subscribe(() => {
			this.app.saveUser().then(() => this.refreshUser());
		});
		this.cd.detectChanges();
	}

	private async refreshUser() {
		this.user = await this.sessionStorageService.getUser();
		this.http.post<boolean>("http://localhost:8081/user", this.user).subscribe((result) => {
			this.isInRole = result;
			this.cd.detectChanges();
		});
		this.welcome.nativeElement.textContent = `Welcome, ${this.user.firstName} ${this.user.lastName}`;
		this.cd.detectChanges();
	}
}
