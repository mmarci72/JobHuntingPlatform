package com.thesis.projectopportunities.specification;

import com.thesis.projectopportunities.enums.SeniorityEnum;
import com.thesis.projectopportunities.model.Company;
import com.thesis.projectopportunities.model.Position;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class PositionSpecification {
	private PositionSpecification() {
	}

	public static Specification<Position> getFilterSpecification(String searchString, String[] seniorities, int minSalary,
																 int maxSalary) {
		return ((Root<Position> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
			List<Predicate> predicates = new ArrayList<>();

			Predicate searchPredicate = searchPredicate(criteriaBuilder, root, searchString);
			predicates.add(searchPredicate);

			Predicate seniorityPredicate = seniorityPredicate(criteriaBuilder, root, seniorities);
			predicates.add(seniorityPredicate);

			Predicate salaryPredicate = salaryRangePredicate(criteriaBuilder, root, minSalary, maxSalary);
			predicates.add(salaryPredicate);

			return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
		});
	}

	private static Predicate searchPredicate(CriteriaBuilder criteriaBuilder, Root<Position> root, String searchString) {
		List<Predicate> predicates = new ArrayList<>();

		if (searchString != null && !searchString.isEmpty() && !searchString.isBlank()) {
			Join<Position, Company> companyJoin = root.join("company", JoinType.INNER);
			Predicate companyNamePredicate = criteriaBuilder.like(criteriaBuilder.lower(companyJoin.get("name")),
				"%" + searchString.toLowerCase() + "%");
			Predicate positionNamePredicate = criteriaBuilder.like(criteriaBuilder.lower(root.get("positionName")),
				"%" + searchString.toLowerCase() + "%");

			predicates.add(companyNamePredicate);
			predicates.add(positionNamePredicate);
			return criteriaBuilder.or(predicates.toArray(new Predicate[0]));
		}
		return criteriaBuilder.conjunction();
	}

	private static Predicate seniorityPredicate(CriteriaBuilder criteriaBuilder, Root<Position> root, String[] seniorities) {
		if (seniorities != null && seniorities.length > 0) {
			CriteriaBuilder.In<SeniorityEnum> inClause = criteriaBuilder.in(root.get("seniorityName"));
			for (String seniority : seniorities) {
				inClause.value(SeniorityEnum.toEnum(seniority.toLowerCase()));
			}
			return inClause;
		}

		return criteriaBuilder.conjunction();
	}

	private static Predicate salaryRangePredicate(CriteriaBuilder criteriaBuilder, Root<Position> root, int filterMinSalary,
												  int filterMaxSalary) {
		List<Predicate> predicates = new ArrayList<>();

		if (filterMaxSalary == 0 && filterMinSalary == 0) {
			return criteriaBuilder.conjunction();
		}

		if (filterMaxSalary > 0) {
			var salaryRange = criteriaBuilder.lessThanOrEqualTo(root.get("salaryMin"), filterMaxSalary);
			var doesMinSalaryExist = criteriaBuilder.isNull(root.get("salaryMin"));
			predicates.add(criteriaBuilder.or(salaryRange, doesMinSalaryExist));
		}
		if (filterMinSalary > 0) {
			var salaryRange = criteriaBuilder.greaterThanOrEqualTo(root.get("salaryMax"), filterMinSalary);
			var doesMaxSalaryExist = criteriaBuilder.isNull(root.get("salaryMax"));
			predicates.add(criteriaBuilder.or(salaryRange, doesMaxSalaryExist));
		}

		return criteriaBuilder.or(predicates.toArray(new Predicate[0]));
	}
}

