import { SettingsPreference } from './settings-preference.model';

export class Preference {
	username!: string;
	preferences: SettingsPreference = new SettingsPreference();

}
