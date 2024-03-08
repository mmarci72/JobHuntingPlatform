package com.thesis.projectopportunities.model;

import lombok.Data;

import java.util.List;

@Data
public class PaginatedModel<T> {
	private List<T> entities;
	private long currentPage;
	private long totalItems;
	private long totalPages;
}
