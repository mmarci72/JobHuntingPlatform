package com.thesis.projectopportunities.enums;

import lombok.Getter;

@Getter
public enum IndustryDomainEnum {
	BANKING("Banking"),
	PUBLIC_SECTOR("Public Sector"),
	INSURANCE("Insurance"),
	GROWTH_MARKETS("Growth Markets"),
	T_AND_I("T&I");

	final String literal;

	IndustryDomainEnum(String literal) {
		this.literal = literal;
	}

	public static IndustryDomainEnum toEnum(String literal) {
		switch (literal) {
			case "Banking" -> {
				return IndustryDomainEnum.BANKING;
			}
			case "Public Sector" -> {
				return IndustryDomainEnum.PUBLIC_SECTOR;
			}
			case "Insurance" -> {
				return IndustryDomainEnum.INSURANCE;
			}
			case "Growth Markets" -> {
				return IndustryDomainEnum.GROWTH_MARKETS;
			}
			case ("T&I") -> {
				return IndustryDomainEnum.T_AND_I;
			}
			default -> throw new IllegalArgumentException("Non existent unit");

		}
	}

}
