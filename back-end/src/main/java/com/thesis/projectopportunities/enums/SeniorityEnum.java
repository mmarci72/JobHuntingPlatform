package com.thesis.projectopportunities.enums;

import lombok.Getter;

@Getter
public enum SeniorityEnum {
	INTERN("Intern"),
	JUNIOR("Junior"),
	PROFESSIONAL("Professional"),
	SENIOR("Senior"),
	ANY("Any");

	private final String literal;

	SeniorityEnum(String literal) {
		this.literal = literal;
	}

	public static SeniorityEnum toEnum(String literal) {
		switch (literal) {
			case "Intern" -> {
				return SeniorityEnum.INTERN;
			}
			case "Junior" -> {
				return SeniorityEnum.JUNIOR;
			}
			case "Professional" -> {
				return SeniorityEnum.PROFESSIONAL;
			}
			case "Senior" -> {
				return SeniorityEnum.SENIOR;
			}
			case ("Any") -> {
				return SeniorityEnum.ANY;
			}
			default -> throw new IllegalArgumentException("Non existent seniority");

		}
	}
}
