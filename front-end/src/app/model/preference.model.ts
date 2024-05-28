import { SettingsPreference } from "./settings-preference.model";

export type Preference = {
  username?: string;
  preferences: SettingsPreference;
};
