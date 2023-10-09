package com.thesis.projectopportunities.enums;

import lombok.Getter;

@Getter
public enum RoleEnum {
	TESTER("Tester"),
	SOFTWARE_ENGINEER("Software Engineer"),
	PROJECT_MANAGER("Project Manager"),
	REQUIREMENT_ENGINEER("Requirement Engineer"),
	SOLUTION_ARCHITECT("Solution Architect");

	private final String literal;

	RoleEnum(String literal) {
		this.literal = literal;
	}


	public static RoleEnum toEnum(String literal) {
		switch (literal) {
			case "Tester" -> {
				return RoleEnum.TESTER;
			}
			case "Software Engineer" -> {
				return RoleEnum.SOFTWARE_ENGINEER;
			}
			case "Project Manager" -> {
				return RoleEnum.PROJECT_MANAGER;
			}
			case "Requirement Engineer" -> {
				return RoleEnum.REQUIREMENT_ENGINEER;
			}
			case ("Solution Architect") -> {
				return RoleEnum.SOLUTION_ARCHITECT;
			}
			default -> throw new IllegalArgumentException("Non existent role");

		}
	}
}
