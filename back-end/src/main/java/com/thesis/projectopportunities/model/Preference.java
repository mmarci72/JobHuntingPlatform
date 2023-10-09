package com.thesis.projectopportunities.model;

import java.io.Serializable;

import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

@Entity
@Data
@NoArgsConstructor
public class Preference implements Serializable {

	@Id
	private String username;

	@Type(JsonType.class)
	@Column(columnDefinition = "jsonb")
	private SettingsPreference preferences;
}
