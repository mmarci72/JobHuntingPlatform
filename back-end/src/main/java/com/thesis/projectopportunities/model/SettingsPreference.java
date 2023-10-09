package com.thesis.projectopportunities.model;

import java.io.Serializable;
import java.util.List;

import lombok.Data;

@Data
public class SettingsPreference implements Serializable {

	private List<String> roles;

	private List<String> seniorities;

	private List<String> units;

}
