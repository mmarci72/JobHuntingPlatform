package com.thesis.projectopportunities.dto;

import java.time.LocalDateTime;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CommentDto {

	private long id;

	private String data;

	private LocalDateTime creationDate;

	private ProjectPositionDto position;

	private String fullName;

	private String username;

}
