package com.thesis.projectopportunities.enums;

import lombok.Getter;

@Getter
public enum SeniorityEnum {
	INTERN("Intern"),
	JUNIOR("Junior"),
	SENIOR("Senior"),
	EXPERT("Expert"),
	ANY("Any");

	private final String literal;

	SeniorityEnum(String literal) {
		this.literal = literal;
	}

	public static SeniorityEnum toEnum(String literal) {
		switch (literal.toLowerCase()) {
			case "intern" -> {
				return SeniorityEnum.INTERN;
			}
			case "junior" -> {
				return SeniorityEnum.JUNIOR;
			}
			case "expert" -> {
				return SeniorityEnum.EXPERT;
			}
			case "senior" -> {
				return SeniorityEnum.SENIOR;
			}
			case "any" -> {
				return SeniorityEnum.ANY;
			}
			default -> throw new IllegalArgumentException("Non existent seniority");

		}
	}
}
