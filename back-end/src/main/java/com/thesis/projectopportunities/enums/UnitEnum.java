package com.thesis.projectopportunities.enums;

import lombok.Getter;

@Getter
public enum UnitEnum {
	BANKING("Banking"),
	PUBLIC_SECTOR("Public Sector"),
	INSURANCE("Insurance"),
	GROWTH_MARKETS("Growth Markets"),
	T_AND_I("T&I");

	final String literal;

	UnitEnum(String literal) {
		this.literal = literal;
	}

	public static UnitEnum toEnum(String literal) {
		switch (literal) {
			case "Banking" -> {
				return UnitEnum.BANKING;
			}
			case "Public Sector" -> {
				return UnitEnum.PUBLIC_SECTOR;
			}
			case "Insurance" -> {
				return UnitEnum.INSURANCE;
			}
			case "Growth Markets" -> {
				return UnitEnum.GROWTH_MARKETS;
			}
			case ("T&I") -> {
				return UnitEnum.T_AND_I;
			}
			default -> throw new IllegalArgumentException("Non existent unit");

		}
	}

}
