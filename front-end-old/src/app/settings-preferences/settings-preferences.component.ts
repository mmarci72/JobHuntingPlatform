import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError, of } from "rxjs";

import { Preference } from "../model/preference.model";
import { PreferenceService } from "../services/preference.service";
import { RoleService } from "../services/role.service";
import { SeniorityService } from "../services/seniority.service";
import { SessionStorageService } from "../services/session-storage.service";
import { UnitService } from "../services/unit.service";
import { KeycloakProfile } from "keycloak-js";

@Component({
	selector: "app-settings-preferences",
	templateUrl: "./settings-preferences.component.html",
	styleUrls: ["./settings-preferences.component.scss"],
})
export class SettingsPreferencesComponent implements OnInit {
	preferenceForm: FormGroup;

	selectedRoles: string[] = [];
	selectedUnits: string[] = [];
	selectedSeniorities: string[] = [];

	preferences: Preference = new Preference();

	user!: KeycloakProfile | null;

	roles: string[] = [];
	units: string[] = [];
	seniorities: string[] = [];

	constructor(
		private readonly seniorityService: SeniorityService,
		private readonly roleService: RoleService,
		private readonly unitService: UnitService,
		private readonly preferenceService: PreferenceService,
		private readonly formBuilder: FormBuilder,
		private readonly snackBar: MatSnackBar,
		private readonly sessionStorageService: SessionStorageService,
	) {
		this.preferenceForm = this.formBuilder.group({
			role: [""],
			seniority: [""],
			unit: [""],
		});
	}

	async ngOnInit() {
		this.user = await this.sessionStorageService.getUser();
		this.preferences.username = this.user.username as string;

		this.getSeniorities();
		this.getRoles();
		this.getUnits();
		this.getPreferences();
	}

	private getSeniorities() {
		this.seniorityService.getSeniorities().subscribe((seniorities) => {
			this.seniorities = seniorities.filter((seniority) => seniority !== "Any");
		});
	}

	private getRoles() {
		this.roleService.getAllRoles().subscribe((roles) => {
			this.roles = roles;
		});
	}

	private getUnits() {
		this.unitService.getAllUnits().subscribe((units) => {
			this.units = units.map((unit) => unit.name);
		});
	}

	private getPreferences() {
		this.preferenceService
			.getPreferencesForUser(this.user?.username ?? "")
			.pipe(catchError(() => of(null)))
			.subscribe((data) => {
				if (data === null) {
					this.selectedUnits = [];
					this.selectedSeniorities = [];
					this.selectedRoles = [];
				} else {
					this.selectedSeniorities = data.preferences.seniorities;
					this.selectedRoles = data.preferences.roles === this.roles ? [] : data.preferences.roles;
					this.selectedUnits = data.preferences.units === this.units ? [] : data.preferences.units;
				}
			});
	}

	savePreferences() {
		this.preferences.preferences.seniorities =
			this.selectedSeniorities.length === 0 ? this.seniorities : this.selectedSeniorities;

		this.preferences.preferences.roles = this.selectedRoles.length === 0 ? this.roles : this.selectedRoles;

		this.preferences.preferences.units = this.selectedUnits.length === 0 ? this.units : this.selectedUnits;

		this.preferenceService
			.updatePreference(this.preferences, this.preferences.username)
			.pipe(
				catchError(() => {
					this.snackBar.open(`Couldn't save preferences`, "Ok", { duration: 2000 });
					return of(null);
				}),
			)
			.subscribe(() => this.snackBar.open("Preferences saved successfully", "Ok", { duration: 2000 }));
	}
}
